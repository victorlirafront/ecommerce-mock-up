import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { paginate } from '../../common/utils/paginate';

@Controller('api')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('get')
  async getProducts(
    @Query('category') category = 'all',
    @Query('page') page = '1',
    @Query('limit') limit = '8',
  ) {
    const data = await this.productsService.getProducts(category);
    return paginate(data, Number(page), Number(limit));
  }

  @Get('search')
  async searchPosts(
    @Query('query') query = '',
    @Query('category') category = 'all',
    @Query('page') page = '1',
    @Query('limit') limit = '8',
  ) {
    const results = await this.productsService.searchPosts(query, category);
    return paginate(results, Number(page), Number(limit));
  }

  @Post('create')
  async createPost(@Body() data: any) {
    return this.productsService.createPost(data);
  }
}
