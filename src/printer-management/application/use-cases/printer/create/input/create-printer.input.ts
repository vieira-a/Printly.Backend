export class CreatePrinterInput {
  serialNumber: string;
  ipv4: string;
  modelId: string;
  locationId: string;
  installedAt: Date;
  totalPrint: number;
  totalCopy: number;
}
