import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiVersion = process.env.API_VERSION;
  app.setGlobalPrefix(`api/${apiVersion}`);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
