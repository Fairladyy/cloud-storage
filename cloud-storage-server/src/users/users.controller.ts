import { Controller, Get, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/userInfo')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@UserId() id: number) {
    return this.usersService.findById(id);
  }
}
