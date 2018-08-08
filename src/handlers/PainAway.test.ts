import { hello } from './PainAway';
import { Response } from '../@types/Handler';

test('statusCode is 200 on success', () => {
  const response : Response = hello(null, null);

  expect(response.statusCode).toEqual(200);
});