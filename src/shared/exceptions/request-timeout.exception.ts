import { InfrastructureException } from './infrastructure.exception';

export class RequestTimedOutError extends InfrastructureException {
  constructor(
    message = 'Request timed out',
    public readonly ipv4?: string,
  ) {
    super(message);
    this.name = 'RequestTimedOutError';
    Object.setPrototypeOf(this, RequestTimedOutError.prototype);
  }
}
