import { HttpException, HttpStatus } from '@nestjs/common';

export class ModelNotFoundException extends HttpException {
  constructor() {
    super('Model not found', HttpStatus.NOT_FOUND);
  }
}

export class ModelAlreadyExistException extends HttpException {
  constructor() {
    super('Model already exist', HttpStatus.BAD_REQUEST);
  }
}
