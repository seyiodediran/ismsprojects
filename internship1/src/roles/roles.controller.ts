import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Role } from './entities/role.entity';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    /**
     * @param createRoleDto 
     * @param req 
     * @returns 
     */

    @ApiOperation({ description: 'Creates a Role' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Role created successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Role),
        },

    })

    @Post()

    create(@Body() createRoleDto: CreateRoleDto, @Req() req: any) {

      return this.rolesService.create(createRoleDto, req);

    }

    /**
     * @param req 
     * @returns 
     */

    @ApiOperation({ description: 'Fetches all roles' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Roles fetched successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Role),
        },

    })

    @Get()

    findAll(@Req() req: any) {

      return this.rolesService.findAll(req);

    }

    /**
     * @param id 
     * @param req 
     * @returns 
     */

    @ApiOperation({ description: 'Fetches a role' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Role fetched successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Role),
        },

    })

    @Get(':id')

    findOne(@Param('id') id: string, @Req() req: any) {

      return this.rolesService.findOne(+id, req);

    }

    /**
     * @param id 
     * @param updateRoleDto 
     * @param req 
     * @returns 
     */

    @ApiOperation({ description: 'Updates a role' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Role updated successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Role),
        },

    })

    @Patch(':id')

    update( @Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @Req() req: any) {

      return this.rolesService.update(+id, updateRoleDto, req);

    }

    /**
     * @param id 
     * @param req 
     * @returns 
     */

    @ApiOperation({ description: 'Removes a role' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Role removed successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Role),
        },

    })

    @Delete(':id')

    remove(@Param('id') id: string, @Req() req: any) {

      return this.rolesService.remove(+id, req);

    }

    //Relationships


    /**
     * @param roleId 
     * @param userId 
     * @returns 
     */

    @ApiOperation({ description: 'Adds a user to a role' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'User added to role successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Role),
        },

    })

    @Patch(':roleId/users/:userId')

    addUserById(@Param('roleId') roleId: string, @Param('userId') userId: string, @Req() req: any) {

      return this.rolesService.addUserById(+roleId, +userId, req)

    }

    /**
     * @param roleId 
     * @param userquery 
     * @returns 
     */

    @ApiOperation({ description: 'Adds one or more users to a role' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'User(s) added to role successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Role),
        },

    })

    @Patch(':roleId/users')

    addUsersById(@Param('roleId') roleId: string, @Query() query: string, @Req() req: any) {

      return this.rolesService.addUsersById(+roleId, query['userId'], req)

    }

    /**
     * @param roleId 
     * @param userId 
     * @returns 
     */

    @ApiOperation({ description: 'Removes a user from a role' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'User removed from role successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Role),
        },

    })

    @Delete(':roleId/users/:userId')

    removeUserById(@Param('roleId') roleId: string, @Param('userId') userId: string, @Req() req: any) {

      return this.rolesService.removeUserById(+roleId, +userId, req)
      
    }

    /**
     * @param roleId 
     * @param userquery 
     * @returns 
     */

    @ApiOperation({ description: 'Removes one or more users from a role' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

        description: 'Users removed from a role successfully',
        schema: {
            type: 'object',
            $ref: getSchemaPath(Role),
        },

    })

    @Delete(':roleId/users')

    removeUsersById(@Param('roleId') roleId: string, @Query() userquery: string, @Req() req: any) {

      return this.rolesService.removeUsersById(+roleId, userquery['userId'], req)

    }

}
