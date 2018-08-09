import { MockInstance } from 'jest';

export const getMock : MockInstance = jest.fn();

export default {
  get: getMock,
}