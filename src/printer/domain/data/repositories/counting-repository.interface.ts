import { Counting } from '@printer/domain/entities/counting';

export interface ICountingRepository {
  create(counting: Counting): Promise<Counting>;
}
