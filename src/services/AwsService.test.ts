import { AwsService } from './AwsService';

// @ts-ignore sendEmailMock only exists for the purpose of testing
import { sendEmailMock, configUpdateMock } from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';

let service : AwsService;
beforeEach(() => {
  service = new AwsService();
});

test('should setup the AWS sdk on load', () => {
  expect(configUpdateMock).toBeCalledWith({ region: 'us-west-2' });
});

describe('sending an email', () => {
  const source : string = 'some source';
  const email : string = 'some email';
  const subject : string = 'some subject';
  const html : string = 'some html';
  
  beforeAll(() => {
    process.env.SOURCE_EMAIL = source;
  });
  
  afterAll(() => {
    delete process.env.SOURCE_EMAIL;
  });

  it('should send an email using the aws-sdk', async () => {
    const expectedParams : SendEmailRequest = {
      Destination: {
        ToAddresses: [
          email
        ],
      },
      Message: {
        Subject: {
          Data: subject
        },
        Body: {
          Html: {
            Data: `<html>${html}</html>`,
          }
        }
      },
      Source: source,
      Tags: [
        { Name: 'Topic', Value: 'CatPics' }
      ]
    };
    
    await service.sendEmail(email, subject, html);

    expect(sendEmailMock).toBeCalledWith(expectedParams);
  });
});