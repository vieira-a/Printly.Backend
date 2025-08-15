import { PrinterModel } from '@printer/domain/entities';
import { CreateModelOutput } from '../use-cases/model/create/output/create-model.output';

export abstract class PrinterModelMapper {
  public static toOutput(entity: PrinterModel): CreateModelOutput {
    return {
      id: entity.id,
      manufacturer: entity.manufacturer,
      description: entity.description,
      printOid: entity.printOid,
      copyOid: entity.copyOid,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
