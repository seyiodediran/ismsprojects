import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';
import { logger } from 'src/global/winston';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';

@Injectable()
export class UserProfilesService {
  constructor(

    @InjectRepository(UserProfile) private readonly userProfileRepository: Repository<UserProfile>,
    @InjectConnection() private connection: Connection

  ) { }

  async create(createUserProfileDto: CreateUserProfileDto, req: any): Promise<UserProfile> {

    try {

      const newUserProfile = await this.userProfileRepository.create(createUserProfileDto);

      const userProfile = await this.userProfileRepository.save(newUserProfile);

      await this.connection.queryResultCache.remove(['userProfiles']);

      return userProfile;

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
            error: `There was a problem creating a new user profile ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem creating a new user profile. ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }

  async findAll(req): Promise<UserProfile[]> {

    try {

      return await this.userProfileRepository.find({

        cache: {

          id: 'userProfiles',
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

      if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem finding all user profiles ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }

  async findOne(id: number, req: any): Promise<UserProfile> {

    try {

      return await this.userProfileRepository.findOne(id);

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
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem fetching a User profile. ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }

  async update(id: number, updateUserProfileDto: UpdateUserProfileDto, req: any): Promise<UpdateResult> {

    try {

      const updateResult = await this.userProfileRepository.update(id, { ...updateUserProfileDto });

      await this.connection.queryResultCache.remove(['userProfiles']);

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
            error: `There was a problem updating a user profile ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem updating a user profile. ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }

  async remove(id: number, req: any): Promise<DeleteResult> {

    try {

      const deleteResult = await this.userProfileRepository.delete(id);

      await this.connection.queryResultCache.remove(['userProfiles']);

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
            error: `There was a problem removing a user profile ${error.message}`,
          },
          HttpStatus.BAD_REQUEST,

        );

      } else {

        throw new HttpException(

          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem removing a user profile. ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,

        );
      }
    }
  }
}
