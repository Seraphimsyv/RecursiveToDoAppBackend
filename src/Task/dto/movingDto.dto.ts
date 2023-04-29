import { ApiProperty } from '@nestjs/swagger';

export default class MovingDto {
  @ApiProperty({
    description: "Task moving ID",
    example: "1"
  })
  id: Number;

  @ApiProperty({
    description: "Change direction, 0 - up, 1 - down",
    example: "0"
  })
  moveTo: 0 | 1;
}