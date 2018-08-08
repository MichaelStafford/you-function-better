import { Callback, Context } from 'aws-lambda';

export type Response = {
  statusCode: number,
  body: string,
}

export type Handler = (event: any, context: Context, callback?: Callback) => Response;