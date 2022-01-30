import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class LavvieTagIotCode {
  @IsNotEmpty()
  @IsDateString()
  @IsString()
  gte: string;

  @IsNotEmpty()
  @IsDateString()
  @IsString()
  lt: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  notIn: string[];
}
