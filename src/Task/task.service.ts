import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from "./task.entity";
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll() : Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findChilds(id: number) : Promise<Task[]> {
    return this.taskRepository.find();
  }
}

