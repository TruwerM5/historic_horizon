import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { EditProfileDto } from './dto/edit-profile.dto';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { EditPasswordDto } from './dto/edit-password.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getUsers(): Promise<Omit<User, 'password' | 'likes' | 'articles'>[]> {
    return this.usersService.listUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('edit')
  async editProfile(
    @Req() req,
    @Res() res: Response,
    @Body() body: EditProfileDto,
  ) {
    const editedUser = await this.usersService.editProfile(req.user.id, body);
    if (editedUser) {
      const newToken = await this.authService.login(editedUser);
      res.cookie('jwt', newToken.access_token).json({
        user: editedUser,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('edit-password')
  async editPassword(@Req() req, @Body() body: EditPasswordDto): Promise<any> {
    return await this.usersService.editPassword(req.user.id, body);
  }

  @Post(':id/set-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async setStatus(
    @Param('id', ParseIntPipe) user_id: number,
    @Body('status') status: 'BLOCKED' | 'ACTIVE',
  ): Promise<User> {
    return this.usersService.setStatus(status, user_id);
  }
}
