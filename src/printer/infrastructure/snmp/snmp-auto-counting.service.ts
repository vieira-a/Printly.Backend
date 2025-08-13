import { Injectable, Logger } from '@nestjs/common';
import * as snmp from 'net-snmp';
import { IAutoCounting } from '@printer/domain/interfaces/auto-counting.interface';

@Injectable()
export class SnmpAutoCountingService implements IAutoCounting {
  private readonly logger = new Logger(SnmpAutoCountingService.name);

  async collect(
    ipv4: string,
    oid: string,
  ): Promise<{ success: boolean; error?: string; count: string | undefined }> {
    return new Promise((resolve) => {
      let session: snmp.Session | undefined;

      try {
        session = snmp.createSession(ipv4, 'public');
      } catch {
        return resolve({ success: false, count: undefined });
      }

      try {
        session.get([oid], (error, varbinds) => {
          try {
            if (error || !varbinds || varbinds.length === 0) {
              return resolve({ success: false, error: error?.message, count: undefined });
            }

            const varbind = varbinds[0];
            if (varbind && !snmp.isVarbindError(varbind)) {
              return resolve({ success: true, count: String(varbind.value) });
            }

            return resolve({ success: false, count: undefined });
          } finally {
            session?.close();
          }
        });
      } catch (error) {
        this.logger.log(error?.message);
        session?.close();
        return resolve({ success: false, error: error?.message, count: undefined });
      }
    });
  }
}
