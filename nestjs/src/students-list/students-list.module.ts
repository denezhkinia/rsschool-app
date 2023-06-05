import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/user';
import { StudentsListService } from './students-list.service';
import { StudentsListController } from './students-list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [StudentsListController],
  providers: [StudentsListService],
  exports: [StudentsListService],
})
export class StudentsListModule {}
