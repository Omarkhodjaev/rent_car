import { ApiProperty } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  price: number;

  @ApiProperty({ type: Object })
  @IsOptional()
  @IsJSON()
  info: object;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  model: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  company: number;
}
