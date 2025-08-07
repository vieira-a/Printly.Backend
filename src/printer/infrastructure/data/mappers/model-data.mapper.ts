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

  public static toModel(domain: Model): PrinterModel {
    return PrinterModel.restore(
      domain.id,
      domain.manufacturer,
      domain.description,
      domain.printOid,
      domain.copyOid,
      domain.createdAt,
      domain.updatedAt,
    );
  }
}
