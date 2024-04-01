import { HttpException, HttpStatus } from '@nestjs/common';

export class CarNotFoundException extends HttpException {
  constructor() {
    super('Car not found', HttpStatus.NOT_FOUND);
  }
}

export class CarAlreadyExistException extends HttpException {
  constructor() {
    super('Car already exist', HttpStatus.BAD_REQUEST);
  }
}
