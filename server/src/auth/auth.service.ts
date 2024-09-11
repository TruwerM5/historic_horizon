import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { SignUpUserDto } from '../dto/sign-up.dto';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signUp(user: SignUpUserDto, role?: Role): Promise<User> {
    try {
      const salt = Number(process.env.SALT);
      const hash = await bcrypt.hash(user.password, salt);

      const newUser = await this.prisma.user.create({
        data: {
          email: user.email,
          username: user.username,
          password: hash,
          role: role || 'USER',
        },
      });
      return newUser;
    } catch (e) {
      console.log('ERROR: ', e.message);
      throw new BadRequestException();
    }
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const isMatched = await bcrypt.compare(password, user.password);

      if (isMatched) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      status: user.status,
    };
    return {
      access_token: this.jwtService.sign(
        payload,
        // , {
        // secret: process.env.SECRET,
        // expiresIn: '60s',
        // }
      ),
    };
  }
}
