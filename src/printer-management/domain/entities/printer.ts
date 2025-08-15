import { CountingType } from '../enums/counting-type.enum';
import { PrinterDomainValidationException } from '../exceptions/printer-domain-validation.exception';
import { CreatePrinterProps, PrinterProps } from '../types/printer.props';
import { Counting } from './counting';
import { EntityBase } from './entity-base';
import { IPV4 } from './value-objects/ipv4';

const MissingModelExceptionMessage = 'Modelo não informado.';
const MissingSerialNumberExceptionMessage = 'Serial não informado.';
const InvalidSeriaNumberlExceptionMessage = 'Serial deve ter no mínimo 6 caracteres.';
const MissingIPv4AddressExceptionMessage = 'Endereço IP não informado.';
const MissingInstallationLocationExceptionMessage = 'Local de instalação não informado.';
const MissingInstallationDateExceptionMessage = 'Data de instalação não informada.';

const InvalidTotalPrintExceptionMessage =
  'O total de impressões deve ser igual ou maior que a quantidade atual.';
const InvalidCopyPrintExceptionMessage =
  'O total de cópias deve ser igual ou maior que a quantidade atual.';

const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class Printer extends EntityBase {
  private _serialNumber: string;
  private _ipv4Address: IPV4;
  private _modelId: string;
  private _installationLocationId: string;
  private _installedAt: Date;
  private _totalPrint: number;
  private _totalCopy: number;
  private _countings: Counting[];

  private constructor(props: PrinterProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._serialNumber = props.serialNumber;
    this._ipv4Address = props.ipv4Address;
    this._modelId = props.modelId;
    this._installationLocationId = props.installationLocationId;
    this._installedAt = props.installedAt;
    this._totalPrint = props.totalPrint;
    this._totalCopy = props.totalCopy;
    this.validate();
  }

  get modelId(): string {
    return this._modelId;
  }

  get serialNumber(): string {
    return this._serialNumber;
  }

  get ipv4Address(): IPV4 {
    return this._ipv4Address;
  }

  get installationLocationId(): string {
    return this._installationLocationId;
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

  get countings(): Counting[] {
    return this._countings;
  }

  updateSerialNumber(newSerialNumber: string): void {
    this._serialNumber = newSerialNumber;
  }

  updateIpv4Address(newIpv4: IPV4): void {
    this._ipv4Address = newIpv4;
  }

  updateModel(newModelId: string): void {
    this._modelId = newModelId;
  }

  updateInstallationLocation(newInstalationLocationid: string, installedAt: Date) {
    this._installationLocationId = newInstalationLocationid;
    this._installedAt = installedAt;
  }

  addCounting(
    totalPrint: number,
    totalCopy: number,
    collectedAt: Date,
    type: CountingType,
  ): Counting {
    const errors: string[] = [];

    if (totalPrint < this._totalPrint) errors.push(InvalidTotalPrintExceptionMessage);
    if (totalCopy < this._totalCopy) errors.push(InvalidCopyPrintExceptionMessage);

    if (errors.length > 0) {
      throw new PrinterDomainValidationException(ValidationExceptionMessage, errors);
    }

    const newCounting = Counting.create(this.id, totalPrint, totalCopy, collectedAt, type);

    this._countings.push(newCounting);
    this._totalPrint = totalPrint;
    this._totalCopy = totalCopy;

    return newCounting;
  }

  public static create(props: CreatePrinterProps): Printer {
    return new Printer({ ...props });
  }

  public static restore(
    id: string,
    serialNumber: string,
    ipv4Address: IPV4,
    modelId: string,
    installationLocationId: string,
    installedAt: Date,
    totalPrint: number,
    totalCopy: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    return new Printer({
      id,
      serialNumber,
      ipv4Address,
      modelId,
      installationLocationId,
      installedAt,
      totalPrint,
      totalCopy,
      createdAt,
      updatedAt,
    });
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this._serialNumber) {
      errors.push(MissingSerialNumberExceptionMessage);
    } else if (this._serialNumber.trim().length < 6)
      errors.push(InvalidSeriaNumberlExceptionMessage);

    if (!this._modelId) errors.push(MissingModelExceptionMessage);

    if (!this._ipv4Address) errors.push(MissingIPv4AddressExceptionMessage);

    if (!this._installationLocationId) errors.push(MissingInstallationLocationExceptionMessage);

    if (!this._installedAt) errors.push(MissingInstallationDateExceptionMessage);

    if (errors.length > 0)
      throw new PrinterDomainValidationException(ValidationExceptionMessage, errors);
  }
}
