import { randomUUID, UUID } from 'crypto';

export abstract class EntityBase {
  readonly Id: UUID;
  readonly CreatedAt: Date;
  readonly UpdatedAt: Date;

  constructor() {
    this.Id = randomUUID();
    this.CreatedAt = new Date();
    this.UpdatedAt = new Date();
  }
}
