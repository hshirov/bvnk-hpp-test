import { isValidUUID } from '@/utils/validation';

describe('isValidUUID', () => {
  it('returns true for valid UUIDs', () => {
    expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
    expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
  });

  it('returns false for invalid UUIDs', () => {
    expect(isValidUUID('123')).toBe(false); // too short
    expect(isValidUUID('not-a-uuid')).toBe(false); // wrong format
    expect(isValidUUID('550e8400-e29b-41d4-a716-44665544000Z')).toBe(false); // invalid char
    expect(isValidUUID('550e8400e29b41d4a716446655440000')).toBe(false); // missing dashes
  });

  it('returns false for empty string', () => {
    expect(isValidUUID('')).toBe(false);
  });
});
