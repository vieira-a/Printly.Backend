import type { Model } from '@printer/domain/entities';
import type { ModelOutput } from '../use-cases/model/create/output/model.output';

export abstract class ModelMapper {
  public static toOutput(entity: Model): ModelOutput {
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
