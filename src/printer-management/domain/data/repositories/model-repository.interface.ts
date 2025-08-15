import type { Model } from '@printer/domain/entities';

export interface IModelRepository {
  create(input: Model): Promise<Model>;
  existsByManufacturerAndDesciption(manufacturer: string, description: string): Promise<boolean>;
  findById(id: string): Promise<Model | null>;
  update(input: Model): Promise<Model>;
}
