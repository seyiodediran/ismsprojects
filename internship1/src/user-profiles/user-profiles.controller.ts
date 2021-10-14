import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { UserProfile } from './entities/user-profile.entity';

@ApiTags('user-profiles')
@Controller('user-profiles')
export class UserProfilesController {

    constructor(private readonly UserProfilesService: UserProfilesService) { }

    /**
     * @param createUserProfileDto 
     * @param req 
     * @returns 
     */

    @ApiOperation({ description: 'Creates a user profile' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'user profile created successfully',
      schema: {
        type: 'object',
        $ref: getSchemaPath(UserProfile),
      },

    })

    @Post()

    create(@Body() createUserProfileDto: CreateUserProfileDto, @Req() req: any) {

      return this.UserProfilesService.create(createUserProfileDto, req);

    }

    /**
     * @param req 
     * @returns 
     */

    @ApiOperation({ description: 'Fetches all user profiles' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'User profiles fetched successfully',
      schema: {
        type: 'object',
        $ref: getSchemaPath(UserProfile),
      },

    })

    @Get()

    findAll(@Req() req: any) {

      return this.UserProfilesService.findAll(req);

    }

    /**
     * @param id 
     * @param req 
     * @returns 
     */

    @ApiOperation({ description: 'Fetches a user profile' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'User profile fetched successfully',
      schema: {
        type: 'object',
        $ref: getSchemaPath(UserProfile),
      },

    })

    @Get(':id')

    findOne(@Param('id') id: string, @Req() req: any) {

      return this.UserProfilesService.findOne(+id, req);

    }

    /**
     * @param id 
     * @param updateUserProfileDto 
     * @param req 
     * @returns 
     */

    @ApiOperation({ description: 'Updates a user profile' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'User profile updated successfully',
      schema: {
        type: 'object',
        $ref: getSchemaPath(UserProfile),
      },

    })

    @Patch(':id')

    update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto, @Req() req: any) {

      return this.UserProfilesService.update(+id, updateUserProfileDto, req);

    }

    /**
     * @param id 
     * @param req 
     * @returns 
     */

    @ApiOperation({ description: 'Removes a user profile' })
    @ApiBadRequestResponse({ description: 'Bad request: constraint problem' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({

      description: 'User profile removed successfully',
      schema: {
        type: 'object',
        $ref: getSchemaPath(UserProfile),
      },

    })

    @Delete(':id')

    remove(@Param('id') id: string, @Req() req: any) {

      return this.UserProfilesService.remove(+id, req);

    }

}

