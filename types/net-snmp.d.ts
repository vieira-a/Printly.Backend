declare module 'net-snmp' {
  export interface Varbind {
    oid: string;
    type: number;
    value: string | number | Buffer | null;
  }

  export interface Session {
    get(oids: string[], callback: (error: Error | null, varbinds: Varbind[]) => void): void;

    close(): void;
  }

  export function createSession(target: string, community: string): Session;

  export function isVarbindError(varbind: Varbind): boolean;
}
