export interface IAutoCounting {
  collect(ipv4: string, oid: string): Promise<{ success: boolean; error?: string; count: string | undefined }>;
}
