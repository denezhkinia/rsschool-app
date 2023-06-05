import { User } from '@entities/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsListService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async getAll() {
    const users = await this.userRepository.find({
      relations: ['students', 'mentors.course', 'students.course', 'courseUsers', 'courseUsers.course'],
    });
    if (!users.length) {
      return null;
    }
    return users.filter(user => user?.students?.length);
  }

  public getUserByProvider(provider: string, providerUserId: string) {
    return this.userRepository.findOne({
      where: { provider, providerUserId },
      relations: ['mentors', 'students', 'mentors.course', 'students.course', 'courseUsers', 'courseUsers.course'],
    });
  }
}
