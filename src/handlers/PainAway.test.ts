import { hello } from './PainAway';
import { Response } from '../@types/Handler';

// @ts-ignore -- Get Mock does not exist in axios by default
import { getMock } from 'axios';

const imageTag = '<a>CAT IMAGE HERE</a>';
beforeEach(() => {
  getMock.mockResolvedValue({ data: imageTag });
});

test('statusCode is 200 on success', async () => {
  const response : Response = await hello(null, null);

  expect(response.statusCode).toEqual(200);
});

const catEndpoint = 'http://thecatapi.com/api/images/get';

describe('cat pictures', () => {
  it(`gets a cat picture from ${catEndpoint}`, async () => {
    await hello(null, null);

    expect(getMock).toBeCalledWith(`${catEndpoint}?format=html`);
  });

  it('returns the cat picture html tag in the response', async () => {
    const response : Response = await hello(null, null);

    expect(JSON.parse(response.body)).toEqual(imageTag);
  });
});
