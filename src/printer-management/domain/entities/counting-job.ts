import { CountingJobStatus } from '../enums/counting-job-status.enum';
import { CountingJobDomainValidationException } from '../exceptions';
import { CountingJobProps, CreateCountingJobProps } from '../types/counting-job.props';
import { EntityBase } from './entity-base';
import { Printer } from './printer';

const MissingPrinterExceptionMessage = 'Impressora não informada.';
const MissingStatusExceptionMessage = 'Status da contagem não informado.';
const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class CountingJob extends EntityBase {
  private _printerId: string;
  private _printer?: Printer;
  private _attempt: number;
  private _lastAttempt: Date;
  private _status: CountingJobStatus;
  private _executionDate: Date;

  private constructor(props: CountingJobProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._printerId = props.printerId;
    this._printer = props.printer;
    this._attempt = props.attempt;
    this._lastAttempt = props.lastAttempt;
    this._status = props.status;
    this._executionDate = props.executionDate;
    this.validate();
  }

  get printerId(): string {
    return this._printerId;
  }

  get printer(): Printer | undefined {
    return this._printer;
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
    return new CountingJob({
      ...props,
      attempt: 0,
      lastAttempt: new Date(),
      executionDate: new Date(),
    });
  }

  public static restore(props: CountingJobProps): CountingJob {
    return new CountingJob({ ...props });
  }

  public registerAttempt(): void {
    this._attempt++;
    this._lastAttempt = new Date();

    if (this._status === CountingJobStatus.SUCCESS) return;

    if (this._attempt >= 10) {
      this._status = CountingJobStatus.FAILED;
    } else {
      this._status = CountingJobStatus.PENDING;
    }
  }

  public markSuccess(): void {
    this._status = CountingJobStatus.SUCCESS;
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this._printerId) errors.push(MissingPrinterExceptionMessage);
    if (!this._status) errors.push(MissingStatusExceptionMessage);

    if (errors.length > 0) throw new CountingJobDomainValidationException(ValidationExceptionMessage, errors);
  }
}
