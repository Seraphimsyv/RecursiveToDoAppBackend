import { NotFoundException, Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core'

class TaskNotFound extends NotFoundException {
  constructor(taskId: number) {
    super(`Task with id ${taskId} not found`);
  }
}

@Catch(TaskNotFound)
class TaskExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('Exception thrown', exception);
    super.catch(exception, host);
  }
}

export { TaskNotFound, TaskExceptionFilter }