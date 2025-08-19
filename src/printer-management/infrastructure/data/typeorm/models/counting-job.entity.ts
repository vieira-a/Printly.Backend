import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { PrinterEntity } from './printer.entity';
import { CountingJobStatus } from '@printer/domain/enums/counting-job-status.enum';
import { CountingJobProps, CreateCountingJobProps } from '@printer/domain/types/counting-job.props';

@Entity({ name: 'counting_jobs' })
export class CountingJobEntity extends BaseEntity {
  @Column({ name: 'printer_id' })
  printerId: string;

  @ManyToOne(() => PrinterEntity, { eager: false })
  @JoinColumn({ name: 'printer_id' })
  printer: PrinterEntity;

  @Column({ name: 'attempt' })
  attempt: number;

  @Column({ name: 'last_attempt', type: 'timestamptz' })
  lastAttempt: Date;

  @Column({ name: 'status', enum: CountingJobStatus })
  status: CountingJobStatus;

  @Column({ name: 'execution_date', type: 'timestamptz' })
  executionDate: Date;

  private constructor(props: CountingJobProps) {
    super(props?.id, props?.createdAt, props?.updatedAt);
    if (props) {
      this.printerId = props.printerId;
      this.attempt = props.attempt;
      this.lastAttempt = props.lastAttempt;
      this.status = props.status;
      this.executionDate = props.executionDate;
    }
  }

  public static create(props: CreateCountingJobProps): CountingJobEntity {
    return new CountingJobEntity({ ...props, attempt: 0, lastAttempt: new Date(), executionDate: new Date() });
  }

  public static restore(props: CountingJobProps): CountingJobEntity {
    return new CountingJobEntity({ ...props });
  }
}
