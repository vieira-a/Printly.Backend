import { CountingJobStatus } from '../enums/counting-job-status.enum';
import { EntityBase } from './entity-base';

export type CountingJobProps = {
  printerId: string;
  attempt: number;
  lastAttempt: Date;
  status: CountingJobStatus;
  executionDate: Date;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateCountingJobProps = {
  printerId: string;
  attempt: number;
  lastAttempt: Date;
  status: CountingJobStatus;
  executionDate: Date;
};

export class CountingJob extends EntityBase {
  private _printerId: string;
  private _attempt: number;
  private _lastAttempt: Date;
  private _status: CountingJobStatus;
  private _executionDate: Date;

  constructor(props: CountingJobProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._printerId = props.printerId;
    this._attempt = props.attempt;
    this._lastAttempt = props.lastAttempt;
    this._status = props.status;
    this._executionDate = props.executionDate;
  }

  get printerId(): string {
    return this._printerId;
  }

  get attempt(): number {
    return this._attempt;
  }

  get lastAttempt(): Date {
    return this._lastAttempt;
  }

  get status(): string {
    return this._status;
  }

  get executionDate(): Date {
    return this._executionDate;
  }

  public static create(props: CreateCountingJobProps): CountingJob {
    return new CountingJob({ ...props });
  }

  public static restore(props: CountingJobProps): CountingJob {
    return new CountingJob({ ...props });
  }

  public canRetry(): boolean {
    const reachedLimit = this._attempt >= 5;
    return this._status !== CountingJobStatus.SUCCESS && !reachedLimit;
  }

  public registerAttempt(): void {
    this._attempt++;
    this._lastAttempt = new Date();

    if (this._status === CountingJobStatus.SUCCESS) return;

    if (this._attempt >= 5) {
      this._status = CountingJobStatus.FAILED;
    } else {
      this._status = CountingJobStatus.PENDING;
    }
  }

  public markSuccess(countingId: string): void {
    this._status = CountingJobStatus.SUCCESS;
  }
}
