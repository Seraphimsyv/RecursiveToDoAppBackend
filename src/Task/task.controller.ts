import { Controller, Get, Post, Delete, Param, Body, UseFilters } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger/dist';
import { Task } from './task.entity';
import { 
  CreateTaskDto,
  TaskDto,
  MovingDto
} from './dto';
import { TaskService } from './task.service';
import { TaskExceptionFilter } from './exception/taskNotFound.exception';
import { TasksExceptionFilter } from './exception/tasksNotFound.exception';
import { TaskCreateExceptionFilter } from './exception/taskCreateFailed.exception';

@Controller("tasks")
export class TaskController {
  constructor(private taskService: TaskService) {}
  /**
   * Getting all tasks
   * @returns Task[]
   */
  @Get()
  @ApiResponse({
    status: 200,
    description: "Returns a list of all non-child tasks",
    type: [TaskDto]
  })
  @ApiResponse({
    status: 404,
  })
  @UseFilters(TasksExceptionFilter)
  findAll() : Promise<Task[]> {
    return this.taskService.findAll();
  }
  /**
   * Get child tasks by parent task ID
   * @param id 
   * @returns Task[]
   */
  @Get(":id")
  @ApiParam({
    name: "id",
    required: true,
    description: "Task ID",
    type: Number
  })
  @ApiResponse({
    status: 200,
    description: "Returns a list of all child tasks",
    type: [TaskDto]
  })
  @ApiResponse({
    status: 404,
  })
  @UseFilters(TasksExceptionFilter)
  findChilds(@Param("id") id : number) : Promise<Task[]> {
    return this.taskService.findChilds(id);
  }
  /**
   * Create a new task
   * @param task 
   */
  @Post('create')
  @ApiParam({
    name: "task",
    required: true,
    description: "Data of task",
    type: CreateTaskDto
  })
  @ApiResponse({
    status: 200,
    description: "Successful task creation",
  })
  @ApiResponse({
    status: 404,
    description: "Error creating task"
  })
  @UseFilters(TaskCreateExceptionFilter)
  async create(@Body() task: Task) : Promise<void> {
    return this.taskService.create(task);
  }
  /**
   * Moving a task
   * @param moving 
   */
  @Post('swapp')
  @ApiParam({
    name: "moving",
    required: true,
    type: MovingDto
  })
  @ApiResponse({
    status: 200,
    description: "Successful task move"
  })
  @ApiResponse({
    status: 404,
    description: "Error in moving task"
  })
  @UseFilters(TaskExceptionFilter)
  async swapp(@Body() moving: { id: number, moveTo: 0 | 1 } ) : Promise<void> {
    return this.taskService.swappingTask(moving);
  }
  /**
   * Deleting a task by ID
   * @param id 
   */
  @Delete(":id")
  @ApiParam({
    name: "id",
    required: true,
    description: "Task ID",
    type: Number
  })
  @ApiResponse({
    status: 200,
    description: "Successfully deleting a task"
  })
  @ApiResponse({
    status: 404,
    description: "Error deleting task"
  })
  @UseFilters(TaskExceptionFilter)
  async delete(@Param("id") id: number) : Promise<void> {
    return this.taskService.remove(id);
  }
}