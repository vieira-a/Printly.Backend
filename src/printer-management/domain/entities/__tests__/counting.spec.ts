import { CountingType } from '@printer/domain/enums/counting-type.enum';
import { Counting } from '../counting';
import { CountingDomainValidationException } from '@printer/domain/exceptions';
import { CreateCountingProps } from '@printer/domain/types/counting.props';

const validCountingProps: CreateCountingProps = {
  countingJobId: 'fake-counting-job-id',
  printerId: 'fake-printer-id',
  type: CountingType.AUTO,
  prints: 9999,
  copies: 9999,
  collectedAt: new Date(),
};

describe('Counting Entity', () => {
  it('should throw CountingDomainValidationException if countingJobId is not provided', () => {
    expect(() => Counting.create({ ...validCountingProps, countingJobId: '' })).toThrow(
      CountingDomainValidationException,
    );
  });

  it('should throw CountingDomainValidationException if printerId is not provided', () => {
    expect(() => Counting.create({ ...validCountingProps, printerId: '' })).toThrow(
      CountingDomainValidationException,
    );
  });

  it('should throw CountingDomainValidationException if type is not provided', () => {
    expect(() => Counting.create({ ...validCountingProps, type: null as any })).toThrow(
      CountingDomainValidationException,
    );
  });

  it('should throw CountingDomainValidationException if prints is not provided', () => {
    expect(() => Counting.create({ ...validCountingProps, prints: null as any })).toThrow(
      CountingDomainValidationException,
    );
  });

  it('should throw CountingDomainValidationException if copies is not provided', () => {
    expect(() => Counting.create({ ...validCountingProps, copies: null as any })).toThrow(
      CountingDomainValidationException,
    );
  });

  it('should throw CountingDomainValidationException if collectedAt is not provided', () => {
    expect(() => Counting.create({ ...validCountingProps, collectedAt: null as any })).toThrow(
      CountingDomainValidationException,
    );
  });

  it('should create a new accounting with correct params', () => {
    const validCounting = Counting.create({ ...validCountingProps });
    expect(validCounting).toBeInstanceOf(Counting);
    expect(validCounting.countingJobId).toBe('fake-counting-job-id');
    expect(validCounting.printerId).toBe('fake-printer-id');
    expect(validCounting.type).toBe(CountingType.AUTO);
    expect(validCounting.prints).toBe(9999);
    expect(validCounting.copies).toBe(9999);
  });
});
