import { IsNotEmpty } from 'class-validator';

export class CreateModelInput {
  manufacturer: string;
  description: string;
  printOid: string;
  copyOid: string;
}
