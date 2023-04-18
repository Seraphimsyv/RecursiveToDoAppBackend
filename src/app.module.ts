import { Module } from '@nestjs/common';
import { TaskModule } from './Task/task.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}