import { Location, Model, Printer } from '@printer/domain/entities';
import { PrinterModel } from '../typeorm/models';
import { IPV4 } from '@printer/domain/entities/value-objects/ipv4';
import { Address } from '@printer/domain/entities/value-objects/address';
import { CEP } from '@printer/domain/entities/value-objects/cep';
import { Phone } from '@printer/domain/entities/value-objects/phone';

export class PrinterDataMapper {
  public static toDomain(model: PrinterModel): Printer {
    const restoredModel = Model.restore(
      model.model.id,
      model.model.manufacturer,
      model.model.description,
      model.model.printOid,
      model.model.copyOid,
      model.model.createdAt,
      model.model.updatedAt,
    );

    const restoredLocation = Location.restore(
      model.location.id,
      Address.create(
        model.location.street,
        model.location.district,
        model.location.city,
        model.location.state,
        CEP.create(model.location.cep),
        model.location.reference,
      ),
      Phone.create(model.location.areaCode, model.location.phoneNumber),
      model.location.contact,
      model.createdAt,
      model.updatedAt,
    );

    return Printer.restore(
      model.id,
      model.sn,
      restoredModel,
      IPV4.create(model.ipv4),
      restoredLocation,
      model.installedAt,
      model.totalPrint,
      model.totalCopy,
      model.createdAt,
      model.updatedAt,
    );
  }

  public static toModel(entity: Printer): PrinterModel {
    return PrinterModel.create(
      entity.serial,
      entity.ipv4.toString(),
      entity.model.id,
      entity.location.id,
      entity.installedAt,
    );
  }
}
