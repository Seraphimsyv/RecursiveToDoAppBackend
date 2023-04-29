import { ApiProperty } from '@nestjs/swagger';

export default class TaskDto {
  @ApiProperty({
    description: "Task ID",
    example: "1"
  })
  id: number;

  @ApiProperty({
    description: "Task title",
    example: "Task #1"
  })
  title: string;

  @ApiProperty({
    description: "Task status, 0 or 1 or 2",
    example: "0"
  })
  status: 0 | 1 | 2;

  @ApiProperty({
    description: "Task description",
    example: "Simple text."
  })
  description: string;

  @ApiProperty({
    description: "Task parent ID",
    example: "1",
    required: false
  })
  parentId?: number;

  @ApiProperty({
    description: "Task place index",
    example: "0",
  })
  place: number;
}