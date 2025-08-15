import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { PrinterEntity } from './printer.entity';
import { CountingType } from '@printer/domain/enums/counting-type.enum';
import { CountingProps, CreateCountingProps } from '@printer/domain/types/counting.props';
import { CountingJobEntity } from './counting-job.entity';

@Entity({ name: 'countings' })
export class CountingEntity extends BaseEntity {
  @Column({ name: 'counting_job_id' })
  countingJobId: string;

  @ManyToOne(() => PrinterEntity, { eager: false })
  @JoinColumn({ name: 'printer_id' })
  countingJob: CountingJobEntity;

  @Column({ name: 'printer_id' })
  printerId: string;

  @ManyToOne(() => PrinterEntity, { eager: false })
  @JoinColumn({ name: 'printer_id' })
  printer: PrinterEntity;

  @Column({ name: 'prints' })
  prints: number;

  @Column({ name: 'copies' })
  copies: number;

  @Column({ name: 'collected_at', type: 'timestamp' })
  collectedAt: Date;

  @Column({ name: 'type' })
  type: CountingType;

  private constructor(props: CountingProps) {
    super(props?.id, props?.createdAt, props?.updatedAt);
    if (props) {
      this.countingJobId = props.countingJobId;
      this.printerId = props.printerId;
      this.prints = props.prints;
      this.copies = props.copies;
      this.collectedAt = props.collectedAt;
      this.type = props.type;
    }
  }

  public static create(props: CreateCountingProps): CountingEntity {
    return new CountingEntity({ ...props });
  }
}
