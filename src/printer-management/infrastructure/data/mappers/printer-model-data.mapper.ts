import { PrinterModel } from '@printer/domain/entities';
import { PrinterModelEntity } from '../typeorm/models';

export abstract class PrinterModelDataMapper {
  public static toDomain(entity: PrinterModelEntity): PrinterModel {
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

  public static toEntity(domain: PrinterModel): PrinterModelEntity {
    return PrinterModelEntity.create({
      manufacturer: domain.manufacturer,
      description: domain.description,
      printOid: domain.printOid,
      copyOid: domain.copyOid,
    });
  }
}
