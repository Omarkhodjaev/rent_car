import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  owner: number;

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  logo: number;
}
