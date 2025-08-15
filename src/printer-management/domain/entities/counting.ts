import { CountingType } from '../enums/counting-type.enum';
import { CountingDomainValidationException } from '../exceptions';
import { CountingProps, CreateCountingProps } from '../types/counting.props';
import { EntityBase } from './entity-base';

const MissingCountingJobIdExceptionMessage = 'Job de contagem não informado.';
const MissingPrinterExceptionMessage = 'Impressora não informada.';
const MissingCollectDateExceptionMessage = 'Data da coleta não informada.';
const MissingPrintsExceptionMessage = 'Quantidade de impressões não informada.';
const MissingCopiesExceptionMessage = 'Quantidade de cópias não informada.';

const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class Counting extends EntityBase {
  private _countingJobId: string;
  private _printerId: string;
  private _prints: number;
  private _copies: number;
  private _collectedAt: Date;
  private _type: CountingType;

  private constructor(props: CountingProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._countingJobId = props.countingJobId;
    this._printerId = props.printerId;
    this._type = props.type;
    this._prints = props.prints;
    this._copies = props.copies;
    this._collectedAt = props.collectedAt;
    this.validate();
  }

  get countingJobId(): string {
    return this._countingJobId;
  }

  get printerId(): string {
    return this._printerId;
  }

  get type(): CountingType {
    return this._type;
  }

  get prints(): number {
    return this._prints;
  }

  get copies(): number {
    return this._copies;
  }

  get collectedAt(): Date {
    return this._collectedAt;
  }

  public static create(props: CreateCountingProps): Counting {
    return new Counting({ ...props });
  }

  public static restore(props: CountingProps): Counting {
    return new Counting({ ...props });
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this._countingJobId) errors.push(MissingCountingJobIdExceptionMessage);
    if (!this._printerId) errors.push(MissingPrinterExceptionMessage);
    if (!this._type) errors.push(MissingPrinterExceptionMessage);
    if (!this._collectedAt) errors.push(MissingCollectDateExceptionMessage);
    if (!this._prints) errors.push(MissingPrintsExceptionMessage);
    if (!this._copies) errors.push(MissingCopiesExceptionMessage);

    if (errors.length > 0)
      throw new CountingDomainValidationException(ValidationExceptionMessage, errors);
  }
}
