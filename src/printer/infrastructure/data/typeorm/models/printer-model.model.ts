import { Column, Entity, Unique } from 'typeorm';
import { BaseModel } from './base-model';

@Entity({ name: 'models' })
@Unique(['manufacturer', 'description'])
export class PrinterModel extends BaseModel {
  @Column({ name: 'manufacturer', type: 'varchar', length: 30, nullable: false })
  manufacturer: string;

  @Column({ name: 'description', type: 'varchar', length: 30, nullable: false })
  description: string;

  @Column({ name: 'print_oid', type: 'varchar', length: 50, nullable: false })
  printOid: string;

  @Column({ name: 'copy_oid', type: 'varchar', length: 50, nullable: false })
  copyOid: string;

  private constructor(
    manufacturer: string,
    description: string,
    printOid: string,
    copyOid: string,
  ) {
    super();
    this.manufacturer = manufacturer;
    this.description = description;
    this.printOid = printOid;
    this.copyOid = copyOid;
  }

  public static create(
    manufacturer: string,
    description: string,
    printOid: string,
    copyOid: string,
  ): PrinterModel {
    return new PrinterModel(manufacturer, description, printOid, copyOid);
  }
}
