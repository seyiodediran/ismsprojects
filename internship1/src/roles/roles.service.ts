import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';
import { logger } from 'src/global/winston';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
    constructor(

        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectConnection() private connection: Connection

    ) { }

    /**
     * Creates a role
     * @param createRoleDto
     * @param req
     * @returns
     */

    async create(createRoleDto: CreateRoleDto, req: any): Promise<Role> {

        try {

            const newRole = await this.roleRepository.create(createRoleDto);

            const role = await this.roleRepository.save(newRole);

            await this.connection.queryResultCache.remove(['roles'])

            return role;

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException(

                    {
                        status: HttpStatus.BAD_REQUEST, //??
                        error: `There was a problem creating a new role ${error.message}`,
                    },
                    HttpStatus.BAD_REQUEST

                );

            } else {

                throw new HttpException(

                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem creating a new role ${error.message}`,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }

    /**
     * Finds all roles
     * @param req
     * @returns
     */

    async findAll(req: any): Promise<Role[]> {

        try {

            return await this.roleRepository.find({

                cache: {

                    id:'roles',
                    milliseconds: 10000

                }

            });

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            throw new HttpException(

                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: `There was a problem creating a new role ${error.message}`,
                },
                HttpStatus.INTERNAL_SERVER_ERROR

            );
        }
    }
    /**
     * Returns a role
     * @param id
     * @param req
     * @returns
     */

    async findOne(id: number, req: any): Promise<Role> {

        try {

            return await this.roleRepository.findOne(id);

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            throw new HttpException(

                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: `There was a problem creating a new role ${error.message}`,
                },
                HttpStatus.INTERNAL_SERVER_ERROR

            );
        }
    }

    /**
     * Updates a role
     * @param id
     * @param updateRoleDto
     * @param req
     * @returns
     */

    async update(id: number, updateRoleDto: UpdateRoleDto, req: any): Promise<UpdateResult> {

        try {

           const updateResult = await this.roleRepository.update(id, { ...updateRoleDto });

           await this.connection.queryResultCache.remove(['roles']);

           return updateResult;

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException(

                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: `There was a problem updating the role ${error.message}`,
                    },
                    HttpStatus.BAD_REQUEST

                )

            } else {

                throw new HttpException(

                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem creating a new role ${error.message}`,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }

    /**
     * Removes a role
     * @param id
     * @param req
     * @returns
     */

    async remove(id: number, req: any): Promise<DeleteResult> {

        try {

            const deleteResult = await this.roleRepository.delete(id);

            await this.connection.queryResultCache.remove(['roles']);

            return deleteResult;


        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException(

                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: `There was a problem removing a role ${error.message}`,
                    },
                    HttpStatus.BAD_REQUEST

                )

            } else {

                throw new HttpException(

                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem removing a role ${error.message}`,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }

    // Relationships

    // Question -- is htere any point of doing this, since we already assign roles while creating user?
    // is there any case in which we can visualize all the roles and assign users to certain roles?
    // add user(s) to a specific role

    /**
     * Adds a user to a role
     * @param roleId 
     * @param userId 
     * @returns 
     */

    async addUserById(roleId: number, userId: number, req: any) {

        try {

            return await this.roleRepository.createQueryBuilder()
                .relation(Role, 'users')
                .of(roleId)
                .add(userId);

        } catch (error) {
        logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException( 

                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: `There was a problem adding a user to a role ${error.message}`,
                    },
                    HttpStatus.BAD_REQUEST

                )

            } else {

                throw new HttpException(

                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem adding a user to a role ${error.message}`,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }

    /**
     * Adds one or multiple users to a role
     * @param roleId 
     * @param userId 
     * @returns 
     */

    async addUsersById(roleId: number, userId: number[], req: any) {

        try {

            return await this.roleRepository.createQueryBuilder()
                .relation(Role, 'users')
                .of(roleId)
                .add(userId);

        } catch (error) {

        logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException(

                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: `There was a problem adding one or more users to a role ${error.message}`,
                    },
                    HttpStatus.BAD_REQUEST

                )

            } else {

                throw new HttpException(

                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem adding one or more users to a role ${error.message}`,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }

    /**
     * Removes a user from a role
     * @param roleId 
     * @param userId 
     * @returns 
     */

    async removeUserById(roleId: number, userId: number, req: any) {

        try {

            return await this.roleRepository.createQueryBuilder()
                .relation(Role, 'users')
                .of(roleId)
                .remove(userId);

        } catch (error) {

        logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException(

                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: `There was a problem removing a user from a role ${error.message}`
                    },
                    HttpStatus.BAD_REQUEST

                )

            } else {

                throw new HttpException(

                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem removing a user from a role ${error.message}`
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }

    /**
     * Removes one or multiple users from a role
     * @param roleId 
     * @param userId 
     * @returns 
     */

    async removeUsersById(roleId: number, userId: number[], req: any) {

        try {

            return await this.roleRepository.createQueryBuilder()
                .relation(Role, 'users')
                .of(roleId)
                .remove(userId);

        } catch (error) {

            logger.error(error.message, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            logger.debug(error.stack, {

                time: new Date(), request_method: req.method, endnpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']

            });

            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

                throw new HttpException(

                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: `There was a problem removing one or more users from a role ${error.message}`,
                    },
                    HttpStatus.BAD_REQUEST

                )

            } else {

                throw new HttpException(

                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem removing one or more users from a role ${error.message}`,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR

                );
            }
        }
    }


}
