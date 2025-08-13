import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseModel } from './base-model';
import { PrinterModel } from './printer.model';
import { CountingModel } from './counting.model';
import { CountingJobStatus } from '@printer/domain/enums/counting-job-status.enum';

type CreateCountingJobProps = {
  printerId: string;
  ipv4: string;
  status: CountingJobStatus;
  attempt: number;
  lastAttempt: Date;
  maxAttempts: number;
  countingId?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  errorMessage?: string;
};

@Entity({ name: 'counting_jobs' })
export class CountingJobModel extends BaseModel {
  @Column({ name: 'printer_id' })
  printerId: string;

  @ManyToOne(() => PrinterModel, { eager: false })
  @JoinColumn({ name: 'printer_id' })
  printer: PrinterModel;

  @Column({ name: 'counting_id', nullable: true })
  countingId?: string;

  @OneToOne(() => CountingModel)
  @JoinColumn({ name: 'counting_id' })
  counting?: CountingModel;

  @Column({ name: 'ipv4' })
  ipv4: string;

  @Column({ name: 'status', enum: CountingJobStatus })
  status: CountingJobStatus;

  @Column({ name: 'attempt' })
  attempt: number;

  @Column({ name: 'last_attempt', nullable: true })
  lastAttempt?: Date;

  @Column({ name: 'max_attempts' })
  maxAttempts: number;

  @Column({ name: 'error_message', nullable: true })
  errorMessage?: string;

  private constructor(props: CreateCountingJobProps) {
    super(props?.id, props?.createdAt, props?.updatedAt);
    if (props) {
      this.printerId = props.printerId;
      this.ipv4 = props.ipv4;
      this.status = props.status;
      this.attempt = props.attempt;
      this.lastAttempt = props.lastAttempt;
      this.maxAttempts = props.maxAttempts;
      this.countingId = props.countingId;
      this.errorMessage = props.errorMessage ?? undefined;
    }
  }

  public static create(
    printerId: string,
    ipv4: string,
    status: CountingJobStatus,
    attempt: number,
    lastAttempt: Date,
    maxAttempts: number,
    countingId?: string,
    errorMessage?: string,
  ): CountingJobModel {
    return new CountingJobModel({
      printerId,
      ipv4,
      status,
      attempt,
      lastAttempt,
      maxAttempts,
      countingId,
      errorMessage,
    });
  }
}
