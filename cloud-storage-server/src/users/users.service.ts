import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }
}
