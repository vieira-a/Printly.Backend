import { Phone } from '../phone';

describe('Phone Value Object', () => {
  it('should create a new cell phone with correct params', () => {
    const cellPhone = Phone.create(71, 999999999);
    const errors = cellPhone.validate();

    expect(errors.length).toBe(0);
    expect(cellPhone).toBeInstanceOf(Phone);
    expect(cellPhone.toString()).toBe('71999999999');
  });

  it('should create a new fixed phone with correct params', () => {
    const fixedPhone = Phone.create(71, 33333333);
    const errors = fixedPhone.validate();

    expect(errors.length).toBe(0);
    expect(fixedPhone.toString()).toBe('7133333333');
  });

  it('should return error if DDD is not a number between 11 and 99', () => {
    const phone = Phone.create(10, 999999999);
    const errors = phone.validate();

    expect(errors).toContain('DDD deve conter dois dígitos entre 11 e 99.');
  });

  it('should return error if phone number has less than 8 digits', () => {
    const phone = Phone.create(71, 9999999);
    const errors = phone.validate();

    expect(errors).toContain('Número de telefone deve conter 8 ou 9 digitos.');
  });

  it('should return error if phone number has more than 9 digits', () => {
    const phone = Phone.create(71, 9999999999);
    const errors = phone.validate();

    expect(errors).toContain('Número de telefone deve conter 8 ou 9 digitos.');
  });

  it('should return error if cell phone does not starts with 9', () => {
    const phone = Phone.create(71, 899999999);
    const errors = phone.validate();

    expect(errors).toContain('Número de celular com 9 dígitos deve começar com 9.');
  });

  it('should return error if fixed phone starts with 9', () => {
    const phone = Phone.create(71, 99999999);
    const errors = phone.validate();

    expect(errors).toContain('Número fixo com 8 dígitos não deve começar com 9.');
  });
});
