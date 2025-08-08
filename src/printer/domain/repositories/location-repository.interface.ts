import type { Location } from '../entities';

export interface ILocationRepository {
  create(input: Location): Promise<Location>;
}
