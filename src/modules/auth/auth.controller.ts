import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, loginDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { IUserService } from '../user/interfaces/user.service';
import { UserAlreadyExistException } from '../user/exception/user.exception';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @Post('/register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    const { data: foundUser } = await this.userService.findByPhoneNumber(
      createAuthDto.phone,
    );

    if (foundUser) {
      throw new UserAlreadyExistException();
    }

    return this.userService.create(createAuthDto);
  }

  @Post('/login')
  async login(@Body() loginDto: loginDto) {
    const { data: foundUser } = await this.userService.findByPhoneNumber(
      loginDto.phone,
    );

    if (!foundUser) {
      throw new UserAlreadyExistException();
    }

    return this.userService.login(loginDto);
  }
}
