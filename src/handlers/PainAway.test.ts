import { perform } from './PainAway';
import { Response } from '../@types/Handler';

// @ts-ignore -- Get Mock does not exist in axios by default
import { getMock } from 'axios';
// @ts-ignore -- Get Mock does not exist in aws by default
import { sendEmailMock } from '../services/AwsService';

jest.mock('../services/AwsService');

const imageTag = '<a>CAT IMAGE HERE</a>';
beforeEach(() => {
  getMock.mockResolvedValue({ data: imageTag });
});

test('statusCode is 200 on success', async () => {
  const response : Response = await perform(null, null);

  expect(response.statusCode).toEqual(200);
});

test('body of the response contains nothing', async () => {
  const response : Response = await perform(null, null);

  expect(response.body).toEqual('');
});

const catEndpoint = 'http://thecatapi.com/api/images/get';

describe('getting cat pictures', () => {
  it(`gets a cat picture from ${catEndpoint}`, async () => {
    await perform(null, null);

    expect(getMock).toBeCalledWith(`${catEndpoint}?format=html`);
  });
});

describe('sending an email', () => {
  const recipient: string = 'michaelstafford@thoughtworks.com';
  const subject : string = 'Enjoy your cat pics';
  const html :string = `${imageTag}`;

  it('sends an email using the awsService', async () => {
    await perform(null, null);

    expect(sendEmailMock).toBeCalledWith(recipient, subject, html);
  });
});
