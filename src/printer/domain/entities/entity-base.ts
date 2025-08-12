import { randomUUID } from 'crypto';

export abstract class EntityBase {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  setUpdatedAt(value: Date) {
    this._updatedAt = value;
  }

  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this._id = id ?? randomUUID();
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
  }
}
