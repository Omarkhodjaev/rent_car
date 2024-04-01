import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAlreadyExistException } from './exception/user.exception';
import { ID } from 'src/common/types/type';
import { IUserService } from './interfaces/user.service';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/enum';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { data: foundUser } = await this.userService.findByPhoneNumber(
      createUserDto.phone,
    );

    if (foundUser) {
      throw new UserAlreadyExistException();
    }

    return this.userService.create(createUserDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.ALL_USERS)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.userService.findAll();
  }


  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: ID) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: ID,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: ID) {
    return this.userService.delete(id);
  }
}
