import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { PrinterEntity } from './printer.entity';
import { CountingJobStatus } from '@printer/domain/enums/counting-job-status.enum';
import { CountingJobProps, CreateCountingJobProps } from '@printer/domain/entities/counting-job';

@Entity({ name: 'counting_jobs' })
export class CountingJobEntity extends BaseEntity {
  @Column({ name: 'printer_id' })
  printerId: string;

  @ManyToOne(() => PrinterEntity, { eager: false })
  @JoinColumn({ name: 'printer_id' })
  printer: PrinterEntity;

  @Column({ name: 'attempt' })
  attempt: number;

  @Column({ name: 'last_attempt' })
  lastAttempt: Date;

  @Column({ name: 'status', enum: CountingJobStatus })
  status: CountingJobStatus;

  @Column({ name: 'execution_date' })
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
    return new CountingJobEntity({ ...props });
  }

  public static restore(props: CountingJobProps): CountingJobEntity {
    return new CountingJobEntity({ ...props });
  }
}
