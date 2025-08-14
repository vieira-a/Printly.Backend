import { CountingType } from '@printer/domain/enums/counting-type.enum';
import { Counting } from '../counting';
import { CountingDomainValidationException } from '@printer/domain/exceptions';

describe('Counting Entity', () => {
  it('should throw CountingDomainValidationException if printer id is not provided', () => {
    expect(() => Counting.create(null as any, 1000, 1000, new Date(), CountingType.AUTO)).toThrow(
      CountingDomainValidationException,
    );
  });
});
