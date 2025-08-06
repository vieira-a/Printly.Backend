import { EntityBase } from './entity-base';
import { InvalidParamException, MissingParamException } from '../exceptions';

const InvalidManufacturerExceptionMessage =
  'Nome do fabricante deve conter no mínimo 3 caracteres.';
const MissingManufacturerExceptionMessage = 'Nome do fabricante não informado.';
const InvalidDescriptionExceptionMessage =
  'Descrição do modelo deve conter no mínimo 3 caracteres.';
const MissingDescriptionExceptionMessage = 'Descrição do modelo não informado.';
const InvalidOidExceptionMessage = 'OID de contador deve conter no mínimo 10 caracteres.';
const MissingOidExceptionMessage = 'OID de contador não informado.';

export class Model extends EntityBase {
  readonly manufacturer: string;
  readonly description: string;
  readonly printOid: string;
  readonly copyOid: string;

  private constructor(
    manufacturer: string,
    description: string,
    printOid: string,
    copyOid: string,
  ) {
    super();
    this.manufacturer = manufacturer;
    this.description = description;
    this.printOid = printOid;
    this.copyOid = copyOid;
    this.Validate();
  }

  public static create(
    manufacturer: string,
    description: string,
    printOid: string,
    copyOid: string,
  ): Model {
    return new Model(manufacturer, description, printOid, copyOid);
  }

  private Validate() {
    if (!this.manufacturer) throw new MissingParamException(MissingManufacturerExceptionMessage);

    if (this.manufacturer.trim().length < 3)
      throw new InvalidParamException(InvalidManufacturerExceptionMessage);

    if (!this.description) throw new MissingParamException(MissingDescriptionExceptionMessage);

    if (this.description.trim().length < 3)
      throw new InvalidParamException(InvalidDescriptionExceptionMessage);

    if (!this.printOid) throw new MissingParamException(MissingOidExceptionMessage);

    if (this.printOid.trim().length < 10)
      throw new InvalidParamException(InvalidOidExceptionMessage);

    if (!this.copyOid) throw new MissingParamException(MissingOidExceptionMessage);

    if (this.copyOid.trim().length < 10)
      throw new InvalidParamException(InvalidOidExceptionMessage);
  }
}
