import type { Model } from '../entities';

export interface IModelRepository {
  create(input: Model): Promise<void>;
  findByManufacturerAndDescription(manufacturer: string, description: string): Promise<boolean>;
}
