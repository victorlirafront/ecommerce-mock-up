import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.HOST,
  port: parseInt(process.env.PORT || '3306', 10),
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  name: process.env.DATABASE,
}));
