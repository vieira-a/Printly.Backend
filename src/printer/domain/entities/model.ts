import { UnprocessableEntityException } from '@nestjs/common';
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
  readonly Manufacturer: string;
  readonly Description: string;
  readonly OidPrint: string;
  readonly Oidcopy: string;

  private constructor(
    manufacturer: string,
    description: string,
    oidPrint: string,
    oidcopy: string,
  ) {
    super();
    this.Manufacturer = manufacturer;
    this.Description = description;
    this.OidPrint = oidPrint;
    this.Oidcopy = oidcopy;
    this.Validate();
  }

  public static Create(
    manufacturer: string,
    description: string,
    oidPrint: string,
    oidcopy: string,
  ): Model {
    return new Model(manufacturer, description, oidPrint, oidcopy);
  }

  private Validate() {
    if (!this.Manufacturer) throw new MissingParamException(MissingManufacturerExceptionMessage);

    if (this.Manufacturer.trim().length < 3)
      throw new InvalidParamException(InvalidManufacturerExceptionMessage);

    if (!this.Description) throw new MissingParamException(MissingDescriptionExceptionMessage);

    if (this.Description.trim().length < 3)
      throw new InvalidParamException(InvalidDescriptionExceptionMessage);

    if (!this.OidPrint) throw new MissingParamException(MissingOidExceptionMessage);

    if (this.OidPrint.trim().length < 10)
      throw new InvalidParamException(InvalidOidExceptionMessage);

    if (!this.Oidcopy || this.Oidcopy.trim().length < 10)
      throw new UnprocessableEntityException(InvalidOidExceptionMessage);
  }
}
