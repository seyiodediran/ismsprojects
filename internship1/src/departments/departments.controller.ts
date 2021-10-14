import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
    constructor(private readonly departmentsService: DepartmentsService) { }

    /**
     * @param createDepartmentDto
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Creates a department' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Department created successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Department),
        },

    })

    @Post()

    create(@Body() createDepartmentDto: CreateDepartmentDto, @Req() req: any) {

        return this.departmentsService.create(createDepartmentDto, req);

    }

    /**
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Fetches all departments' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Departments fetched successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Department),
        },

    })

    @Get()

    findAll(@Req() req: any) {

        return this.departmentsService.findAll(req);

    }

    /**
     * @param id
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Fetches a departments' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Department fetched successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Department),
        },

    })

    @Get(':id')

    findOne(@Param('id') id: string, @Req() req: any) {

        return this.departmentsService.findOne(+id, req);

    }

    /**
     * @param id
     * @param updateDepartmentDto
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'FUpdates a departments' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Department updated successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Department),
        },

    })

    @Patch(':id')

    update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto, @Req() req: any) {

        return this.departmentsService.update(+id, updateDepartmentDto, req);

    }

    /**
     * @param id
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Removes a departments' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Department removed successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Department),
        },

    })

    @Delete(':id')

    remove(@Param('id') id: string, @Req() req: any) {

        return this.departmentsService.remove(+id, req);

    }

    //Relationships

    /**
     * @param departmentId
     * @param employeeId
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Adds an employee to a department' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Employee added to department successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Department),
        },

    })

    @Patch(':departmentId/employees/employeeId')

    addEmployeeById(@Param('departmentId') departmentId: string, @Param('employeeId') employeeId: string, @Req() req: any) {

        return this.departmentsService.addEmployeeById(+departmentId, +employeeId, req);

    }

    /**
     * @param departmentId
     * @param query
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Adds one or more employees to a department' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Employee(s) added to department successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Department),
        },

    })

    @Patch(':departmentId/employees')

    addEmployeesById(@Param('departmentId') departmentId: string, @Query() query: string, @Req() req: any) {

        return this.departmentsService.addEmployeesById(+departmentId, query['employeeId'], req);

    }

    /**
     * @param departmentId
     * @param employeeId
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Removes an employee from a department' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Employee removed from department successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Department),
        },

    })

    @Delete(':departmentId/employees/employeeId')

    removeEmployeeById(@Param('departmentId') departmentId: string, @Param('employeeId') employeeId: string, @Req() req: any) {

        return this.departmentsService.removeEmployeeById(+departmentId, +employeeId, req);

    }

    /**
     * Remove one or multiple employees from department
     * @param departmentId
     * @param query
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Removes one or more employees from a department' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Employee(s) removed from department successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Department),
        },

    })

    @Delete(':departmentId/employees')

    removeEmployeesById(@Param('departmentId') departmentId: string, @Query() query: string, @Req() req: any) {

        return this.departmentsService.removeEmployeesById(+departmentId, query['employeeId'], req);

    }
}
