export abstract class FindPrinterOutput {
  id: string;
  manufacturer: string;
  description: string;
  serial: string;
  ipv4: string;
  city: string;
  state: string;
  contact: string;
  phone: string;
  printOid: string;
  copyOid: string;
  totalPrint: number;
  totalCopy: number;
}
