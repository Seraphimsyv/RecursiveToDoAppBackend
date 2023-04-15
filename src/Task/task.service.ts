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
    const tasks = await this.taskRepository.find({
      where: { parentId: id },
    });
    return tasks;
  }

  async create(task: Task) : Promise<Task> {
    return this.taskRepository.save(task);
  }

  async swappingTask( id: number, moveTo: "up" | "down" ) : Promise<void> {
    const firstTask = await this.taskRepository.findOne({
      where: { id: id },
    });
    const secondTask = await this.taskRepository.findOne({
      where: {
        parentId: firstTask.parentId,
        place: moveTo === "up" ? firstTask.place - 1 : firstTask.place + 1
      },
    });
    firstTask.place = moveTo === "up" ? firstTask.place-1 : firstTask.place+1;
    secondTask.place = moveTo === "up" ? secondTask.place+1 : secondTask.place-1;
    await this.taskRepository.save(firstTask);
    await this.taskRepository.save(secondTask);
  }

  async remove(id: number) : Promise<void> {
    await this.taskRepository.delete(id);
  }
}

