import { Column, Entity, Unique } from 'typeorm';
import { BaseModel } from './base-model';

interface ModelProps {
  manufacturer: string;
  description: string;
  printOid: string;
  copyOid: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity({ name: 'models' })
@Unique(['manufacturer', 'description'])
export class ModelPrinter extends BaseModel {
  @Column({ name: 'manufacturer', type: 'varchar', length: 30, nullable: false })
  manufacturer: string;

  @Column({ name: 'description', type: 'varchar', length: 30, nullable: false })
  description: string;

  @Column({ name: 'print_oid', type: 'varchar', length: 50, nullable: false })
  printOid: string;

  @Column({ name: 'copy_oid', type: 'varchar', length: 50, nullable: false })
  copyOid: string;

  constructor(props?: ModelProps) {
    super(props?.id, props?.createdAt, props?.updatedAt);
    if (props) {
      this.manufacturer = props.manufacturer;
      this.description = props.description;
      this.printOid = props.printOid;
      this.copyOid = props.copyOid;
    }
  }

  public static create(
    manufacturer: string,
    description: string,
    printOid: string,
    copyOid: string,
  ): ModelPrinter {
    return new ModelPrinter({ manufacturer, description, printOid, copyOid });
  }

  public static restore(
    id: string,
    manufacturer: string,
    description: string,
    printOid: string,
    copyOid: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    return new ModelPrinter({
      id,
      manufacturer,
      description,
      printOid,
      copyOid,
      createdAt,
      updatedAt,
    });
  }
}
