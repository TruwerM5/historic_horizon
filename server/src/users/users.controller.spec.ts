import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        UsersController
      ],
      providers: [JwtAuthGuard, PrismaService, AuthService, JwtService, UsersService],
      

    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('Users controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
