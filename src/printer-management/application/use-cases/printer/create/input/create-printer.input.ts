export class CreatePrinterInput {
  serialNumber: string;
  ipv4Address: string;
  modelId: string;
  installationLocationId: string;
  installedAt: Date;
  totalPrint: number;
  totalCopy: number;
}
