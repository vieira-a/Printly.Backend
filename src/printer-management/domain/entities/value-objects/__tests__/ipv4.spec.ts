import { IPV4 } from '../ipv4';

describe('IPV4 Value Object', () => {
  it('should create a valid IPv4', () => {
    const ip = IPV4.create('192.168.0.1');
    const errors = ip.validate();

    expect(errors.length).toBe(0);
    expect(ip.toString()).toBe('192.168.0.1');
    expect(ip.toPrimitives()).toBe('192.168.0.1');
    expect(ip.getOctets()).toEqual([192, 168, 0, 1]);
  });

  it('should remove spaces and accept a trimmed IP', () => {
    const ip = IPV4.create(' 10.0.0.1 ');
    const errors = ip.validate();

    expect(errors.length).toBe(0);
    expect(ip.toString()).toBe('10.0.0.1');
  });

  it('shoud return error if IP null or empty', () => {
    const ip = IPV4.create('');
    const errors = ip.validate();

    expect(errors).toContain('IP não informado.');
  });

  it('should return error if IP has less than 4 digits', () => {
    const ip = IPV4.create('127.0.0');
    const errors = ip.validate();

    expect(errors).toContain('IP inválido. Formato esperado: xxx.xxx.xxx.xxx');
  });

  it('should return error if IP has more than 4 groups of digits', () => {
    const ip = IPV4.create('192.168.0.1.5');
    const errors = ip.validate();

    expect(errors).toContain('IP inválido. Formato esperado: xxx.xxx.xxx.xxx');
  });

  it('should return error if the group of digits has more than 3 digits', () => {
    const ip = IPV4.create('192.300.0.1');
    const errors = ip.validate();

    expect(errors).toContain('IP inválido. Formato esperado: xxx.xxx.xxx.xxx');
  });

  it('should return error if the group of digits is not numeric', () => {
    const ip = IPV4.create('abc.def.ghi.jkl');
    const errors = ip.validate();

    expect(errors).toContain('IP inválido. Formato esperado: xxx.xxx.xxx.xxx');
  });

  it('should return errorgroup of digits is empty', () => {
    const ip = IPV4.create('192..0.1');
    const errors = ip.validate();

    expect(errors).toContain('IP inválido. Formato esperado: xxx.xxx.xxx.xxx');
  });
});
