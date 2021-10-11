import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
    constructor(private readonly departmentsService: DepartmentsService) {}

    /**
     * Creates a user
     * @param createDepartmentDto
     * @param req
     * @returns
     */
    @Post()
    create(@Body() createDepartmentDto: CreateDepartmentDto, @Req() req: any) {
        return this.departmentsService.create(createDepartmentDto, req);
    }

    /**
     * Finds all departments
     * @param req
     * @returns
     */
    @Get()
    findAll(@Req() req: any) {
        return this.departmentsService.findAll(req);
    }

    /**
     * Finds a department
     * @param id
     * @param req
     * @returns
     */
    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: any) {
        return this.departmentsService.findOne(+id, req);
    }

    /**
     * Updates a department
     * @param id
     * @param updateDepartmentDto
     * @param req
     * @returns
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto, @Req() req: any) {
        return this.departmentsService.update(+id, updateDepartmentDto, req);
    }

    /**
     * Deletes a department
     * @param id
     * @param req
     * @returns
     */
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: any) {
        return this.departmentsService.remove(+id, req);
    }

    //Relationships

    /**
     * Adds an employee to a department
     * @param departmentId
     * @param employeeId
     * @param req
     * @returns
     */
    @Patch(':departmentId/employees/employeeId')
    addEmployeeById(
        @Param('departmentId') departmentId: string,
        @Param('employeeId') employeeId: string,
        @Req() req: any,
    ) {
        return this.departmentsService.addEmployeeById(+departmentId, +employeeId, req);
    }

    /**
     * Adds one or multiple employees to a department
     * @param departmentId
     * @param query
     * @param req
     * @returns
     */
    @Patch(':departmentId/employees')
    addEmployeesById(@Param('departmentId') departmentId: string, @Query() query: string, @Req() req: any) {
        return this.departmentsService.addEmployeesById(+departmentId, query['employeeId'], req);
    }

    /**
     * Remove an employee from a department
     * @param departmentId
     * @param employeeId
     * @param req
     * @returns
     */
    @Delete(':departmentId/employees/employeeId')
    removeEmployeeById(
        @Param('departmentId') departmentId: string,
        @Param('employeeId') employeeId: string,
        @Req() req: any,
    ) {
        return this.departmentsService.removeEmployeeById(+departmentId, +employeeId, req);
    }

    /**
     * Remove one or multiple employees from department
     * @param departmentId
     * @param query
     * @param req
     * @returns
     */
    @Delete(':departmentId/employees')
    removeEmployeesById(@Param('departmentId') departmentId: string, @Query() query: string, @Req() req: any) {
        return this.departmentsService.removeEmployeesById(+departmentId, query['employeeId'], req);
    }
}
