import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';
import { logger } from 'src/global/winston';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
    constructor(

        @InjectRepository(Department) private readonly departmentRepository: Repository<Department>,
        @InjectConnection() private connection: Connection

    ) { }

    /**
     * Creates a new user
     * @param createDepartmentDto
     * @param req
     * @returns
     */

    async create(createDepartmentDto: CreateDepartmentDto, req: any): Promise<Department> {

        try {

            const newDept = await this.departmentRepository.create(createDepartmentDto);

            const department = await this.departmentRepository.save(newDept);

            await this.connection.queryResultCache.remove(['department']);

            return department;

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException(

                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: `There was a problem creating a new department ${error.message}`,
                    },
                    HttpStatus.BAD_REQUEST

                );

            } else {

                throw new HttpException(
                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem creating a new department. ${error.message}`,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }

    /**
     * Finds all departments
     * @param req
     * @returns
     */

    async findAll(req: any): Promise<Department[]> {

        try {

            return await this.departmentRepository.find({

                cache: {
                    id: 'departments',
                    milliseconds: 10000,
                },

            });

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

            });

            throw new HttpException(

                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: `There was a problem creating a new department. ${error.message}`,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,

            );
        }
    }

    /**
     * Finds a department
     * @param id
     * @param req
     * @returns
     */

    async findOne(id: number, req: any): Promise<Department> {

        try {

            return await this.departmentRepository.findOne(id);

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

            });

            throw new HttpException(

                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: `There was a problem creating a new department. ${error.message}`,
                },
                HttpStatus.INTERNAL_SERVER_ERROR

            );
        }
    }

    /**
     * Updates a department
     * @param id
     * @param updateDepartmentDto
     * @param req
     * @returns
     */

    async update(id: number, updateDepartmentDto: UpdateDepartmentDto, req: any): Promise<UpdateResult> {

        try {

            const updateDepartment = await this.departmentRepository.update(id, { ...updateDepartmentDto, });

            await this.connection.queryResultCache.remove(['department']);

            return updateDepartment;

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException(

                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: `There was a problem updating the department ${error.message}`,
                    },
                    HttpStatus.BAD_REQUEST

                );

            } else {

                throw new HttpException(

                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem updating the department. ${error.message}`,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }

    /**
     * Deletes a department
     * @param id
     * @param req
     * @returns
     */

    async remove(id: number, req: any): Promise<DeleteResult> {

        try {
            const deleteDepartment = await this.departmentRepository.delete(id);

            await this.connection.queryResultCache.remove(['department']);

            return deleteDepartment;

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

            });

            throw new HttpException(

                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: `There was a problem removing the department. ${error.message}`,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,

            );
        }
    }

    // Relationships

    /**
     * Adds an employee to a department
     * @param departmentId 
     * @param employeeId 
     * @param req 
     * @returns 
     */

    async addEmployeeById(departmentId: number, employeeId: number, req: any) {

        try {

            return this.departmentRepository
                .createQueryBuilder()
                .relation(Department, 'employees')
                .of(departmentId)
                .add(employeeId);

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException(

                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: `There was a problem updating the department ${error.message}`,
                    },
                    HttpStatus.BAD_REQUEST

                );

            } else {

                throw new HttpException(

                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem updating the department. ${error.message}`,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }

    /**
     * Adds one or multiple employees to a department
     * @param departmentId 
     * @param employeeIds 
     * @param req 
     * @returns 
     */

    async addEmployeesById(departmentId: number, employeeIds: number[], req: any) {

        try {

            return this.departmentRepository
                .createQueryBuilder()
                .relation(Department, 'employees')
                .of(departmentId)
                .add(employeeIds);

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException(

                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: `There was a problem updating the department ${error.message}`,
                    },
                    HttpStatus.BAD_REQUEST

                );

            } else {

                throw new HttpException(

                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem updating the department. ${error.message}`,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }

    /**
     * Remove an employee from a department
     * @param departmentId 
     * @param employeeId 
     * @param req 
     * @returns 
     */

    async removeEmployeeById(departmentId: number, employeeId: number, req: any) {

        try {

            return this.departmentRepository
                .createQueryBuilder()
                .relation(Department, 'employees')
                .of(departmentId)
                .remove(employeeId);

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException(

                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: `There was a problem updating the department ${error.message}`,
                    },
                    HttpStatus.BAD_REQUEST

                );

            } else {

                throw new HttpException(

                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem updating the department. ${error.message}`,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }

    /**
     * Remove one or multiple employees from department
     * @param departmentId 
     * @param employeeIds 
     * @param req 
     * @returns 
     */

    async removeEmployeesById(departmentId: number, employeeIds: number[], req: any) {

        try {

            return this.departmentRepository
                .createQueryBuilder()
                .relation(Department, 'employees')
                .of(departmentId)
                .add(employeeIds);

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException(

                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: `There was a problem updating the department ${error.message}`,
                    },
                    HttpStatus.BAD_REQUEST

                );

            } else {

                throw new HttpException(

                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem updating the department. ${error.message}`,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }
}
