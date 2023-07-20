import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/module/app/app.module';

const DEFAULT_PREFIX = '/api/';
const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env['PREFIX'] ?? DEFAULT_PREFIX);
  await app.listen(process.env['PORT'] ?? DEFAULT_PORT);
}

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});
