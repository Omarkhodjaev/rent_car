import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/enum';
import { ICompanyService } from '../company/interfaces/company.service';
import { IModelService } from './interfaces/model.service';

@ApiTags('model')
@Controller('model')
export class ModelController {
  constructor(
    @Inject('IModelService')
    private readonly modelService: IModelService,

    @Inject('ICompanyService')
    private readonly companyService: ICompanyService,
  ) {}

  @Post()
  async create(@Body() createModelDto: CreateModelDto) {
    if (createModelDto.company || createModelDto.company === 0) {
      await this.companyService.findOne(createModelDto.company);
    }

    return this.modelService.create(createModelDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.All_MODELS)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.modelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.modelService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateModelDto: UpdateModelDto,
  ) {
    return this.modelService.update(id, updateModelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.modelService.delete(id);
  }
}
