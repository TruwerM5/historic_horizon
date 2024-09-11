import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { SignUpUserDto } from '../dto/sign-up.dto';
import { User } from '@prisma/client';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUpUser(
    @Body() body: SignUpUserDto,
    @Request() req,
    @Res() res: Response,
  ): Promise<any> {
    const user = await this.authService.signUp(body);
    const token = await this.authService.login(user);
    res
      .cookie('jwt', token.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/',
      })
      .json({ user });
  }

  // @Post('signup-admin')
  // async signUpAdmin(@Body() body: SignUpUserDto): Promise<User> {
  //   return this.authService.signUp(body, Role.Admin);
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('signup-author')
  async signUpAuthor(@Body() body: SignUpUserDto): Promise<User> {
    return this.authService.signUp(body, Role.Author);
  }

  @UseGuards(JwtAuthGuard)
  @Get('login')
  async getUser(@Request() req) {
    return {
      user: {
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
        role: req.user.role,
        status: req.user.status,
      },
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.user);
    res
      .cookie('jwt', token.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/',
      })
      .json({ user: req.user });
  }

  @Post('logout')
  async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    req.user = null;
    res.clearCookie('jwt').json({ message: 'Logged out' });
  }
}
