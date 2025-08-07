import { ModelDomainValidationException } from '../exceptions';
import { EntityBase } from './entity-base';

const InvalidManufacturerExceptionMessage =
  'Nome do fabricante deve conter no mínimo 3 caracteres.';
const MissingManufacturerExceptionMessage = 'Nome do fabricante não informado.';
const InvalidDescriptionExceptionMessage =
  'Descrição do modelo deve conter no mínimo 3 caracteres.';
const MissingDescriptionExceptionMessage = 'Descrição do modelo não informado.';
const InvalidOidExceptionMessage = 'OID de contador deve conter no mínimo 10 caracteres.';
const MissingOidExceptionMessage = 'OID de contador não informado.';
const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class Model extends EntityBase {
  private constructor(
    readonly manufacturer: string,
    readonly description: string,
    readonly printOid: string,
    readonly copyOid: string,
  ) {
    super();
    this.validate();
  }

  public static create(
    manufacturer: string,
    description: string,
    printOid: string,
    copyOid: string,
  ): Model {
    return new Model(manufacturer, description, printOid, copyOid);
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this.manufacturer) {
      errors.push(MissingManufacturerExceptionMessage);
    } else if (this.manufacturer.trim().length < 3) {
      errors.push(InvalidManufacturerExceptionMessage);
    }

    if (!this.description) {
      errors.push(MissingDescriptionExceptionMessage);
    } else if (this.description.trim().length < 3) {
      errors.push(InvalidDescriptionExceptionMessage);
    }

    if (!this.printOid) {
      errors.push(MissingOidExceptionMessage);
    } else if (this.printOid.trim().length < 10) {
      errors.push(InvalidOidExceptionMessage);
    }

    if (!this.copyOid) {
      errors.push(MissingOidExceptionMessage);
    } else if (this.copyOid.trim().length < 10) {
      errors.push(InvalidOidExceptionMessage);
    }

    if (errors.length > 0)
      throw new ModelDomainValidationException(ValidationExceptionMessage, errors);
  }
}
