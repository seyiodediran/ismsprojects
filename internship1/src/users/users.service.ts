import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { logger } from 'src/global/winston';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,

        @InjectConnection() private connection: Connection,
    ) {}

    /**
     * This function creates a new user
     * Password hashing implemented using bcrypt
     * Clear cahce after a new user is saved
     * @param createUserDto
     * @param req
     * @returns
     */
    async create(createUserDto: CreateUserDto, req: any): Promise<User> {
        try {
            const newUser = this.userRepository.create(createUserDto);
            await bcrypt.hash(newUser.passwordHash, 10).then((hash: string) => {
                newUser.passwordHash = hash;
            });
            const user = await this.userRepository.save(newUser);
            //in a larger project, it is at this point you would send feedback to the user. For instance, "your account has been created"

            await this.connection.queryResultCache.remove(['user']);

            return user;
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });

            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
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

    /**
     * This function returns all users.
     * @param req
     * @returns
     */
    async findAll(req: any): Promise<[User[], number]> {
        try {
            return await this.userRepository.findAndCount({
                cache: {
                    id: 'users', // ensures changes are implemented by forcing cache to expire
                    milliseconds: 10000,
                },
            }); // we use findAndCount here to support pagination
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
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

    /**
     * This function returns all users with the possibility of passing options, such as a number for pagination purposes
     * @param findOptions
     * @param req
     * @returns
     */
    async findAllWithOptions(findOptions: string, req: any): Promise<[User[], number]> {
        try {
            return await this.userRepository.findAndCount(JSON.parse(findOptions)); // it expects the options in JSON format but we can't carry it from the front end like that hence we have to parse the string from front end to JSON
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
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

    /**
     * This function returns one user
     * @param id
     * @param req
     * @returns
     */
    async findOne(id: number, req: any): Promise<User> {
        try {
            return await this.userRepository.findOne(id);
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
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

    /**
     * This function updates a user
     * @param id
     * @param updateUserDto
     * @param req
     * @returns
     */
    async update(id: number, updateUserDto: UpdateUserDto, req: any): Promise<UpdateResult> {
        try {
            if (updateUserDto.passwordHash != '') {
                await bcrypt.hash(updateUserDto.passwordHash, 10).then((hash: string) => {
                    updateUserDto.passwordHash = hash;
                });

                const updateResult = await this.userRepository.update(id, {
                    ...updateUserDto,
                }); // why did we use a spread operator to declare our dto here?

                await this.connection.queryResultCache.remove(['user']);

                return updateResult;
            }
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
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

    /**
     * This function deletes a user
     * @param id
     * @param req
     * @returns
     */
    async remove(id: number, req: any): Promise<DeleteResult> {
        try {
            return await this.userRepository.delete(id);
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
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

    /**
     * This function adds 1 or more roles to a user
     * Here we use add because its many. if theres only a possibility of setting one we use 'set'
     * @param userId
     * @param roleId
     * @param req
     * @returns
     */

    async addRoleById(userId: number, roleId: number, req: any): Promise<void> {
        try {
            return await this.userRepository
                .createQueryBuilder()
                .relation(User, 'roles')
                .of(userId) // relation of which particular user -- userId in this case
                .add(roleId); // what do we want to do? -- we want to add the field RoleId
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
        }
    }

    /**
     * Adds multiple roles to a user in one go
     * @param userId
     * @param roleIds
     * @param req
     * @returns
     */
    async addRolesById(userId: number, roleIds: number[], req: any): Promise<void> {
        try {
            return await this.userRepository.createQueryBuilder().relation(User, 'roles').of(userId).add(roleIds);
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
        }
    }

    /**
     * Removes a role from a user
     * @param userId
     * @param roleId
     * @param req
     * @returns
     */
    async removeRoleById(userId: number, roleId: number, req: any): Promise<void> {
        try {
            return await this.userRepository.createQueryBuilder().relation(User, 'roles').of(userId).remove(roleId);
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
        }
    }

    /**
     * Removes multiple roles from a user
     * @param userId
     * @param roleIds
     * @param req
     * @returns
     */

    async removeRolesById(userId: number, roleIds: number[], req: any): Promise<void> {
        try {
            return await this.userRepository.createQueryBuilder().relation(User, 'roles').of(userId).remove(roleIds);
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
        }
    }

    // add Departments by id

    async setDepartmentById(userId: number, departmentId: number, req: any): Promise<void> {
        try {
            return await this.userRepository
                .createQueryBuilder()
                .relation(User, 'department')
                .of(userId)
                .set(departmentId);
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
        }
    }

    // remove Departments by id

    async unsetDepartmentById(userId: number, departmentId: number, req: any): Promise<void> {
        try {
            return await this.userRepository.createQueryBuilder().relation(User, 'department').of(userId).set(null);
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
        }
    }

    /**
     * Sets a userprofile for a user
     * @param userId
     * @param userProfileId
     * @param req
     * @returns
     */
    async setUserProfileById(userId: number, userProfileId: number, req: any): Promise<void> {
        try {
            return await this.userRepository
                .createQueryBuilder()
                .relation(User, 'userProfiles')
                .of(userId)
                .set(userProfileId);
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
        }
    }

    /**
     * Unsets a userprofile for a user
     * @param userId
     * @param req
     * @returns
     */
    async unsetUserProfileById(userId: number, req: any): Promise<void> {
        try {
            return await this.userRepository.createQueryBuilder().relation(User, 'userProfiles').of(userId).set(null);
        } catch (error) {
            logger.error(error.message, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
            logger.debug(error.stack, {
                time: new Date(),
                request_method: req.method,
                endpoint: req.url,
                client: req.socket.remoteAddress,
                agent: req.headers['user-agent'],
            });
        }
    }
}
