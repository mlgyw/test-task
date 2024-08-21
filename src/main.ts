import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { setupSwagger } from '@/configs/swaggger.config';
import { createValidationPipe } from '@/configs/global.pipes.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(createValidationPipe());

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
