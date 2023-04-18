import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Not, IsNull } from 'typeorm';
import { Task } from "./task.entity";
import { updateTaskPlaceDto } from "./dto/updateTaskPlace.dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  /**
   * Selecting task data that are not children and also from sorting
   * @returns Task[]
   */
  async findAll() : Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      where: { parentId: IsNull() },
      order: { place: 'ASC' }
    });

    tasks.sort((a : Task, b : Task) => a.place > b.place ? 1 : -1);
    
    return tasks;
  }
  /**
   * Selection of data tasks that are children and also from sorting
   * @param {id} : number - Parent task ID
   * @returns 
   */
  async findChilds(id: number) : Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      where: { parentId: id },
      order: { place: 'ASC' }
    });
    
    tasks.sort((a : Task, b : Task) => a.place > b.place ? 1 : -1);

    return tasks;
  }
  /**
   * Saving a new task
   * @param {task} : Task - Task data
   * @returns 
   */
  async create(task: Task) : Promise<Task> {
    if(task.parentId !== undefined) {
      const tasks = await this.taskRepository.find({
        where: { parentId: task.parentId }
      });
      task.place = tasks.length;
    } else {
      const tasks = await this.taskRepository.find({
        where: { parentId: null }
      });
      task.place = tasks.length;
    }

    return this.taskRepository.save(task);
  }
  /**
   * Exchange of task places depending on the direction
   * @param {moving} : "up" | "down" - Exchange direction
   */
  async swappingTask( moving : updateTaskPlaceDto ) : Promise<void> {
    const id = moving.id;
    const moveTo = moving.moveTo;
    const firstTask = await this.taskRepository.findOne({
      where: { id: id },
    });
    const tasks = await this.taskRepository.find({
      where: { 
        id: Not(id),
        parentId: firstTask.parentId,
        place: moveTo === "up" ? LessThan(firstTask.place) : MoreThan(firstTask.place)
      },
      order: { place: 'ASC' }
    });
    const secondTask = moveTo === "up" ? tasks[tasks.length-1] : tasks[0];
    const firstPlace = Object.assign({}, firstTask).place;
    const secondPlace = Object.assign({}, secondTask).place;
    firstTask.place = secondPlace;
    secondTask.place = firstPlace;

    await this.taskRepository.save(firstTask);
    await this.taskRepository.save(secondTask);
  }

  async remove(id: number) : Promise<void> {
    await this.taskRepository.delete(id);
  }
}

