import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { logger } from 'src/global/winston';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, req: any): Promise<User> {
    try {
      //create a new user object
      const newUser = this.userRepository.create(createUserDto);

      // hash password in the dto sent before saving to datatabase
      //import bcrypt

      await bcrypt.hash(newUser.passwordHash, 10).then((hash: string) => {
        // find out what the '10' is for
        newUser.passwordHash = hash; // remember in our dto we did not set password hash to readonly so that we could implement these changes
      });

      const user = await this.userRepository.save(newUser);
      //in a larger project, it is at this point you would send feedback to the user. For instance, "your account has been created"

      return user;
    } catch (error) {
      // capture
      // the error message,
      // time message is logged,
      // the request method,
      // the device the client connected through,
      // which url endpoint led to the error,
      // the address of the clients machine
      logger.error(error.message, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });

      // debug and error.stack gives more. it says at which line the errors occur
      logger.debug(error.stack, {
        time: new Date(),
        request_method: req.method,
        endnpoint: req.url,
        client: req.socket.remoteAddress,
        agent: req.headers['user-agent'],
      });
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem with user creation ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a probem with user creation ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findAll(req: any): Promise<[User[], number]> {
    try {
      return await this.userRepository.findAndCount(); // we use findAndCount here to support pagination
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

      // this time around there is no possibility of constraint since we are not writing to the db
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem accessing user data: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllWithOptions(
    findOptions: string,
    req: any,
  ): Promise<[User[], number]> {
    try {
      return await this.userRepository.findAndCount(JSON.parse(findOptions)); // it expects the options in JSON format but we cant carry it from the front end like that hence we have to parse the string from front end to JSON
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
          error: `There was a problem accessing user data: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findOne(id: number, req: any): Promise<User> {
    try {
      return await this.userRepository.findOne(id);
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
          error: `There was a problem accessing user data: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    req: any,
  ): Promise<UpdateResult> {
    try {
      if (updateUserDto.passwordHash != '') {
        await bcrypt
          .hash(updateUserDto.passwordHash, 10)
          .then((hash: string) => {
            updateUserDto.passwordHash = hash;
          });

        return await this.userRepository.update(id, { ...updateUserDto }); // why did we use a spread operator to declare our dto here?
      }
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
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem with user creation ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a probem with user creation ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async remove(id: number, req: any): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete(id);
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
          error: `There was a problem accessing user data: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // * Relationships

  //here we are adding role(s) to a user

  async addRoleById(userId: number, roleId: number): Promise<void> {
    // here we use add because its many. if theres only a possibility of setting one we use 'set'
    try {
      return await this.userRepository
        .createQueryBuilder()
        .relation(User, 'roles') // the relation you want to work with and the field in that table. question-- why is User passed as a parameter?
        .of(userId) // relation of which particular user -- userId in this case
        .add(roleId); // what do we want to do? -- we want to add the field RoleId
    } catch (error) {}
  }

  // assigning multiple roles to one user at a go
  // you can use this for either adding one role or multiple roles bc array accepts one or more values. Using the 2 methods is redundant

  async addRolesById(userId: number, roleIds: number[]): Promise<void> {
    // here we use add because its many. if theres only a possibility of setting one we use 'set'
    try {
      return await this.userRepository
        .createQueryBuilder()
        .relation(User, 'roles') // the relation you want to work with and the field in that table
        .of(userId) // relation of which particular user -- userId in this case
        .add(roleIds); // what do we want to do? -- we want to add the field RoleId
    } catch (error) {}
  }

  async removeRoleById(userId: number, roleId: number): Promise<void> {
    // here we use add because its many. if theres only a possibility of setting one we use 'set'
    try {
      return await this.userRepository
        .createQueryBuilder()
        .relation(User, 'roles') // the relation you want to work with and the field in that table
        .of(userId) // relation of which particular user -- userId in this case
        .remove(roleId); // what do we want to do? -- we want to add the field RoleId
    } catch (error) {}
  }

  // remove multiple roles from one user at a go
  // you can use this for either removing one role or multiple roles bc array accepts one or more values. Using the 2 methods is redundant

  async removeRolesById(userId: number, roleIds: number[]): Promise<void> {
    // here we use add because its many. if theres only a possibility of setting one we use 'set'
    try {
      return await this.userRepository
        .createQueryBuilder()
        .relation(User, 'roles') // the relation you want to work with and the field in that table
        .of(userId) // relation of which particular user -- userId in this case
        .remove(roleIds); // what do we want to do? -- we want to add the field RoleId
    } catch (error) {}
  }

  // add Departments by id

  async addDepartmentById(userId: number, departmentId: number): Promise<void> {
    try {
      return await this.userRepository
        .createQueryBuilder()
        .relation(User, 'department')
        .of(userId)
        .add(departmentId);
    } catch (error) {}
  }

  // remove Departments by id

  async removeDepartmentById(
    userId: number,
    departmentId: number,
  ): Promise<void> {
    try {
      return await this.userRepository
        .createQueryBuilder()
        .relation(User, 'department')
        .of(userId)
        .remove(departmentId);
    } catch (error) {}
  }

  async setUserProfileById(
    userId: number,
    userProfileId: number,
  ): Promise<void> {
    try {
      return await this.userRepository
        .createQueryBuilder()
        .relation(User, 'userProfiles')
        .of(userId)
        .set(userProfileId);
    } catch (err) {}
  }

  async unsetUserProfileById(userId: number): Promise<void> {
    try {
      return await this.userRepository
        .createQueryBuilder()
        .relation(User, 'userProfiles')
        .of(userId)
        .set(null);
    } catch (err) {}
  }
}
