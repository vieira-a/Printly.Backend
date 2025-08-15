import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './base-model';
import { PrinterModel } from './printer.model';
import type { CountingType } from '@printer/domain/enums/counting-type.enum';

export type CreateCountingProps = {
  printerId: string;
  totalPrint: number;
  totalCopy: number;
  collectedAt: Date;
  type: CountingType;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

@Entity({ name: 'counting' })
export class CountingModel extends BaseModel {
  @Column({ name: 'printer_id' })
  printerId: string;

  @ManyToOne(() => PrinterModel, { eager: false })
  @JoinColumn({ name: 'printer_id' })
  printer: PrinterModel;

  @Column({ name: 'total_print' })
  totalPrint: number;

  @Column({ name: 'total_copy' })
  totalCopy: number;

  @Column({ name: 'collected_at', type: 'timestamp' })
  collectedAt: Date;

  @Column({ name: 'type' })
  type: CountingType;

  private constructor(props: CreateCountingProps) {
    super(props?.id, props?.createdAt, props?.updatedAt);
    if (props) {
      this.printerId = props.printerId;
      this.totalPrint = props.totalPrint;
      this.totalCopy = props.totalCopy;
      this.collectedAt = props.collectedAt;
      this.type = props.type;
    }
  }

  public static create(
    printerId: string,
    totalPrint: number,
    totalCopy: number,
    collectedAt: Date,
    type: CountingType,
  ): CountingModel {
    return new CountingModel({ printerId, totalPrint, totalCopy, collectedAt, type });
  }
}
