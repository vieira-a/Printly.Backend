export abstract class FindPrinterOutput {
  id: string;
  manufacturer: string | undefined;
  description: string | undefined;
  serialNumber: string;
  ipv4Address: string;
  city: string | undefined;
  state: string | undefined;
  departament: string | undefined;
  contact: string | undefined;
  phone: string | undefined;
  printOid: string | undefined;
  copyOid: string | undefined;
  totalPrint: number;
  totalCopy: number;
}
