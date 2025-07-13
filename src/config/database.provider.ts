import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

export const DatabaseProvider: Provider = {
  provide: 'MYSQL_POOL',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const pool = mysql.createPool({
      host: configService.get<string>('database.host'),
      user: configService.get<string>('database.user'),
      password: configService.get<string>('database.password'),
      database: configService.get<string>('database.name'),
      port: configService.get<number>('database.port'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    try {
      const connection = await pool.getConnection();
      console.log('Connected successfully to the database!');
      connection.release();
    } catch (err) {
      console.error('Error connecting to the database:', err);
    }

    return pool;
  },
};
