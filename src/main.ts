import { NestFactory } from '@nestjs/core';
import { TaskModule } from './Task/task.module';

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  await app.listen(3001);
}
bootstrap();
