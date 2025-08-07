import { randomUUID } from 'crypto';

export abstract class EntityBase {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id ?? randomUUID();
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
