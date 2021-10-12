import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

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


  async findAll(@Query() query: string, @Req() req: any): Promise<[Employee[], number]> {

    for (const queryKey of Object.keys(query)) {


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
   * Adds a user as an employee
   * @param employeeid 
   * @param userid 
   * @param req 
   * @returns 
   */
  @Patch(':employeeid/users/:userid')

  setUserById(@Param('employeeid') employeeId: string, @Param('userid') userId: string, @Req() req: any) {

    return this.employeesService.setUserById(+employeeId, +userId, req)

  }

  /**
   * Removes a user as an employee
   * @param employeeid 
   * @param req 
   * @returns 
   */
  @Patch(':employeeid/users')

  unsetUserById(@Param('employeeid') employeeid: string, @Req() req: any) {

    return this.employeesService.unsetUserById(+employeeid, req)

  }

  /**
   * Adds a department to an employee
   * @param employeeId
   * @param departmentId
   * @param req
   * @returns
   */

  @Patch(':employeeId/departments/:departmentid')

  async addDepartmentById(@Param('employeeid') employeeId: string, @Param('departmentid') departmentId: string, @Req() req: any): Promise<void> {

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
