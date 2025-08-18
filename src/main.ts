import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from '@shared/middlewares/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionsFilter());

  const apiVersion = process.env.API_VERSION;
  app.setGlobalPrefix(`api/${apiVersion}`);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
