import { APIGatewayEvent, Context } from 'aws-lambda';
import { Handler } from '../@types/Handler';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import AwsService from '../services/AwsService';

const catEndpoint = 'http://thecatapi.com/api/images/get';

export const perform: Handler = async (event: APIGatewayEvent, context: Context) => {
  const catPic : AxiosResponse = await axios.get(`${catEndpoint}?format=html`);
  
  await sendCatPic(catPic.data);

  return {
    statusCode: 200,
    body: '',
  };
}

async function sendCatPic(catTag: string) {
  const email : string = 'michaelstafford@thoughtworks.com';
  const subject: string = 'Enjoy your cat pics';
  
  return await AwsService.sendEmail(email, subject, catTag);
}