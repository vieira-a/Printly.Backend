import { Phone } from '../phone';

describe('Phone', () => {
  it('should create a new cell phone with correct params', () => {
    const newCellPhone = Phone.create(71, 999999999);
    expect(newCellPhone).toBeInstanceOf(Phone);
    expect(newCellPhone.toString()).toBe('71999999999');
  });
});
