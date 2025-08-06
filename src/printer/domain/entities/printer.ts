import { InvalidParamException, MissingParamException } from '../exceptions';
import { EntityBase } from './entity-base';
import { Location } from './location';
import { Model } from './model';

const MissingModelExceptionMessage = 'Modelo não informado.';
const MissingSerialExceptionMessage = 'Serial não informado.';
const InvalidSerialExceptionMessage = 'Serial deve ter no mínimo 6 caracteres.';

export class Printer extends EntityBase {
  private constructor(
    readonly model: Model,
    readonly serial: string,
    readonly ipv4: string,
    readonly location: Location,
  ) {
    super();
    this.validate();
  }

  public static create(model: Model, serial: string, ipv4: string, location: Location): Printer {
    return new Printer(model, serial, ipv4, location);
  }

  private validate(): void {
    if (!this.model) throw new MissingParamException(MissingModelExceptionMessage);

    if (!this.serial) throw new MissingParamException(MissingSerialExceptionMessage);
    if (this.serial.trim().length < 6)
      throw new InvalidParamException(InvalidSerialExceptionMessage);
  }
}
