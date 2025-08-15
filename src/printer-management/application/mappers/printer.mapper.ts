import { Printer } from '@printer/domain/entities';
import { UpdatePrinterOutput } from '../use-cases/printer/update/output/update-printer.output';
import { FindPrinterOutput } from '../use-cases/printer/find/output/find-printer.output';

export abstract class PrinterMapper {
  public static toOutput(domain: Printer): UpdatePrinterOutput {
    return {
      id: domain.id,
      manufacturer: domain.model?.manufacturer,
      description: domain.model?.description,
      serialNumber: domain.serialNumber,
      ipv4Address: domain.ipv4Address.toString(),
      city: domain.installationLocation?.address.city,
      state: domain.installationLocation?.address.state,
      contact: domain.installationLocation?.contact,
      phone: domain.installationLocation?.phone.toString(),
      printOid: domain.model?.printOid,
      copyOid: domain.model?.copyOid,
      totalPrint: domain.totalPrint,
      totalCopy: domain.totalCopy,
    };
  }

  public static toOutputArray(entities: Printer[]): FindPrinterOutput[] {
    return entities.map((item) => this.toOutput(item));
  }
}
