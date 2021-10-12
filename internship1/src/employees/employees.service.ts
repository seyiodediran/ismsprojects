import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';
import { logger } from 'src/global/winston';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';


@Injectable()
export class EmployeesService {
  constructor(

    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
    @InjectConnection() private connection: Connection,

  ) { }

  async create(createEmployeeDto: CreateEmployeeDto, req: any): Promise<Employee> {

    try {

      const newEmployee = await this.employeeRepository.create(
        createEmployeeDto,

      );

      const employee = await this.employeeRepository.save(newEmployee);

      await this.connection.queryResultCache.remove(['employee']);

      return employee;

    } catch (error) {

      logger.error(error.message, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      logger.debug(error.stack, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem with employee creation ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a probem with employee creation ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }


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

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      logger.debug(error.stack, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem with fetching employees ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a probem with fetching employees ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }


  async findAllWithOptions(findOptions: string, req: any): Promise<[Employee[], number]> {

    try {

      return await this.employeeRepository.findAndCount(JSON.parse(findOptions),); // it expects the options in JSON format but we cant carry it from the front end like that hence we have to parse the string from front end to JSON

    } catch (error) {

      logger.error(error.message, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      logger.debug(error.stack, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem with fetching employees with options passed ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a probem with fetching employees with options passed ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }


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

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      logger.debug(error.stack, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem with fetching an employee${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a probem with fetching an employee ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }


  async update(id: number, updateEmployeeDto: UpdateEmployeeDto, req: any): Promise<UpdateResult> {

    try {

      return await this.employeeRepository.update(id, { ...updateEmployeeDto });

    } catch (error) {

      logger.error(error.message, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      logger.debug(error.stack, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem with updating an employee ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a probem with user updating an employee ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }


  async remove(id: number, req: any): Promise<DeleteResult> {

    try {

      return await this.employeeRepository.delete(id);

    } catch (error) {

      logger.error(error.message, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      logger.debug(error.stack, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem deleting an empployee ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a probem deleting an employee ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }

  // Relationships

  async setUserById(employeeId: number, userId: number, req: any): Promise<void> {

    try {

      return await this.employeeRepository
        .createQueryBuilder()
        .relation(Employee, 'user')
        .of(employeeId)
        .set(userId);

    } catch (error) {

      logger.error(error.message, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      logger.debug(error.stack, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem adding a department to an employee ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a probem adding a department to an employee ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }

  async unsetUserById(employeeId: number, req: any): Promise<void> {

    try {

      return await this.employeeRepository
        .createQueryBuilder()
        .relation(Employee, 'user')
        .of(employeeId)
        .set(null);

    } catch (error) {

      logger.error(error.message, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      logger.debug(error.stack, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem adding a department to an employee ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a probem adding a department to an employee ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }

  async setDepartmentById(employeeId: number, departmentId: number, req: any): Promise<void> {

    try {

      return await this.employeeRepository
        .createQueryBuilder()
        .relation(Employee, 'department')
        .of(employeeId)
        .set(departmentId);

    } catch (error) {

      logger.error(error.message, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      logger.debug(error.stack, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem adding a department to an employee ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a probem adding a department to an employee ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }


  async unsetDepartmentById(employeeId: number, req: any): Promise<void> {

    try {

      return await this.employeeRepository
        .createQueryBuilder()
        .relation(Employee, 'department')
        .of(employeeId)
        .set(null);

    } catch (error) {

      logger.error(error.message, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      logger.debug(error.stack, {

        time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent'],

      });

      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem removing a department from an employee ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a probem removing a department from an employee ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }
}
