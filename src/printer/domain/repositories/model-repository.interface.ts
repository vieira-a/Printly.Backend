import type { Model } from '../entities';

export interface IModelRepository {
  create(input: Model): Promise<Model>;
  existsByManufacturerAndDesciption(manufacturer: string, description: string): Promise<boolean>;
}
