import { Location } from '@printer/domain/entities';

export interface ILocationRepository {
  create(input: Location): Promise<Location>;
}
