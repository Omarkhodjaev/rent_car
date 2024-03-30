import jwt from 'jsonwebtoken';

const jwtKey = 'ok';

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