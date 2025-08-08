import { IPV4 } from '../ipv4';
import { IPv4DomainValidationException } from '@printer/domain/exceptions/ipv4-domain-validation.exception';

describe('IPV4 Value Object', () => {
  it('should create a valid IPv4', () => {
    const ip = IPV4.create('192.168.0.1');

    expect(ip.toString()).toBe('192.168.0.1');
    expect(ip.toPrimitives()).toBe('192.168.0.1');
    expect(ip.getOctets()).toEqual([192, 168, 0, 1]);
  });

  it('should remove spaces and accept a trimmed IP', () => {
    const ip = IPV4.create(' 10.0.0.1 ');
    expect(ip.toString()).toBe('10.0.0.1');
  });

  it('shoud throw IPv4DomainValidationException if IP is not provided', () => {
    expect(() => IPV4.create('')).toThrow(IPv4DomainValidationException);
  });

  it('should throw InvalidParamException if IP has less than 4 digits', () => {
    expect(() => IPV4.create('127.0.0')).toThrow(IPv4DomainValidationException);
  });

  it('should throw InvalidParamException if IP has more than 4 groups of digits', () => {
    expect(() => IPV4.create('192.168.0.1.5')).toThrow(IPv4DomainValidationException);
  });

  it('should throw InvalidParamException if any group of digits has more than 3 digits', () => {
    expect(() => IPV4.create('192.300.0.1')).toThrow(IPv4DomainValidationException);
  });

  it('should throw InvalidParamException if any group of digits is not numeric', () => {
    expect(() => IPV4.create('abc.def.ghi.jkl')).toThrow(IPv4DomainValidationException);
    expect(() => IPV4.create('192.168.x.1')).toThrow(IPv4DomainValidationException);
  });

  it('should throw InvalidParamException if any group of digits is empty', () => {
    expect(() => IPV4.create('192..0.1')).toThrow(IPv4DomainValidationException);
  });
});
