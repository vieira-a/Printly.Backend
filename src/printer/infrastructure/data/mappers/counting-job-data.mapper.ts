import { CountingJob } from '@printer/domain/entities/counting-job';
import { CountingJobModel } from '../typeorm/models';
import { CountingJobStatus } from '@printer/domain/enums/counting-job-status.enum';
import { IPV4 } from '@printer/domain/entities/value-objects/ipv4';
import { Location, Model, Printer } from '@printer/domain/entities';
import { Address } from '@printer/domain/entities/value-objects/address';
import { CEP } from '@printer/domain/entities/value-objects/cep';
import { Phone } from '@printer/domain/entities/value-objects/phone';

export abstract class CountingJobDataMapper {
  public static toModel(entity: CountingJob): CountingJobModel {
    return CountingJobModel.create(
      entity.printerId,
      entity.ipv4,
      entity.status as CountingJobStatus,
      entity.attempt,
      entity.lastAttempt,
      entity.maxAttempts,
      entity.countingId,
      entity.errorMessage,
    );
  }

  public static restoreToModel(entity: CountingJob): CountingJobModel {
    return CountingJobModel.restore(
      entity.id,
      entity.printerId,
      entity.ipv4,
      entity.status as CountingJobStatus,
      entity.attempt,
      entity.lastAttempt,
      entity.maxAttempts,
      entity.countingId,
      entity.errorMessage,
    );
  }

  public static toDomain(model: CountingJobModel): CountingJob {
    return CountingJob.restore(
      model.id,
      model.printerId,
      IPV4.create(model.ipv4),
      model.status,
      model.attempt,
      model.lastAttempt,
      model.maxAttempts,
      Printer.restore(
        model.printer.id,
        model.printer.sn,
        Model.restore(
          model.printer.model.id,
          model.printer.model.manufacturer,
          model.printer.model.description,
          model.printer.model.printOid,
          model.printer.model.copyOid,
          model.printer.model.createdAt,
          model.printer.model.updatedAt,
        ),
        IPV4.create(model.printer.ipv4),
        Location.restore(
          model.printer.location.id,
          Address.create(
            model.printer.location.street,
            model.printer.location.district,
            model.printer.location.city,
            model.printer.location.state,
            CEP.create(model.printer.location.cep),
            model.printer.location.reference,
          ),
          Phone.create(model.printer.location.areaCode, model.printer.location.phoneNumber),
          model.printer.location.contact,
          model.printer.location.createdAt,
          model.printer.location.updatedAt,
        ),
        model.printer.installedAt,
        model.printer.totalPrint,
        model.printer.totalCopy,
        model.printer.createdAt,
        model.printer.updatedAt,
      ),
      model.countingId,
      model.errorMessage,
      model.createdAt,
      model.updatedAt,
    );
  }

  public static toDomainArray(models: CountingJobModel[]): CountingJob[] {
    return models.map((item) => this.toDomain(item));
  }
}
