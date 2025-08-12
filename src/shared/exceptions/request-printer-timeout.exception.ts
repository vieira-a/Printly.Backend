import { InfrastructureException } from './infrastructure.exception';

export class RequestPrinterTimeoutException extends InfrastructureException {
  constructor(
    message: string,
    public readonly ipv4?: string,
  ) {
    super(message);
    this.name = 'RequestPrinterTimeoutException';
    Object.setPrototypeOf(this, RequestPrinterTimeoutException.prototype);
  }
}
