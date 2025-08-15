// src/utils/Calculator.js
export class Calculator {
  multiply(a, b) {
    return a * b;
  }
  divide(a, b) {
    if (b === 0) return null;
    return a / b;
  }
}
