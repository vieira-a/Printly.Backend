import { PrinterModel } from '@printer/domain/entities';
import { CreatePrinterModelOutput } from '../use-cases/model/create/output/create-printer-model.output';

export abstract class PrinterModelMapper {
  public static toOutput(entity: PrinterModel): CreatePrinterModelOutput {
    return PrinterModel.restore({
      id: entity.id,
      manufacturer: entity.manufacturer,
      description: entity.description,
      printOid: entity.printOid,
      copyOid: entity.copyOid,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
