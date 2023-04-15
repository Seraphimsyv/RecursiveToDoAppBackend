import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';

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
}