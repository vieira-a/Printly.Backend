import type { Model } from '../entities';

export interface IModelRepository {
  create(input: Model): Promise<void>;
}
