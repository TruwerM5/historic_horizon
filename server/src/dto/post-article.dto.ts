export class PostArticleDto {
  id: string;
  title: string;
  content: string;
  tags: string;
}

export class PostArticleContentDto {
  article_id: string;
  content: string;
}
