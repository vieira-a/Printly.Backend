import { randomUUID, UUID } from 'crypto';

export abstract class EntityBase {
  readonly id: UUID;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor() {
    this.id = randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
