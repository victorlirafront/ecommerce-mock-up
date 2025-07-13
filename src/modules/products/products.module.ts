import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DatabaseModule } from '../../config/database.module'; // ajuste o caminho conforme seu projeto

@Module({
  imports: [DatabaseModule],  // <--- importante importar aqui
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
