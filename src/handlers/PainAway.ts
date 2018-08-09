import { APIGatewayEvent, Context } from 'aws-lambda';
import { Handler, Response } from '../@types/Handler';
import axios from 'axios';
import { AxiosResponse } from 'axios';

const catEndpoint = 'http://thecatapi.com/api/images/get';

export const hello: Handler = async (event: APIGatewayEvent, context: Context) => {
  const catPic : AxiosResponse = await axios.get(`${catEndpoint}?format=html`);

  return {
    statusCode: 200,
    body: JSON.stringify(catPic.data),
  };
}
