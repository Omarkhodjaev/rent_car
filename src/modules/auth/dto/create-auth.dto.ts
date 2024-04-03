import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleEnum } from 'src/common/enums/enum';

export class CreateAuthDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    enum: RoleEnum,
  })
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  avatar: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  company: number;
}

export class loginDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
