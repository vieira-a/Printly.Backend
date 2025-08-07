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

interface ModelProps {
  manufacturer: string;
  description: string;
  printOid: string;
  copyOid: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UpdateProps {
  manufacturer?: string;
  description?: string;
  printOid?: string;
  copyOid?: string;
}

export class Model extends EntityBase {
  private _manufacturer: string;
  private _description: string;
  private _printOid: string;
  private _copyOid: string;

  private constructor(props: ModelProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._manufacturer = props.manufacturer;
    this._description = props.description;
    this._printOid = props.printOid;
    this._copyOid = props.copyOid;
    this.validate();
  }

  get manufacturer() {
    return this._manufacturer;
  }

  get description() {
    return this._description;
  }

  get printOid() {
    return this._printOid;
  }

  get copyOid() {
    return this._copyOid;
  }

  public static create(
    manufacturer: string,
    description: string,
    printOid: string,
    copyOid: string,
  ): Model {
    return new Model({ manufacturer, description, printOid, copyOid });
  }

  public static restore(
    id: string,
    manufacturer: string,
    description: string,
    printOid: string,
    copyOid: string,
    createdAt: Date,
    updatedAt: Date,
  ): Model {
    return new Model({ id, manufacturer, description, printOid, copyOid, createdAt, updatedAt });
  }

  public update(props: UpdateProps): void {
    const updatedManufacturer = props.manufacturer ?? this.manufacturer;
    const updatedDescription = props.description ?? this.description;
    const updatedPrintOid = props.printOid ?? this.printOid;
    const updatedCopyOid = props.copyOid ?? this.copyOid;

    new Model({
      id: this.id,
      manufacturer: updatedManufacturer,
      description: updatedDescription,
      printOid: updatedPrintOid,
      copyOid: updatedCopyOid,
      createdAt: this.createdAt,
      updatedAt: new Date(),
    });

    this._manufacturer = updatedManufacturer;
    this._description = updatedDescription;
    this._printOid = updatedPrintOid;
    this._copyOid = updatedCopyOid;
    this.updatedAt = new Date();
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
