import * as dotenv from 'dotenv';
import { IConfig } from '../interfaces/interface';
dotenv.config();

export const config: IConfig = {
  serverPort: parseInt(process.env.PORT) || 3000,
  jwtSecretKey: process.env.JWT_SECRET_KEY || '',
  jwtExpiredIn: process.env.JWT_EXPIRED_IN || '1d',
};
