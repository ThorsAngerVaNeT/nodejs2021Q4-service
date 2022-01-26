import { IsNotEmpty, IsUUID, IsOptional, IsInt } from 'class-validator';
export class CreateTaskDto {
  @IsUUID(4)
  @IsOptional()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsInt()
  order: number;

  @IsOptional()
  description: string;

  @IsUUID(4)
  @IsOptional()
  userId: string;

  @IsUUID(4)
  @IsOptional()
  boardId: string;

  @IsUUID(4)
  @IsOptional()
  columnId: string;
}
