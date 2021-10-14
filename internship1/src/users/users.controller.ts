import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @ApiOperation({ description: 'Create a new user' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'User successfully created',
        schema: {
            type: 'object',
            $ref: getSchemaPath(User), // why is this necessary? the dto schema is made available already
        },

    })

    @Post()

    async create(@Body() createUserDto: CreateUserDto, @Req() req: any): Promise<User> {

        return await this.usersService.create(createUserDto, req);

    }


    /**
     * Find users based on options provided in query. The query key expected is find-options
     * @param req
     */

    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiQuery({ name: 'find-options', description: '' })
    @ApiOkResponse({

        description: 'Successfully fetched users with options passed',
        schema: {
            type: 'array',
            $ref: getSchemaPath(User)

        }
    })

    @Get()

    async findAll(@Query() query: string, @Req() req: any): Promise<[User[], number]> {

        for (const queryKey of Object.keys(query)) {

            // iterate through our query by the number of elements in the query. Pick the first key do something, pick the next one do something ...

            if (queryKey == 'find-options') {

                return await this.usersService.findAllWithOptions(decodeURI(query[queryKey]), req); //decodeURI used for encoding

            }
        }

        return await this.usersService.findAll(req);
    }

    /**
     * Finds a single user
     * @param id
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Finds a user' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Successfully fetched one user',
        schema: {
            type: 'object',
            $ref: getSchemaPath(User)

        }
    })


    @Get(':id')

    findOne(@Param('id') id: string, @Req() req: any) {

        return this.usersService.findOne(+id, req);

    }

    /**
     * @param id
     * @param updateUserDto
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Updates a user' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Successfully updated a user',
        schema: {
            type: 'object',
            $ref: getSchemaPath(User)

        }
    })

    @Patch(':id')

    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: any) {

        return this.usersService.update(+id, updateUserDto, req);

    }

    /**
     *
     * @param id
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Removes a user' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Successfully removed a user',
        schema: {
            type: 'object',
            $ref: getSchemaPath(User)

        }
    })

    @Delete(':id')

    remove(@Param('id') id: string, @Req() req: any) {

        return this.usersService.remove(+id, req);

    }

    // Handling Relationships from the frontend


    /**
     * @param userId
     * @param roleId
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Adds a role to a user' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Successfully added a role to a user',
        schema: {
            type: 'object',
            $ref: getSchemaPath(User)

        }
    })

    @Patch(':userId/roles/:roleId')

    async addRoleById(@Param('userId') userId: string, @Param('roleId') roleId: string, @Req() req: any): Promise<void> {

        return this.usersService.addRoleById(+userId, +roleId, req);

    }


    @Delete(':userId/roles/:roleId')

    async removeRoleById(@Param('userId') userId: string, @Param('roleId') roleId: string, @Req() req: any): Promise<void> {

        return this.usersService.addRoleById(+userId, +roleId, req);

    }

    /**
 * Add mutiple roles to a user
 * @param userId
 * @param query
 * @param req
 * @returns
 */

    // ?roleid=1&roleid=2&roleid=5

    @ApiOperation({ description: 'Removes multiple roles to a user' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Successfully Removed multiple roles to a user',
        schema: {
            type: 'object',
            $ref: getSchemaPath(User)

        }
    })

    /**
     * Add mutiple roles to a user
     * @param userId
     * @param query
     * @param req
     * @returns
     */

    // ?roleid=1&roleid=2&roleid=5

    @ApiOperation({ description: 'Adds multiple roles to a user' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Successfully added multiple roles to a user',
        schema: {
            type: 'object',
            $ref: getSchemaPath(User)

        }
    })

    @Patch(':userId/roles')

    async addRolesById(@Param('userId') userId: string, @Query() query: string, @Req() req: any): Promise<void> {

        return this.usersService.addRolesById(+userId, query['roleid'], req);

    }

    /**
    * @param userId
    * @param roleId
    * @param req
    * @returns
    */

    @ApiOperation({ description: 'Removes a role from a user' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Successfully removed a role to a user',
        schema: {
            type: 'object',
            $ref: getSchemaPath(User)

        }
    })



    @Delete(':userId/roles')

    async removeRolesById(@Param('userId') userId: string, @Query() query: string, @Req() req: any): Promise<void> {

        return this.usersService.removeRolesById(+userId, query['roleid'], req);

    }


    /**
     * Sets a userprofile for a user
     * @param userId
     * @param userProfileId
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Adds user profile to a user' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Successfully added a user profile to a user',
        schema: {
            type: 'object',
            $ref: getSchemaPath(User)

        }
    })

    @Patch(':userId/user-profiles/:userProfileId')

    async setUserProfileById(@Param('userId') userId: string, @Param('userProfileId') userProfileId: string, @Req() req: any): Promise<void> {

        return this.usersService.setUserProfileById(+userId, +userProfileId, req);

    }



    /**
     * Unsets a userprofile for a user
     * @param userId
     * @param req
     * @returns
     */

    @ApiOperation({ description: 'Removes a user profile to a user' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Successfully removed a user profile to a user',
        schema: {
            type: 'object',
            $ref: getSchemaPath(User)

        }
    })

    @Delete(':userId/user-profiles')

    async unsetUserProfileById(@Param('userId') userId: string, @Req() req: any): Promise<void> {

        return this.usersService.unsetUserProfileById(+userId, req);

    }
}
