import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DefaultGuard, RequiredRoles, Role, RoleGuard } from 'src/auth';
import { StudentsListService } from './students-list.service';
import { Student1Dto } from './dto';

@Controller('students-list')
@ApiTags('students-list')
@RequiredRoles([Role.Admin])
@UseGuards(DefaultGuard, RoleGuard)
export class StudentsListController {
  constructor(private readonly service: StudentsListService) {}

  @Get('/')
  @ApiOperation({ operationId: 'getStudentsList' })
  @ApiOkResponse({ type: [Student1Dto] })
  public async getAll() {
    const items = await this.service.getAll();
    return items ? items : [];
  }
}
