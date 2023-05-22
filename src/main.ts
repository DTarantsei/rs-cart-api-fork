import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import helmet from 'helmet';

import { AppModule } from './app.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  await app.init();

  return serverlessExpress({ app: app.getHttpAdapter().getInstance() });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  try {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
  } catch (error) {
    console.log("error", error);
  }
};
