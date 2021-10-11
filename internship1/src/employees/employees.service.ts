import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';
import { logger } from 'src/global/winston';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

let a = (s) => {
  return s;
};
@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectConnection() private connection: Connection,
  ) {}

  /**
   * Creates a new employee
   * @param createEmployeeDto
   * @param req
   * @returns
   */
  async create(
    createEmployeeDto: CreateEmployeeDto,
    req: any,
  ): Promise<Employee> {
    try {
      const newEmployee = await this.employeeRepository.create(
        createEmployeeDto,
      );

      const employee = await this.employeeRepository.save(newEmployee);
      await this.connection.queryResultCache.remove(['employee']);

      return employee;
    } catch (error) {
      logger.error(error.message, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      logger.debug(error.stack, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem creating a new Employee ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem creating a new Employee. ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  /**
   * Finds all employees
   * @param req
   * @returns
   */
  async findAll(req: any): Promise<[Employee[], number]> {
    try {
      return await this.employeeRepository.findAndCount({
        cache: {
          id: 'employees',
          milliseconds: 10000,
        },
      });
    } catch (error) {
      logger.error(error.message, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      logger.debug(error.stack, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem creating a new Employee. ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Finds all employees with the possibility of options
   * @param findOptions
   * @param req
   * @returns
   */
  async findAllWithOptions(
    findOptions: string,
    req: any,
  ): Promise<[Employee[], number]> {
    try {
      return await this.employeeRepository.findAndCount(
        JSON.parse(findOptions),
      ); // it expects the options in JSON format but we cant carry it from the front end like that hence we have to parse the string from front end to JSON
    } catch (error) {
      logger.error(error.message, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      logger.debug(error.stack, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem creating a new Employee. ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Find an employee
   * @param id
   * @param req
   * @returns
   */
  async findOne(id: number, req: any): Promise<Employee> {
    try {
      return await this.employeeRepository.findOne(id, {
        cache: {
          id: 'employees',
          milliseconds: 10000,
        },
      });
    } catch (error) {
      logger.error(error.message, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      logger.debug(error.stack, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem creating a new Employee. ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Updates an employee
   * @param id
   * @param updateEmployeeDto
   * @param req
   * @returns
   */
  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
    req: any,
  ): Promise<UpdateResult> {
    try {
      return await this.employeeRepository.update(id, { ...updateEmployeeDto });
    } catch (error) {
      logger.error(error.message, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      logger.debug(error.stack, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem updating the Employee ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem updating the Employee. ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * deletes a user
   * @param id
   * @param req
   * @returns
   */
  async remove(id: number, req: any): Promise<DeleteResult> {
    try {
      return await this.employeeRepository.delete(id);
    } catch (error) {
      logger.error(error.message, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      logger.debug(error.stack, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem removing the Employee. ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Relationships

  /**
   * Adds a department to an employee
   * @param employeeId
   * @param departmentId
   * @param req
   * @returns
   */
  async setDepartmentById(
    employeeId: number,
    departmentId: number,
    req: any,
  ): Promise<void> {
    try {
      return await this.employeeRepository
        .createQueryBuilder()
        .relation(Employee, 'department')
        .of(employeeId)
        .set(departmentId);
    } catch (error) {
      logger.error(error.message, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      logger.debug(error.stack, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
    }
  }

  /**
   * Removes a department from an employee
   * @param employeeId
   * @param departmentId
   * @param req
   * @returns
   */
  async unsetDepartmentById(employeeId: number, req: any): Promise<void> {
    try {
      return await this.employeeRepository
        .createQueryBuilder()
        .relation(Employee, 'department')
        .of(employeeId)
        .set(null);
    } catch (error) {
      logger.error(error.message, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      logger.debug(error.stack, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
    }
  }
}
