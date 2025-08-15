import { CountingType } from '../enums/counting-type.enum';
import { PrinterDomainValidationException } from '../exceptions/printer-domain-validation.exception';
import { CreatePrinterProps, UpdatePrinterProps } from '../types/printer.props';
import { Counting } from './counting';
import { EntityBase } from './entity-base';
import { Location } from './location';
import { Model } from './model';
import { IPV4 } from './value-objects/ipv4';

const MissingModelExceptionMessage = 'Modelo não informado.';
const MissingSerialExceptionMessage = 'Serial não informado.';
const InvalidSerialExceptionMessage = 'Serial deve ter no mínimo 6 caracteres.';
const InvalidTotalPrintExceptionMessage =
  'O total de impressões deve ser igual ou maior que a quantidade atual.';
const InvalidCopyPrintExceptionMessage =
  'O total de cópias deve ser igual ou maior que a quantidade atual.';

const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class Printer extends EntityBase {
  private _model: Model;
  private _serial: string;
  private _ipv4: IPV4;
  private _location: Location;
  private _installedAt: Date;
  private _totalPrint: number;
  private _totalCopy: number;

  private constructor(props: CreatePrinterProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._model = props.model;
    this._serial = props.serial;
    this._ipv4 = props.ipv4;
    this._location = props.location;
    this._installedAt = props.installedAt;
    this._totalPrint = props.totalPrint;
    this._totalCopy = props.totalCopy;
    this.validate();
  }

  get model(): Model {
    return this._model;
  }

  get serial(): string {
    return this._serial;
  }

  get ipv4(): IPV4 {
    return this._ipv4;
  }

  get location(): Location {
    return this._location;
  }

  get installedAt(): Date {
    return this._installedAt;
  }

  get totalPrint(): number {
    return this._totalPrint;
  }

  get totalCopy(): number {
    return this._totalCopy;
  }

  updateModel(model: Model) {
    this._model = model;
  }

  updateIpv4(ipv4: IPV4) {
    this._ipv4 = ipv4;
  }

  updateLocation(location: Location, installedAt: Date) {
    this._location = location;
    this._installedAt = installedAt;
  }

  public static create(
    model: Model,
    serial: string,
    ipv4: IPV4,
    location: Location,
    installedAt: Date,
    totalPrint: number,
    totalCopy: number,
  ): Printer {
    return new Printer({ model, serial, ipv4, location, installedAt, totalPrint, totalCopy });
  }

  public static restore(
    id: string,
    serial: string,
    model: Model,
    ipv4: IPV4,
    location: Location,
    installedAt: Date,
    totalPrint: number,
    totalCopy: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    return new Printer({
      id,
      serial,
      model,
      ipv4,
      location,
      installedAt,
      totalPrint,
      totalCopy,
      createdAt,
      updatedAt,
    });
  }

  public update(props: UpdatePrinterProps) {
    return new Printer({
      id: this.id,
      model: this._model,
      serial: props.serial ?? this._serial,
      ipv4: IPV4.create(props.ipv4!) ?? this._ipv4,
      location: this._location,
      totalPrint: this._totalPrint,
      totalCopy: this._totalCopy,
      installedAt: this._installedAt,
      updatedAt: new Date(),
    });
  }

  public registerCounting(
    totalPrint: number,
    totalCopy: number,
    collectedAt: Date,
    type: CountingType,
  ) {
    const errors: string[] = [];

    if (totalPrint < this._totalPrint) errors.push(InvalidTotalPrintExceptionMessage);
    if (totalCopy < this._totalCopy) errors.push(InvalidCopyPrintExceptionMessage);

    if (errors.length > 0)
      throw new PrinterDomainValidationException(ValidationExceptionMessage, errors);

    const counting = Counting.create(this.id, totalPrint, totalCopy, collectedAt, type);
    this._totalPrint = totalPrint;
    this._totalCopy = totalCopy;

    return counting;
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this._model) errors.push(MissingModelExceptionMessage);

    if (!this._serial) {
      errors.push(MissingSerialExceptionMessage);
    } else if (this._serial.trim().length < 6) errors.push(InvalidSerialExceptionMessage);

    if (errors.length > 0)
      throw new PrinterDomainValidationException(ValidationExceptionMessage, errors);
  }
}
