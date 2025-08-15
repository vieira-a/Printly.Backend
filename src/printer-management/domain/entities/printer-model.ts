import { ModelDomainValidationException } from '../exceptions';
import {
  CreatePrinterModelProps,
  PrinterModelProps,
  UpdatePrinterModelProps,
} from '../types/printer-model.props';
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

export class PrinterModel extends EntityBase {
  private _manufacturer: string;
  private _description: string;
  private _printOid: string;
  private _copyOid: string;

  private constructor(props: PrinterModelProps) {
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

  public static create(props: CreatePrinterModelProps): PrinterModel {
    return new PrinterModel({ ...props });
  }

  public static restore(
    id: string,
    manufacturer: string,
    description: string,
    printOid: string,
    copyOid: string,
    createdAt: Date,
    updatedAt: Date,
  ): PrinterModel {
    return new PrinterModel({
      id,
      manufacturer,
      description,
      printOid,
      copyOid,
      createdAt,
      updatedAt,
    });
  }

  public updateManufacturer(newManufacturer: string): void {
    this._manufacturer = newManufacturer;
    this.validate();
  }

  public updateDescription(newDescription: string): void {
    this._description = newDescription;
    this.validate();
  }

  public updatePrintOid(newPrintOid: string): void {
    this._printOid = newPrintOid;
    this.validate();
  }

  public updateCopyOid(newCopyOid: string): void {
    this._copyOid = newCopyOid;
    this.validate();
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
