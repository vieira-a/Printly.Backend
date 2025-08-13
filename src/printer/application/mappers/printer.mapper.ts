import { Printer } from '@printer/domain/entities';
import { UpdatePrinterOutput } from '../use-cases/printer/update/output/update-printer.output';
import { FindPrinterOutput } from '../use-cases/printer/find/output/find-printer.output';

export abstract class PrinterMapper {
  public static toOutput(entity: Printer): UpdatePrinterOutput {
    return {
      id: entity.id,
      manufacturer: entity.model.manufacturer,
      description: entity.model.description,
      serial: entity.serial,
      ipv4: entity.ipv4.toString(),
      city: entity.location.address.city,
      state: entity.location.address.state,
      contact: entity.location.contact,
      phone: entity.location.phone.toString(),
      totalPrint: entity.totalPrint,
      totalCopy: entity.totalCopy,
    };
  }

  public static toOutputArray(entities: Printer[]): FindPrinterOutput[] {
    return entities.map((item) => this.toOutput(item));
  }
}
