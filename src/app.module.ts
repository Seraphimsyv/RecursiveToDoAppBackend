import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskModule } from './Task/task.module';
import { Task } from './Task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'postgres',
      entities: [Task],
      synchronize: true,
    }),
    TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}