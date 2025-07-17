import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class ProductsService {
  constructor(@Inject('MYSQL_POOL') private readonly pool: Pool) {}

  async getProducts(category: string): Promise<any[]> {
    const connection = await this.pool.getConnection();

    let query = 'SELECT * FROM posts';
    const params: any[] = [];

    if (category && category !== 'all') {
      query += ' WHERE category = ?';
      params.push(category);
    }

    const [result] = await connection.query(query, params);
    connection.release();

    return result as any[];
  }

  async createPost(data: {
    author: string;
    title: string;
    content: string;
    date: string;
    category: string;
    meta_tag_title: string;
    meta_tag_description: string;
    post_image: string;
    post_background: string;
  }) {
    const {
      author,
      title,
      content,
      date,
      category,
      meta_tag_title,
      meta_tag_description,
      post_image,
      post_background,
    } = data;

    const query = `
      INSERT INTO posts (
        title, content, author, date, category,
        meta_tag_title, meta_tag_description, post_image, post_background
      ) VALUES (?,?,?,?,?,?,?,?,?)
    `;

    const values = [
      title,
      content,
      author,
      date,
      category,
      meta_tag_title,
      meta_tag_description,
      post_image,
      post_background,
    ];

    const connection = await this.pool.getConnection();
    try {
      const [result] = await connection.query(query, values);
      return {
        message: 'Post criado com sucesso!',
        result,
      };
    } catch (error) {
      console.error('Erro ao criar o post:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async searchPosts(query: string, category: string): Promise<any[]> {
    const connection = await this.pool.getConnection();

    let sql = 'SELECT * FROM posts WHERE title LIKE ?';
    const params: any[] = [`%${query}%`];

    if (category !== 'all' && category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    const [result] = await connection.query(sql, params);
    connection.release();

    return result as any[];
  }
}
