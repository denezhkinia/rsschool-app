import { User } from '@entities/user';
import { ApiProperty } from '@nestjs/swagger';

export class Student1Dto {
  constructor(student: User) {
    this.githubId = student.githubId;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
  }

  @ApiProperty()
  public githubId: string;

  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public lastName: string;
}
