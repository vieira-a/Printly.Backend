import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { PrinterModelEntity } from './printer-model.entity';
import { InstallationLocationEntity } from './installation-location.entity';
import { CreatePrinterEntityProps, PrinterEntityProps } from '@printer/domain/types/printer.props';

@Entity({ name: 'printers' })
export class PrinterEntity extends BaseEntity {
  @Column({ name: 'serial_number', type: 'varchar', length: 30, unique: true })
  serialNumber: string;

  @Column({ name: 'ipv4_address', type: 'varchar', length: 16 })
  ipv4Address: string;

  @Column({ name: 'model_id' })
  modelId: string;

  @ManyToOne(() => PrinterModelEntity)
  @JoinColumn({ name: 'model_id' })
  model: PrinterModelEntity;

  @Column({ name: 'installation_location_id' })
  installationLocationId: string;

  @ManyToOne(() => InstallationLocationEntity)
  @JoinColumn({ name: 'installation_location_id' })
  installationLocation: InstallationLocationEntity;

  @Column({ name: 'installed_at', type: 'timestamptz' })
  installedAt: Date;

  @Column({ name: 'total_print', default: 0 })
  totalPrint: number;

  @Column({ name: 'total_copy', default: 0 })
  totalCopy: number;

  constructor(props: PrinterEntityProps) {
    super(props?.id, props?.createdAt, props?.updatedAt);
    if (props) {
      this.serialNumber = props.serialNumber;
      this.ipv4Address = props.ipv4Address.toString();
      this.modelId = props.modelId;
      this.installationLocationId = props.installationLocationId;
      this.installedAt = props.installedAt;
    }
  }

  public static create(props: CreatePrinterEntityProps): PrinterEntity {
    return new PrinterEntity({ ...props });
  }

  public static restore(props: PrinterEntityProps): PrinterEntity {
    return new PrinterEntity({ ...props });
  }
}
