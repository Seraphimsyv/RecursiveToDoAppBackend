import { NotFoundException, Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core'

class TasksNotFound extends NotFoundException  {
  constructor(parentId?: number) {
    if(parentId)
      super(`Child tasks with parentId ${parentId} not found`);
    else
      super("Tasks not found");
  }
}

@Catch(TasksNotFound)
class TasksExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('Exception thrown', exception);
    super.catch(exception, host);
  }
}

export { TasksNotFound, TasksExceptionFilter }