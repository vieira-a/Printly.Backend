import { IPv4DomainValidationException } from '@printer/domain/exceptions';
import { IPV4 } from '../ipv4';

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

  it('should throw IPv4DomainValidationException if IP null or empty', () => {
    expect(() => IPV4.create('')).toThrow(IPv4DomainValidationException);
  });

  it('should throw IPv4DomainValidationException if IP has less than 4 digits', () => {
    expect(() => IPV4.create('127.0.0')).toThrow(IPv4DomainValidationException);
  });

  it('should throw IPv4DomainValidationException if IP has more than 4 groups of digits', () => {
    expect(() => IPV4.create('192.168.0.1.5')).toThrow(IPv4DomainValidationException);
  });

  it('should throw IPv4DomainValidationException if the group of digits has more than 3 digits', () => {
    expect(() => IPV4.create('192.300.0.1')).toThrow(IPv4DomainValidationException);
  });

  it('should throw IPv4DomainValidationException error if the group of digits is not numeric', () => {
    expect(() => IPV4.create('abc.def.ghi.jkl')).toThrow(IPv4DomainValidationException);
  });

  it('should throw IPv4DomainValidationException if errorgroup of digits is empty', () => {
    expect(() => IPV4.create('192..0.1')).toThrow(IPv4DomainValidationException);
  });
});
