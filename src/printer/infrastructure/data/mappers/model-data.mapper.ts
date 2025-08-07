import { Model } from '@printer/domain/entities';
import { PrinterModel } from '../typeorm/models/printer-model.model';

export abstract class ModelDataMapper {
  public static toDomain(model: PrinterModel): Model {
    return Model.restore(
      model.id,
      model.manufacturer,
      model.description,
      model.printOid,
      model.copyOid,
      model.createdAt,
      model.updatedAt,
    );
  }
}
