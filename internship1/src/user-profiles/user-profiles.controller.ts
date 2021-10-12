import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-profiles')
@Controller('user-profiles')
export class UserProfilesController {

  constructor(

    private readonly userProfilesService: UserProfilesService

  ) { }

  /**
   * Creates a user profile
   * @param createUserProfileDto 
   * @param req 
   * @returns 
   */
  @Post()

  create(@Body() createUserProfileDto: CreateUserProfileDto, @Req() req: any) {

    return this.userProfilesService.create(createUserProfileDto, req);

  }

  /**
   * Fetches all user profiles
   * @param req 
   * @returns 
   */

  @Get()

  findAll(@Req() req: any) {

    return this.userProfilesService.findAll(req);

  }

  /**
   * Fetches a user profile
   * @param id 
   * @param req 
   * @returns 
   */

  @Get(':id')

  findOne(@Param('id') id: string, @Req() req: any) {

    return this.userProfilesService.findOne(+id, req);

  }

  /**
   * Updates a user profile
   * @param id 
   * @param updateUserProfileDto 
   * @param req 
   * @returns 
   */

  @Patch(':id')

  update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto, @Req() req: any) {

    return this.userProfilesService.update(+id, updateUserProfileDto, req);

  }

  /**
   * Deletes a user profile
   * @param id 
   * @param req 
   * @returns 
   */

  @Delete(':id')

  remove(@Param('id') id: string, @Req() req: any) {

    return this.userProfilesService.remove(+id, req);

  }

}
