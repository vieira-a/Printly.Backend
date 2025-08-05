import { UnprocessableEntityException } from '@nestjs/common';
import { EntityBase } from './entity-base';

const InvalidManufacturerExceptionMessage = 'Nome do fabricante inválido ou não informado.';
const InvalidDescriptionExceptionMessage = 'Nome do fabricante inválido ou não informado.';
const InvalidOidExceptionMessage = 'Nome do fabricante inválido ou não informado.';

export class Model extends EntityBase {
  readonly Manufacturer: string;
  readonly Description: string;
  readonly OidPrint: string;
  readonly Oidcopy: string;

  private constructor(manufacturer: string, description: string, oidPrint: string, oidcopy: string) {
    super();
    this.Manufacturer = manufacturer;
    this.Description = description;
    this.OidPrint = oidPrint;
    this.Oidcopy = oidcopy;
    this.Validate();
  }

  public static Create(manufacturer: string, description: string, oidPrint: string, oidcopy: string): Model {
    return new Model(manufacturer, description, oidPrint, oidcopy);
  }

  private Validate() {
    if (!this.Manufacturer || this.Manufacturer.trim().length < 3)
      throw new UnprocessableEntityException(InvalidManufacturerExceptionMessage);

    if (!this.Description || this.Description.trim().length < 3)
      throw new UnprocessableEntityException(InvalidDescriptionExceptionMessage);

    if (!this.OidPrint || this.OidPrint.trim().length < 10)
      throw new UnprocessableEntityException(InvalidOidExceptionMessage);

    if (!this.Oidcopy || this.Oidcopy.trim().length < 10)
      throw new UnprocessableEntityException(InvalidOidExceptionMessage);
  }
}
