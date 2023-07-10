import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException({
      message: 'Incorrect email or password',
    });
  }

  async register(userDto: CreateUserDto) {
    try {
      const userData = await this.usersService.create(userDto);

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (error) {
      throw new ForbiddenException('Registration error');
    }
  }

  async login(userEntity: UserEntity) {
    return {
      token: this.jwtService.sign({ id: userEntity.id }),
    };
  }
}
