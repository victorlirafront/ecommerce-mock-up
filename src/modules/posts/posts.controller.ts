import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { paginate } from '../../common/utils/paginate';

@Controller('api')
export class PostsController {
  constructor(private readonly PostsService: PostsService) {}

  @Get('get')
  async getPosts(
    @Query('category') category = 'all',
    @Query('page') page = '1',
    @Query('limit') limit = '8',
  ) {
    const data = await this.PostsService.getPosts(category);
    return paginate(data, Number(page), Number(limit));
  }

  @Get('search')
  async searchPosts(
    @Query('query') query = '',
    @Query('category') category = 'all',
    @Query('page') page = '1',
    @Query('limit') limit = '8',
  ) {
    const results = await this.PostsService.searchPosts(query, category);
    return paginate(results, Number(page), Number(limit));
  }

  @Post('create')
  async createPost(@Body() data: any) {
    return this.PostsService.createPost(data);
  }
}
