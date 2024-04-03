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
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { IFileService } from './interfaces/File.service';
import { fileOption } from 'src/lib/file';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/enum';

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
        car: {
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
      url: file.path,
      mimetype: file.mimetype,
      size: Number(file.size),
      car: Number(dto.car),
      createdAt: new Date(),
      lastEditedAt: new Date(),
    };

    console.log(data);

    return await this.fileService.create(data);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.All_FILES)
  @CacheTTL(0)
  @Get()
  async findAll() {
    return await this.fileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.fileService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.remove(id);
  }
}
