import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/enum';
import { IUserService } from '../user/interfaces/user.service';
import { UserNotFoundException } from '../user/exception/user.exception';
import { IFileService } from '../file/interfaces/file.service';
import { LogoFounException } from '../file/exception/file.exception';
import { CompanyAlreadyExistException } from './exception/company.exception';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(
    @Inject('ICompanyService')
    private readonly companyService: CompanyService,
    @Inject('IUserService')
    private readonly userService: IUserService,
    @Inject('IFileService')
    private readonly fileService: IFileService,
  ) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const { data: foundCompany } =
      await this.companyService.findOneByCompany(createCompanyDto);

    if (foundCompany) {
      throw new CompanyAlreadyExistException();
    }

    const { data: foundUser } = await this.userService.findOne(
      createCompanyDto.owner,
    );

    if (!foundUser) {
      throw new UserNotFoundException();
    }

    if (createCompanyDto.logo || createCompanyDto.logo === 0) {
      
      const { data: foundLogo } = await this.fileService.findOne(
        createCompanyDto.logo,
      );

      if (!foundLogo) {
        throw new LogoFounException();
      }
    }
    

    return this.companyService.create(createCompanyDto);
  }
  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.ALL_COMPANIES)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.remove(id);
  }
}
