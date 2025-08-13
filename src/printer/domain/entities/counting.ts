import type { CountingType } from '../enums/counting-type.enum';
import { CountingDomainValidationException } from '../exceptions';
import { CreateCountingProps } from '../types/counting.props';
import { EntityBase } from './entity-base';

const MissingPrinterExceptionMessage = 'Impressora não informada.';
const MissingCollectDateExceptionMessage = 'Data da coleta não informada.';

const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class Counting extends EntityBase {
  private _printerId: string;
  private _totalPrint: number;
  private _totalCopy: number;
  private _collectedAt: Date;
  private _type: CountingType;

  private constructor(props: CreateCountingProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._printerId = props.printerId;
    this._totalPrint = props.totalPrint;
    this._totalCopy = props.totalCopy;
    this._collectedAt = props.collectedAt;
    this._type = props.type;
    this.validate();
  }

  get printerId(): string {
    return this._printerId;
  }

  get totalPrint(): number {
    return this._totalPrint;
  }

  get totalCopy(): number {
    return this._totalCopy;
  }

  get collectedAt(): Date {
    return this._collectedAt;
  }

  get type(): CountingType {
    return this._type;
  }

  public static create(
    printerId: string,
    totalPrint: number,
    totalCopy: number,
    collectedAt: Date,
    type: CountingType,
  ) {
    return new Counting({ printerId, totalPrint, totalCopy, collectedAt, type });
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this._printerId) errors.push(MissingPrinterExceptionMessage);
    if (!this._collectedAt) errors.push(MissingCollectDateExceptionMessage);

    if (errors.length > 0)
      throw new CountingDomainValidationException(ValidationExceptionMessage, errors);
  }
}
