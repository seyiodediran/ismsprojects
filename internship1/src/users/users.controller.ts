import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @ApiCreatedResponse({

        description: 'User successfully created',
        schema: {
            type: 'object',
            $ref: getSchemaPath(User),
        },
        
    })

    /**
     * Create a user
     */

    @Post()

    // nest recognizes that data is coming from request body because we have included the body decorator

    async create(@Body() createUserDto: CreateUserDto, @Req() req: any): Promise<User> {

        return await this.usersService.create(createUserDto, req);

    }

    @ApiOkResponse({

        description: 'User successfully fetched',
        schema: {
            type: 'object',
            $ref: getSchemaPath(User),
        },

    })

    /**
     * Find users based on options provided in query. The query key expected is find-options
     * @param req
     */

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

    @Get(':id')

    findOne(@Param('id') id: string, @Req() req: any) {

        return this.usersService.findOne(+id, req);

    }

    /**
     * Updates a user
     * @param id
     * @param updateUserDto
     * @param req
     * @returns
     */

    @Patch(':id')

    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: any) {

        return this.usersService.update(+id, updateUserDto, req);
        
    }

    /**
     *
     * @param id Deletes a user
     * @param req
     * @returns
     */

    @Delete(':id')

    remove(@Param('id') id: string, @Req() req: any) {

        return this.usersService.remove(+id, req);

    }

    // Handling Relationships from the frontend


    /**
     * Adds role(s) to a user
     * @param userId
     * @param roleId
     * @param req
     * @returns
     */

    @Patch(':userId/roles/:roleId') 

    async addRoleById(@Param('userId') userId: string, @Param('roleId') roleId: string, @Req() req: any): Promise<void> {

        return this.usersService.addRoleById(+userId, +roleId, req);

    }

    /**
     * Delete role(s) from a user
     * @param userId
     * @param roleId
     * @param req
     * @returns
     */

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

    @Patch(':userId/roles') // we use colon(:) to indicate what will be a parameter

    async addRolesById(@Param('userId') userId: string, @Query() query: string, @Req() req: any): Promise<void> {

        return this.usersService.addRolesById(+userId, query['roleid'], req);

    }


    /**
     * Sets a userprofile for a user
     * @param userId
     * @param userProfileId
     * @param req
     * @returns
     */

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

    @Delete(':userId/user-profiles')

    async unsetUserProfileById(@Param('userId') userId: string, @Req() req: any): Promise<void> {

        return this.usersService.unsetUserProfileById(+userId, req);

    }
}
