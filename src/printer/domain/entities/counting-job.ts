import { CountingJobStatus } from '../enums/counting-job-status.enum';
import { EntityBase } from './entity-base';
import type { Printer } from './printer';
import { IPV4 } from './value-objects/ipv4';

export type CreateCountingJobProps = {
  printerId: string;
  ipv4: IPV4;
  status: CountingJobStatus;
  attempt: number;
  lastAttempt: Date;
  maxAttempts: number;
  printer?: Printer;
  countingId?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  errorMessage?: string;
};

export class CountingJob extends EntityBase {
  private _printerId: string;
  private _ipv4: IPV4;
  private _status: CountingJobStatus;
  private _attempt: number;
  private _lastAttempt: Date;
  private _maxAttempts: number;
  private _printer?: Printer;
  private _countingId?: string;
  private _errorMessage?: string;

  constructor(props: CreateCountingJobProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._printerId = props.printerId;
    this._ipv4 = props.ipv4;
    this._status = props.status;
    this._attempt = props.attempt;
    this._lastAttempt = props.lastAttempt;
    this._maxAttempts = props.maxAttempts;
    this._printer = props.printer;
    this._countingId = props.countingId;
    this._errorMessage = props.errorMessage;
  }

  get printerId(): string {
    return this._printerId;
  }

  get ipv4(): string {
    return this._ipv4.toString();
  }

  get status(): string {
    return this._status;
  }

  get errorMessage(): string | undefined {
    return this._errorMessage;
  }

  get attempt(): number {
    return this._attempt;
  }

  get lastAttempt(): Date {
    return this._lastAttempt;
  }

  get maxAttempts(): number {
    return this._maxAttempts;
  }

  get countingId(): string | undefined {
    return this._countingId;
  }

  get printer(): Printer | undefined {
    return this._printer;
  }

  public static create(
    printerId: string,
    ipv4: IPV4,
    status: CountingJobStatus,
    printer?: Printer,
    countingId?: string,
    errorMessage?: string,
  ): CountingJob {
    return new CountingJob({
      printerId,
      ipv4,
      status,
      printer,
      attempt: 1,
      lastAttempt: new Date(),
      maxAttempts: 5,
      countingId,
      errorMessage: errorMessage,
    });
  }

  public static restore(
    id: string,
    printerId: string,
    ipv4: IPV4,
    status: CountingJobStatus,
    attempt: number,
    lastAttempt: Date,
    maxAttempts: number,
    printer?: Printer,
    countingId?: string,
    errorMessage?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): CountingJob {
    return new CountingJob({
      id,
      printerId,
      ipv4,
      status,
      attempt,
      lastAttempt,
      maxAttempts,
      printer,
      countingId,
      errorMessage,
      createdAt,
      updatedAt,
    });
  }

  public canRetry(): boolean {
    const reachedLimit = this._attempt >= this._maxAttempts;
    return this._status !== CountingJobStatus.SUCCESS && !reachedLimit;
  }

  public registerAttempt(): void {
    this._attempt++;
    this._lastAttempt = new Date();

    if (this._status === CountingJobStatus.SUCCESS) return;

    if (this._attempt >= this._maxAttempts) {
      this._status = CountingJobStatus.FAILED;
    } else {
      this._status = CountingJobStatus.PENDING;
    }
  }

  public markSuccess(countingId: string): void {
    this._status = CountingJobStatus.SUCCESS;
    this._countingId = countingId;
    this._errorMessage = '';
  }
}
