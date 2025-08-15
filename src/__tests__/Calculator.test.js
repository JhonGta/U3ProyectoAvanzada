import { Calculator } from '../utils/Calculator';

describe('Calculator', () => {
  let calc;
  beforeEach(() => {
    calc = new Calculator();
  });

  it('should multiply two numbers', () => {
    expect(calc.multiply(2, 3)).toBe(6);
  });

  it('should divide two numbers', () => {
    expect(calc.divide(6, 2)).toBe(3);
  });

  it('should return null when dividing by zero', () => {
    expect(calc.divide(6, 0)).toBeNull();
  });
});
