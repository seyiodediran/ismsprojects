import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto, @Req() req: any) {
    return this.employeesService.create(createEmployeeDto, req);
  }

  @Get()

  // let nest know it should check for queries
  async findAll(
    @Query() query: string,
    @Req() req: any,
  ): Promise<[Employee[], number]> {
    for (const queryKey of Object.keys(query)) {
      // iterate through our query by the number of elements in the query. Pick the first key do something, pick the next one do something ...

      if (queryKey == 'find-options') {
        return await this.employeesService.findAllWithOptions(
          decodeURI(query[queryKey]),
          req,
        ); //decodeURI used for encoding
      }
    }
    return await this.employeesService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.employeesService.findOne(+id, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Req() req: any,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.employeesService.remove(+id, req);
  }

  //Relationships

  //Dept

  @Patch(':employeeId/departments/:departmentId')
  async addDepartmentById(
    @Param('employeeId') employeeId: string,
    @Param('departmentId') departmentId: string,
    @Req() req: any,
  ): Promise<void> {
    return this.employeesService.addDepartmentById(
      +employeeId,
      +departmentId,
      req,
    );
  }
}
