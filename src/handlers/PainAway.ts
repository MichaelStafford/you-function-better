import { APIGatewayEvent, Context } from 'aws-lambda';
import { Handler, Response } from '../@types/Handler';

export const hello: Handler = (event: APIGatewayEvent, context: Context) => {
  const response : Response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  return response;
}
