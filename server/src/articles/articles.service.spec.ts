import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../prisma.service';

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesService, PrismaService],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

const prismaMock = {
  article: {
    findAll: jest.fn()
  }
}

// describe('ArticlesService', () => {
//   let articlesService: ArticlesService;
//   beforeEach(async () => {
//     const module: TestingModule =  await Test.createTestingModule({
//       providers: [
//         ArticlesService,
//         {
//           provide: PrismaService,
//           useValue: prismaMock
//         },
//         PrismaService
//       ]
//     }).compile();
//     articlesService = module.get<ArticlesService>(ArticlesService);

//     prismaMock.article.findAll.mockClear();

//   });

//   describe('listArticles', () => {

//     it('should return all articles', async () => {

//       const existingArticle = {
        
//           id: "7476c25f-8896-40d9-b917-92410fa7fdfc",
//           title: "История Древнего Египта",
//           banner: "ancient-egypt.jpg",
//           pub_date: "2024-08-26T20:04:35.976Z",
//           tags: [
//               "Древний Египет",
//               "Древний мир"
//           ],
//           author_id: 1
//       };

//       prismaMock.article.findAll.mockResolvedValue(existingArticle);

//       const result = await articlesService.getArticleById(existingArticle.id);
//       expect(result).toEqual(existingArticle);
//       expect(prismaMock.article.findAll).toHaveBeenCalledTimes(1);
//       expect(prismaMock.article.findAll).toHaveBeenCalledWith({
//         where: { id: existingArticle.id }
//       });
//     });



//   });
// })
