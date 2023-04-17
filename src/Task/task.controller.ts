import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { Moving } from 'src/types';

@Controller("tasks")
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  findAll() : Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(":id")
  findChilds(@Param("id") id : number) : Promise<Task[]> {
    return this.taskService.findChilds(id);
  }

  @Post('create')
  async create(@Body() task: Task) : Promise<Task> {
    return this.taskService.create(task);
  }

  @Post()
  async swapp(@Body() moving: Moving) : Promise<void> {
    return this.taskService.swappingTask(moving);
  }

  @Delete(":id")
  async delete(@Param("id") id: number) : Promise<void> {
    return this.taskService.remove(id);
  }
}