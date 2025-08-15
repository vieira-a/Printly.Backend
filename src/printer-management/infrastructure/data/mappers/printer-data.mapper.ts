import { Printer } from '@printer/domain/entities';
import { PrinterEntity } from '../typeorm/models';
import { IPV4 } from '@printer/domain/entities/value-objects/ipv4';

export class PrinterDataMapper {
  //printer_models', 'installation_location
  public static toDomain(entity: PrinterEntity): Printer {
    return Printer.restore({
      id: entity.id,
      serialNumber: entity.serialNumber,
      ipv4Address: IPV4.create(entity.ipv4Address),
      modelId: entity.modelId,
      installationLocationId: entity.installationLocationId,
      installedAt: entity.installedAt,
      totalPrint: entity.totalPrint,
      totalCopy: entity.totalCopy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  public static toEntity(domain: Printer): PrinterEntity {
    return PrinterEntity.create({
      serialNumber: domain.serialNumber,
      ipv4Address: domain.ipv4Address.toString(),
      modelId: domain.modelId,
      installationLocationId: domain.installationLocationId,
      installedAt: domain.installedAt,
      totalPrint: domain.totalPrint,
      totalCopy: domain.totalCopy,
    });
  }

  public static toDomainArray(entities: PrinterEntity[]): Printer[] {
    return entities.map((entity) =>
      Printer.restore({
        id: entity.id,
        serialNumber: entity.serialNumber,
        ipv4Address: IPV4.create(entity.ipv4Address),
        modelId: entity.modelId,
        installationLocationId: entity.installationLocationId,
        installedAt: entity.installedAt,
        totalPrint: entity.totalPrint,
        totalCopy: entity.totalCopy,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      }),
    );
  }
}
