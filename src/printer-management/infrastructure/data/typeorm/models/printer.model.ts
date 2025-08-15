import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './base-model';
import { ModelPrinter } from './model-printer';
import { LocationModel } from './location.model';

interface PrinterProps {
  sn: string;
  ipv4: string;
  modelId: string;
  locationId: string;
  installedAt: Date;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity({ name: 'printers' })
export class PrinterModel extends BaseModel {
  @Column({ name: 'sn', type: 'varchar', length: 30, unique: true })
  sn: string;

  @Column({ name: 'ipv4', type: 'varchar', length: 16 })
  ipv4: string;

  @Column({ name: 'model_id' })
  modelId: string;

  @ManyToOne(() => ModelPrinter)
  @JoinColumn({ name: 'model_id' })
  model: ModelPrinter;

  @Column({ name: 'location_id' })
  locationId: string;

  @ManyToOne(() => LocationModel)
  @JoinColumn({ name: 'location_id' })
  location: LocationModel;

  @Column({ name: 'installed_at' })
  installedAt: Date;

  @Column({ name: 'total_print', default: 0 })
  totalPrint: number;

  @Column({ name: 'total_copy', default: 0 })
  totalCopy: number;

  constructor(props?: PrinterProps) {
    super(props?.id, props?.createdAt, props?.updatedAt);
    if (props) {
      this.sn = props.sn;
      this.ipv4 = props.ipv4;
      this.modelId = props.modelId;
      this.locationId = props.locationId;
      this.installedAt = props.installedAt;
    }
  }

  public static create(
    sn: string,
    ipv4: string,
    modelId: string,
    locationId: string,
    installedAt: Date,
  ): PrinterModel {
    return new PrinterModel({ sn, ipv4, modelId, locationId, installedAt });
  }
}
