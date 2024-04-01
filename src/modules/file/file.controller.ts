import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Body,
  Inject,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { IFileService } from './interfaces/File.service';
import { fileOption } from 'src/lib/file';
import { config } from 'src/common/config';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(
    @Inject('IFileService') private readonly fileService: IFileService,
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          nullable: false,
        },
        carId: {
          type: 'number',
          nullable: true,
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', fileOption))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: 'image' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() dto: any,
  ) {
    const data = {
      url: `http://localhost:${config.serverPort}/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size,
      car: Number(dto.carId),
      createdAt: new Date(),
      lastEditedAt: new Date(),
    };

    return await this.fileService.create(data);
  }

  @Get()
  async findAll() {
    return await this.fileService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   return await this.fileService.findOneById(id);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.fileService.delete(id);
  // }
}
