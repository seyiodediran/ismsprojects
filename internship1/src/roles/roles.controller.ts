import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  /**
   * Create a role
   * @param createRoleDto 
   * @param req 
   * @returns 
   */

  @Post()

  create(@Body() createRoleDto: CreateRoleDto, @Req() req: any) {

    return this.rolesService.create(createRoleDto, req);

  }

  /**
   * Returns all roles
   * @param req 
   * @returns 
   */

  @Get()

  findAll(@Req() req: any) {

    return this.rolesService.findAll(req);

  }

  /**
   * Returns a single role
   * @param id 
   * @param req 
   * @returns 
   */

  @Get(':id')

  findOne(@Param('id') id: string, @Req() req: any) {

    return this.rolesService.findOne(+id, req);

  }

  /**
   * Update a role
   * @param id 
   * @param updateRoleDto 
   * @param req 
   * @returns 
   */

  @Patch(':id')

  update( @Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @Req() req: any) {

    return this.rolesService.update(+id, updateRoleDto, req);

  }

  /**
   * Remove a role
   * @param id 
   * @param req 
   * @returns 
   */

  @Delete(':id')

  remove(@Param('id') id: string, @Req() req: any) {

    return this.rolesService.remove(+id, req);

  }

  //Relationships


  /**
   * Adds a user to a role
   * @param roleId 
   * @param userId 
   * @returns 
   */

  @Patch(':roleId/users/:userId')

  addUserById(@Param('roleId') roleId: string, @Param('userId') userId: string, @Req() req: any) {

    return this.rolesService.addUserById(+roleId, +userId, req)

  }

  /**
   * Adds one or more users to a role
   * @param roleId 
   * @param userquery 
   * @returns 
   */

  @Patch(':roleId/users')

  addUsersById(@Param('roleId') roleId: string, @Query() userquery: string, @Req() req: any) {

    return this.rolesService.addUsersById(+roleId, userquery['userId'], req)

  }

  /**
   * Removes a user from a role
   * @param roleId 
   * @param userId 
   * @returns 
   */

  @Patch(':roleId/users/:userId')

  removeUserById(@Param('roleId') roleId: string, @Param('userId') userId: string, @Req() req: any) {

    return this.rolesService.removeUserById(+roleId, +userId, req)
    
  }

  /**
   * Remove one or more users from a role
   * @param roleId 
   * @param userquery 
   * @returns 
   */

  @Patch(':roleId/users')

  removeUsersById(@Param('roleId') roleId: string, @Query() userquery: string, @Req() req: any) {

    return this.rolesService.removeUsersById(+roleId, userquery['userId'], req)

  }

}
