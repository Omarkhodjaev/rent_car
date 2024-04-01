import { HttpException, HttpStatus } from '@nestjs/common';

export class CompanyNotFoundException extends HttpException {
  constructor() {
    super('Company not found', HttpStatus.NOT_FOUND);
  }
}

export class CompanyAlreadyExistException extends HttpException {
  constructor() {
    super('Company already exist', HttpStatus.BAD_REQUEST);
  }
}
