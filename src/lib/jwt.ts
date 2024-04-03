import * as jwt from 'jsonwebtoken';
import { config } from 'src/common/config';

const jwtKey = config.jwtSecretKey;

export const generateToken = (data: any) => {
  const token = jwt.sign(
    { data, exp: Math.floor(Date.now() / 1000) + 200000 },
    jwtKey,
  );
  return token;
};

export const verifyToken = (token: any) => {
  return jwt.verify(token, jwtKey);
};
