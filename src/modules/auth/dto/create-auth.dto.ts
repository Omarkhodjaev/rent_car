import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleEnum } from 'src/common/enums/enum';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';

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
  @IsNumber()
  avatar: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  company: number;
}
