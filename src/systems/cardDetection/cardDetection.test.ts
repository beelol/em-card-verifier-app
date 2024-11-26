import { detectCardType } from './cardDetection';

describe('detectCardType', () => {
  it('should detect Visa cards', () => {
    expect(detectCardType('4111111111111111')).toBe('visa');
    expect(detectCardType('4012888888881881')).toBe('visa');
  });

  it('should detect Mastercard', () => {
    expect(detectCardType('5555555555554444')).toBe('mastercard');
    expect(detectCardType('5105105105105100')).toBe('mastercard');
  });

  it('should detect American Express', () => {
    expect(detectCardType('371449635398431')).toBe('amex');
    expect(detectCardType('340000000000009')).toBe('amex');
  });

  it('should detect Discover', () => {
    expect(detectCardType('6011111111111117')).toBe('discover');
    expect(detectCardType('6011000990139424')).toBe('discover');
  });

  it('should return unknown for invalid card numbers', () => {
    expect(detectCardType('1234567890123456')).toBe('unknown');
    expect(detectCardType('')).toBe('unknown');
  });
});
