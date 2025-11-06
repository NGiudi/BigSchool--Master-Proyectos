import { describe, it, expect } from 'vitest';

import { checkHealth } from '../../src/shared/health';

describe('checkHealth', () => {
  it('should return a health status object with correct structure', () => {
    const result = checkHealth();
    
    expect(result).toBeDefined();
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('timestamp');
    expect(typeof result.status).toBe('string');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should return status "OK"', () => {
    const result = checkHealth();
    
    expect(result.status).toBe('OK');
  });

  it('should return current timestamp', () => {
    const before = new Date();
    const result = checkHealth();
    const after = new Date();
    
    expect(result.timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(result.timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  it('should return different timestamps on consecutive calls', async () => {
    const firstCheck = checkHealth();
    
    // Pequeña pausa para asegurar diferente timestamp
    await new Promise(resolve => setTimeout(resolve, 1));
    
    const secondCheck = checkHealth();
    
    expect(secondCheck.timestamp.getTime()).toBeGreaterThan(firstCheck.timestamp.getTime());
  });
});