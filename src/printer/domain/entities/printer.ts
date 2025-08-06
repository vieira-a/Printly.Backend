import { EntityBase } from './entity-base';
import { Location } from './location';
import { Model } from './model';

export class Printer extends EntityBase {
  private constructor(model: Model, serial: string, ipv4: string, location: Location) {
    super();
  }

  public static create(model: Model, serial: string, ipv4: string, location: Location): Printer {
    return new Printer(model, serial, ipv4, location);
  }
}
