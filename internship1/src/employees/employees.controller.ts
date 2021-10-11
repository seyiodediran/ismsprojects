import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  /**
   * Creates an employee
   * @param createEmployeeDto
   * @param req
   * @returns
   */
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto, @Req() req: any) {
    return this.employeesService.create(createEmployeeDto, req);
  }

  /**
   * Finds all employees
   * @param query
   * @param req
   * @returns
   */
  @Get()

  // let nest know it should check for queries
  async findAll(@Query() query: string, @Req() req: any): Promise<[Employee[], number]> {
    for (const queryKey of Object.keys(query)) {
      // iterate through our query by the number of elements in the query. Pick the first key do something, pick the next one do something ...

      if (queryKey == 'find-options') {
        return await this.employeesService.findAllWithOptions(decodeURI(query[queryKey]), req); //decodeURI used for encoding
      }
    }
    return await this.employeesService.findAll(req);
  }
  /**
   * Finds an employee
   * @param id
   * @param req
   * @returns
   */
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.employeesService.findOne(+id, req);
  }
  /**
   *
   * @param id Updates an employee
   * @param updateEmployeeDto
   * @param req
   * @returns
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto, @Req() req: any) {
    return this.employeesService.update(+id, updateEmployeeDto, req);
  }
  /**
   * Deletes an employee
   * @param id
   * @param req
   * @returns
   */
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.employeesService.remove(+id, req);
  }

  //Relationships

  /**
   * Adds a department to an employee
   * @param employeeId
   * @param departmentId
   * @param req
   * @returns
   */
  @Patch(':employeeId/departments/:departmentId')
  async addDepartmentById(
    @Param('employeeId') employeeId: string,
    @Param('departmentId') departmentId: string,
    @Req() req: any,
  ): Promise<void> {
    return this.employeesService.setDepartmentById(+employeeId, +departmentId, req);
  }

  /**
   * Deletes a department from an employee
   * @param employeeId
   * @param req
   * @returns
   */
  @Delete(':employeeId/departments')
  async unsetDepartmentById(@Param('employeeId') employeeId: string, @Req() req: any): Promise<void> {
    return this.employeesService.unsetDepartmentById(+employeeId, req);
  }
}
