import { Location } from '@printer/domain/entities';

export interface ILocationRepository {
  create(input: Location): Promise<Location>;
  findById(id: string): Promise<Location | null>;
  update(input: Location): Promise<Location>;
}
