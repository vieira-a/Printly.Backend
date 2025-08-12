import { Injectable } from '@nestjs/common';
import * as snmp from 'net-snmp';
import { IAutoCounting } from '@printer/domain/interfaces/auto-counting.interface';
import { RequestTimedOutError } from '@shared/exceptions/request-timeout.exception';

const TimeOutExceptionMessage = 'Não foi possível obter o contador da impressora.';

@Injectable()
export class SnmpAutoCountingService implements IAutoCounting {
  async collect(ipv4: string, oid: string): Promise<string> {
    const session = snmp.createSession(ipv4, 'public');

    return new Promise((resolve, reject) => {
      session.get([oid], (error, varbinds) => {
        session.close();

        if (error) {
          if (error.name === 'RequestTimedOutError') {
            return reject(new RequestTimedOutError(TimeOutExceptionMessage, ipv4));
          }
          return reject(error);
        }

        const varbind = varbinds[0];

        if (varbind && !snmp.isVarbindError(varbind)) {
          session.close();
          return resolve(String(varbind.value));
        } else {
          session.close();
          return reject(new Error('SNMP Error or no data'));
        }
      });
    });
  }
}
