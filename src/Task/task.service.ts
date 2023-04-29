import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Not, IsNull } from 'typeorm';
import { Task } from "./task.entity";
import { TaskNotFound } from "./exception/taskNotFound.exception";
import { TasksNotFound } from "./exception/tasksNotFound.exception";
import { TaskCreateFailed } from "./exception/taskCreateFailed.exception";

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name)

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  /**
   * Selecting task data that are not children and also from sorting
   * @returns Task[]
   */
  async findAll() : Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find({
        where: { parentId: IsNull() },
        order: { place: 'ASC' }
      });

      tasks.sort((a : Task, b : Task) => a.place > b.place ? 1 : -1);
      
      this.logger.log("Getting task data");
      return tasks;
    } catch (error) {
      this.logger.warn("Error getting task data");
      throw new TasksNotFound();
    }
  }
  /**
   * Selection of data tasks that are children and also from sorting
   * @param id Parent task ID
   * @returns Task[]
   */
  async findChilds(id: number) : Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find({
        where: { parentId: id },
        order: { place: 'ASC' }
      });

      tasks.sort((a : Task, b : Task) => a.place > b.place ? 1 : -1);

      this.logger.log(`Getting task data by id - ${id}`);
      return tasks;
    } catch (error) {
      this.logger.warn(`Error getting task data by id - ${id}`);
      throw new TasksNotFound(id);
    }
  }
  /**
   * Saving a new task
   * @param task Task data
   */
  async create(task: Task) : Promise<void> {
    try {
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

      this.taskRepository.save(task);
      this.logger.log("New task record created");
    } catch (error) {
      this.logger.warn("Error creating a new task");
      throw new TaskCreateFailed();
    }
  }
  /**
   * Exchange of task places depending on the direction
   * @param moving Exchange direction, 0 - up or 1 - down
   */
  async swappingTask( moving : { id: number, moveTo: 0 | 1 } ) : Promise<void> {
    try {
      const id = moving.id;
      const moveTo = moving.moveTo;
      const firstTask = await this.taskRepository.findOne({
        where: { id: id },
      });
      const tasks = await this.taskRepository.find({
        where: { 
          id: Not(id),
          parentId: firstTask.parentId,
          place: moveTo === 0 ? LessThan(firstTask.place) : MoreThan(firstTask.place)
        },
        order: { place: 'ASC' }
      });
      const secondTask = moveTo === 0 ? tasks[tasks.length-1] : tasks[0];
      const firstPlace = Object.assign({}, firstTask).place;
      const secondPlace = Object.assign({}, secondTask).place;
      firstTask.place = secondPlace;
      secondTask.place = firstPlace;

      await this.taskRepository.save(firstTask);
      await this.taskRepository.save(secondTask);
      this.logger.log(`Successful repositioning of tasks #${firstTask.id} and #${secondTask.id}`);
    } catch (error) {
      this.logger.warn("Error in changing task positions");
      throw new TaskNotFound(moving.id);
    }
  }
  /**
   * Deleting a task by id
   * @param id Task ID
   */
  async remove(id: number) : Promise<void> {
    try {
      await this.taskRepository.delete(id);
      this.logger.log(`Task #${id} has been successfully deleted`);
    } catch (error) {
      this.logger.warn(`Error deleting task #${id}`);
      throw new TaskNotFound(id);
    }
  }
}

