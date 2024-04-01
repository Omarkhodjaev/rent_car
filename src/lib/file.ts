import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { FileTypeException } from 'src/common/exceptions/exception';

export const fileOption: MulterOptions = {
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (err: Error | null, dest: string) => void,
    ) => {
      const uploadPath = 'upload';
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      const constFileType = file.mimetype.split('/')[0];
      if (constFileType === 'image') {
        cb(null, uploadPath);
      } else {
        cb(new FileTypeException(constFileType), uploadPath);
      }
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void,
    ): void => {
      cb(
        null,
        `${file.mimetype.split('/')[0]}__${Date.now()}.${file.mimetype.split('/')[1]}`,
      );
    },
  }),
};
