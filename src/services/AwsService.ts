import * as AWS from 'aws-sdk';
import { SendEmailRequest } from '../../node_modules/aws-sdk/clients/ses';

export class AwsService {
  ses: AWS.SES;
  source: string = process.env.SOURCE_EMAIL;

  constructor() {
    AWS.config.update({region: 'us-west-2'});
    this.ses = new AWS.SES();
  }

  async sendEmail(email: string, subject: string, body: string) {
    const params : SendEmailRequest = {
      Destination: { ToAddresses: [ email ], },
      Message: {
        Subject: { Data: subject, },
        Body: { Html: { Data: `<html>${body}</html>`, } },
      },
      Source: this.source,
      Tags: [
        { Name: 'Topic', Value: 'CatPics' }
      ]
    };

    await this.ses.sendEmail(params).promise();
  }
}

export default new AwsService();

// ses.sendEmail(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });