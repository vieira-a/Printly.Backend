import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from './base-entity';
import { CreatePrinterModelProps, PrinterModelProps } from '@printer/domain/types/printer-model.props';

@Entity({ name: 'printer_models' })
@Unique(['manufacturer', 'description'])
export class PrinterModelEntity extends BaseEntity {
  @Column({ name: 'manufacturer', type: 'varchar', length: 30, nullable: false })
  manufacturer: string;

  @Column({ name: 'description', type: 'varchar', length: 30, nullable: false })
  description: string;

  @Column({ name: 'print_oid', type: 'varchar', length: 50, nullable: false })
  printOid: string;

  @Column({ name: 'copy_oid', type: 'varchar', length: 50, nullable: false })
  copyOid: string;

  constructor(props?: PrinterModelProps) {
    super(props?.id, props?.createdAt, props?.updatedAt);
    if (props) {
      this.manufacturer = props.manufacturer;
      this.description = props.description;
      this.printOid = props.printOid;
      this.copyOid = props.copyOid;
    }
  }

  public static create(props: CreatePrinterModelProps): PrinterModelEntity {
    return new PrinterModelEntity({ ...props });
  }

  public static restore(props: PrinterModelProps) {
    return new PrinterModelEntity({ ...props });
  }
}
