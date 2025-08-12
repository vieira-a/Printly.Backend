import { PrinterDomainValidationException } from '../exceptions/printer-domain-validation.exception';
import { EntityBase } from './entity-base';
import { Location } from './location';
import { Model } from './model';
import { IPV4 } from './value-objects/ipv4';

const MissingModelExceptionMessage = 'Modelo não informado.';
const MissingSerialExceptionMessage = 'Serial não informado.';
const InvalidSerialExceptionMessage = 'Serial deve ter no mínimo 6 caracteres.';
const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

interface PrinterProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  model: Model;
  serial: string;
  ipv4: IPV4;
  location: Location;
  installedAt: Date;
}

export class Printer extends EntityBase {
  private _model: Model;
  private _serial: string;
  private _ipv4: IPV4;
  private _location: Location;
  private _installedAt: Date;

  private constructor(props: PrinterProps) {
    super(props.id, props.createdAt, props.updatedAt);
    ((this._model = props.model),
      (this._serial = props.serial),
      (this._ipv4 = props.ipv4),
      (this._location = props.location));
    this._installedAt = props.installedAt;
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

  updateModel(model: Model) {
    this._model = model;
  }

  updateIpv4(ipv4: IPV4) {
    this._ipv4 = ipv4;
  }

  updateLocation(location: Location) {
    this._location = location;
  }

  public static create(
    model: Model,
    serial: string,
    ipv4: IPV4,
    location: Location,
    installedAt: Date,
  ): Printer {
    return new Printer({ model, serial, ipv4, location, installedAt });
  }

  public static restore(
    id: string,
    serial: string,
    model: Model,
    ipv4: IPV4,
    location: Location,
    installedAt: Date,
    createdAt: Date,
    updatedAt: Date,
  ) {
    return new Printer({ id, serial, model, ipv4, location, installedAt, createdAt, updatedAt });
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
