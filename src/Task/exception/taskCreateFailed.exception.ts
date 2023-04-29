import { ServiceUnavailableException, Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core'

class TaskCreateFailed extends ServiceUnavailableException {
  constructor() {
    super('Unable to create task');
  }
}

@Catch(TaskCreateFailed)
class TaskCreateExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('Exception thrown', exception);
    super.catch(exception, host);
  }
}

export { TaskCreateFailed, TaskCreateExceptionFilter }