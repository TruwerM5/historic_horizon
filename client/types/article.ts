export default interface Article {
  id: string;
  title: string;
  banner: string;
  tags: string[];
  article_id: number;
  pub_date: Date;
  articleContent: {
    id: number;
    article_id: number;
    content: string;
  };
}
