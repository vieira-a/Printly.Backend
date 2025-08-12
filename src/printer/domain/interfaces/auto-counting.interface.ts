export interface IAutoCounting {
  collect(ipv4: string, oid: string): Promise<string>;
}
