import type { Model } from '@printer/domain/entities';
import type { CreateModelOutput } from '../use-cases/model/create/output/create-model.output';

export abstract class ModelMapper {
  public static toOutput(entity: Model): CreateModelOutput {
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
