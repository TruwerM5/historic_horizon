import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Article, ArticleContent } from '@prisma/client';
import {
  PostArticleContentDto,
  PostArticleDto,
} from 'src/dto/post-article.dto';

import { rm } from 'fs';
import { join } from 'path';
import { EditArticleDto } from 'src/dto/edit-article.dto';
@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async listArticles(): Promise<Article[]> {
    return this.prisma.article.findMany();
  }

  async getArticleById(id: string): Promise<Article> {
    return this.prisma.article.findUnique({
      where: { id },
      include: { articleContent: true },
    });
  }

  async postArticle(
    data: PostArticleDto,
    banner: string,
    author_id: number,
  ): Promise<Article> {
    try {
      const article = await this.prisma.article.create({
        data: {
          id: data.id,
          title: data.title,
          tags: JSON.parse(data.tags),
          pub_date: new Date().toISOString(),
          banner,
          author_id,
        },
      });
      await this.postArticleContent({
        article_id: article.id,
        content: data.content,
      });
      return article;
    } catch (e) {
      console.log('Error: ', e.message);
    }
  }

  async postArticleContent(
    data: PostArticleContentDto,
  ): Promise<ArticleContent> {
    try {
      return this.prisma.articleContent.create({
        data: {
          article_id: data.article_id,
          content: data.content,
        },
      });
    } catch (e) {
      console.log('Error while post content: ', e.message);
    }
  }

  async getLastArticle(): Promise<Article> {
    return this.prisma.article.findFirst({
      orderBy: {
        pub_date: 'desc',
      },
    });
  }

  async getArticlesByTag(tag: string): Promise<Article[]> {
    return this.prisma.article.findMany({
      where: {
        tags: {
          has: tag,
        },
      },
    });
  }

  async getLatestArticles(from: number): Promise<Article[]> {
    return this.prisma.article.findMany({
      take: 6,
      skip: from,
      orderBy: {
        pub_date: 'desc'
      },
    });
  }

  async searchArticlesByTitleOrTags(
    string: string,
    take?: number,
  ): Promise<Article[]> {
    return this.prisma.article.findMany({
      take,
      where: {
        
        OR: [
          {
            title: {
              contains: string,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              has: string
            }
          },
        ],
      },
    });
  }

  async getRecommended(string: string): Promise<Article[]> {
    return this.searchArticlesByTitleOrTags(string, 2);
  }

  async getAuthorArticles(author_name: string): Promise<Article[]> {
    return this.prisma.article.findMany({
      where: {
        author: {
          username: author_name,
        },
      },
      orderBy: {
        pub_date: 'desc',
      },
    });
  }

  async checkIfArticleBelongToAuthor(
    author_id: number,
    article_id: string,
  ): Promise<boolean> {
    const article = await this.prisma.article.findFirst({
      where: {
        id: article_id,
        author_id,
      },
    });
    return article ? true : false;
  }

  async deleteArticle(article_id: string): Promise<boolean> {
    const articleContentOnDelete = await this.prisma.articleContent.delete({
      where: {
        article_id,
      },
    });
    const articleOnDelete = await this.prisma.article.delete({
      where: {
        id: article_id,
      },
    });

    rm(
      join(process.cwd(), 'uploads', 'images', articleOnDelete.banner),
      (err) => {
        console.log(err);
      },
    );

    return articleOnDelete && articleContentOnDelete ? true : false;
  }

  async editArticle(
    data: EditArticleDto,
    article_id: string,
    banner?: string,
  ): Promise<any> {
    const article = await this.prisma.article.findFirst({
      where: {
        id: article_id,
      },
      select: {
        banner: true,
      },
    });

    if (banner) {
      rm(join(process.cwd(), 'uploads', 'images', article.banner), (err) => {
        console.log(err);
      });
    }

    const edited_article = await this.prisma.article.update({
      where: {
        id: article_id,
      },
      data: {
        title: data.title,
        tags: JSON.parse(data.tags),
        banner,
      },
    });

    if (edited_article && data.content) {
      await this.prisma.articleContent.update({
        where: {
          article_id,
        },
        data: {
          content: data.content,
        },
      });
    }

    return edited_article;
  }
}
