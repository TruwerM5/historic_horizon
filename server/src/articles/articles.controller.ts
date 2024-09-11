import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Article } from '@prisma/client';
import { ArticlesService } from './articles.service';
import { PostArticleDto } from '../dto/post-article.dto';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { EditArticleDto } from '../dto/edit-article.dto';

MulterModule.register({
  dest: './uploads',
  limits: {
    fileSize: 20 * 1024 * 1024 * 1024 * 1024,
  },
});

const storage = diskStorage({
  destination: join(process.cwd(), 'uploads', 'images'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  async listArticles(): Promise<Article[]> {
    return this.articleService.listArticles();
  }

  @Get('/id/:id')
  async getArticleById(@Param('id') id: string): Promise<Article> {
    return this.articleService.getArticleById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Author)
  @Post('/create')
  @UseInterceptors(
    FileInterceptor('banner', {
      storage,
    }),
  )
  async createArticle(
    @Body() body: PostArticleDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    return this.articleService.postArticle(
      body,
      file.originalname,
      req.user.id,
    );
  }

  @Get('last')
  async getLastArticle(): Promise<Article> {
    return this.articleService.getLastArticle();
  }

  @Get('/tags')
  async getArticlesByTag(@Query('tag') tag: string): Promise<Article[]> {
    return this.articleService.getArticlesByTag(tag);
  }

  @Get('/latest')
  async getLatestArticles(
    @Query('from', ParseIntPipe) from: number,
  ): Promise<Article[]> {
    return this.articleService.getLatestArticles(from);
  }

  @Get('/search')
  async getArticlesByTitleOrTags(
    @Query('text') text: string,
  ): Promise<Article[]> {
    return this.articleService.searchArticlesByTitleOrTags(text);
  }

  @Get('/recommended')
  async getRecommended(@Query('text') text: string): Promise<Article[]> {
    return this.articleService.getRecommended(text);
  }

  @Get('/my-articles')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Author)
  async getAuthorOwnArticles(@Req() req): Promise<Article[]> {
    return this.articleService.getAuthorArticles(req.user.id);
  }

  @Get('/author/:author_name')
  async getAuthorArticles(@Param('author_name') author_name: string) {
    return this.articleService.getAuthorArticles(author_name);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Author, Role.Admin)
  @Get('author/:author_id/article/:article_id')
  async checkIfArticleBelongsToAuthor(
    @Param('author_id', ParseIntPipe) author_id: number,
    @Param('article_id') article_id: string,
    @Req() req,
  ): Promise<boolean> {
    return (
      (await this.articleService.checkIfArticleBelongToAuthor(
        author_id,
        article_id,
      )) || req.user.role === 'ADMIN'
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Author, Role.Admin)
  @Delete('/delete/:article_id')
  async deleteArticle(@Param('article_id') article_id: string): Promise<any> {
    return this.articleService.deleteArticle(article_id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Author, Role.Admin)
  @Put('/edit/:id')
  @UseInterceptors(
    FileInterceptor('banner', {
      storage,
    }),
  )
  async editArticle(
    @Body() body: EditArticleDto,
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<any> {
    return this.articleService.editArticle(body, id, file?.originalname);
  }
}
