import { Model } from '@printer/domain/entities';
import { ModelPrinter } from '../typeorm/models';

export abstract class ModelDataMapper {
  public static toDomain(model: ModelPrinter): Model {
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

  public static toModel(domain: Model): ModelPrinter {
    return ModelPrinter.restore(
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
