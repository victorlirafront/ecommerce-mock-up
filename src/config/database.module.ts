import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './database.provider';

@Module({
  imports: [ConfigModule],
  providers: [DatabaseProvider],
  exports: ['MYSQL_POOL'],
})
export class DatabaseModule {}
