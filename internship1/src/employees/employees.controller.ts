import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';


@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

    /**
     * @param createEmployeeDto
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Create a new employee' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'Employee successfully created',
      schema: {
        type: 'object',
        $ref: getSchemaPath(Employee),
      },

    })

    @Post()

    create(@Body() createEmployeeDto: CreateEmployeeDto, @Req() req: any) {

      return this.employeesService.create(createEmployeeDto, req);

    }

    /**
     * @param query
     * @param req
     * @returns
     */

    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiQuery({ name: 'find-options', description: '' })
    @ApiOkResponse({

      description: 'Successfully fetched employees with options passed',
      schema: {
        type: 'array',
        $ref: getSchemaPath(Employee)

      }
    })

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
     * @param id
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Fetches an employee' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'Successfully fetched an employee',
      schema: {
        type: 'object',
        $ref: getSchemaPath(Employee), 
      },

    })

    @Get(':id')

    findOne(@Param('id') id: string, @Req() req: any) {

      return this.employeesService.findOne(+id, req);

    }

    /**
     *
     * @param id 
     * @param updateEmployeeDto
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Updates an employee' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'Employee updated successfully',
      schema: {
        type: 'object',
        $ref: getSchemaPath(Employee), 
      },

    })

    @Patch(':id')

    update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto, @Req() req: any) {

      return this.employeesService.update(+id, updateEmployeeDto, req);

    }

    /**
     * @param id
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Removes an employee' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'Employee removed successfully ',
      schema: {
        type: 'object',
        $ref: getSchemaPath(Employee), 
      },

    })
    @Delete(':id')

    remove(@Param('id') id: string, @Req() req: any) {

      return this.employeesService.remove(+id, req);

    }

    //Relationships


    /**
     * @param employeeid 
     * @param userid 
     * @param req 
     * @returns 
     */

    @ApiOperation({ description: 'Adds a user as an employee' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'Successfully added user as an employee',
      schema: {
        type: 'object',
        $ref: getSchemaPath(Employee), 
      },

    })

    @Patch(':employeeid/users/:userid')

    setUserById(@Param('employeeid') employeeId: string, @Param('userid') userId: string, @Req() req: any) {

      return this.employeesService.setUserById(+employeeId, +userId, req)

    }

    /**
     * @param employeeid 
     * @param req 
     * @returns 
     */

    @ApiOperation({ description: 'Removes a user as an employee' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'Successfully removed a user as an employee',
      schema: {
        type: 'object',
        $ref: getSchemaPath(Employee), 
      },

    })
    @Delete(':employeeid/users')

    unsetUserById(@Param('employeeid') employeeid: string, @Req() req: any) {

      return this.employeesService.unsetUserById(+employeeid, req)

    }

    /**
     * @param employeeId
     * @param departmentId
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Adds a department to an employee' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'Successfully added a department to an employee',
      schema: {
        type: 'object',
        $ref: getSchemaPath(Employee), 
      },

    })

    @Patch(':employeeId/departments/:departmentid')

    async setDepartmentById(@Param('employeeid') employeeId: string, @Param('departmentid') departmentId: string, @Req() req: any): Promise<void> {

      return this.employeesService.setDepartmentById(+employeeId, +departmentId, req);

    }

    /**
     * @param employeeId
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Removes a department from an employee' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'Successfully removed a department from an employee',
      schema: {
        type: 'object',
        $ref: getSchemaPath(Employee), 
      },

    })

    @Delete(':employeeId/department')

    async unsetDepartmentById(@Param('employeeId') employeeId: string, @Req() req: any): Promise<void> {

      return this.employeesService.unsetDepartmentById(+employeeId, req);

    }

  }
