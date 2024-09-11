import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { EditProfileDto } from './dto/edit-profile.dto';
import { EditPasswordDto } from './dto/edit-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async listUsers(): Promise<Omit<User, 'password' | 'likes'>[]> {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        status: true,
        // articles: true,
        _count: {
          select: {
            articles: true,
          },
        },
      },
      where: {
        role: {
          not: 'ADMIN',
        },
      },
    });
  }

  async findOne(email: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async editProfile(id: number, data: EditProfileDto): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async editPassword(id: number, data: EditPasswordDto): Promise<any> {
    const salt = Number(process.env.SALT);
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatched = await bcrypt.compare(data.oldpassword, user.password);
    if (!isMatched) {
      throw new BadRequestException('Old password is incorrect');
    }

    const newPassword = await bcrypt.hash(data.password, salt);

    return await this.prismaService.user.update({
      where: { id },
      data: {
        password: newPassword,
      },
    });
  }

  async setStatus(
    status: 'BLOCKED' | 'ACTIVE',
    user_id: number,
  ): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: user_id,
      },
      data: {
        status,
      },
    });
  }
}
