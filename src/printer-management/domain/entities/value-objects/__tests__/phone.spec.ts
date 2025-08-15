import { PhoneDomainValidationException } from '@printer/domain/exceptions/phone-domain-validation.exception';
import { Phone } from '../phone';

const validCellPhoneProps = {
  areaCode: 71,
  phoneNumber: 999998888,
};

const validFixedPhoneProps = {
  areaCode: 71,
  phoneNumber: 33334444,
};

describe('Phone Value Object', () => {
  it('should create a new cell phone with correct params', () => {
    const mewCellPhone = Phone.create({ ...validCellPhoneProps });

    expect(mewCellPhone).toBeInstanceOf(Phone);
    expect(mewCellPhone.toString()).toBe('71999998888');
  });

  it('should create a new fixed phone with correct params', () => {
    const newFixedPhone = Phone.create({ ...validFixedPhoneProps });
    expect(newFixedPhone.toString()).toBe('7133334444');
  });

  it('should throw PhoneDomainValidationException if DDD is not a number between 11 and 99', () => {
    expect(() => Phone.create({ ...validCellPhoneProps, areaCode: 10 })).toThrow(
      PhoneDomainValidationException,
    );
  });

  it('should throw PhoneDomainValidationException if phone number has less than 8 digits', () => {
    expect(() => Phone.create({ ...validCellPhoneProps, phoneNumber: 9999999 })).toThrow(
      PhoneDomainValidationException,
    );
  });

  it('should throw PhoneDomainValidationException if phone number has more than 9 digits', () => {
    expect(() => Phone.create({ ...validCellPhoneProps, phoneNumber: 9999999999 })).toThrow(
      PhoneDomainValidationException,
    );
  });

  it('should throw PhoneDomainValidationException if cell phone does not starts with 9', () => {
    expect(() => Phone.create({ ...validFixedPhoneProps, phoneNumber: 899999999 })).toThrow(
      PhoneDomainValidationException,
    );
  });

  it('should throw PhoneDomainValidationException if fixed phone starts with 9', () => {
    expect(() => Phone.create({ ...validFixedPhoneProps, phoneNumber: 99999999 })).toThrow(
      PhoneDomainValidationException,
    );
  });
});
