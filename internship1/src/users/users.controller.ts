import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // http rest endpoint
  //we must declare the verb we want to use
  @Post()

  // nest recognizes that data is coming from request body because we have included the body decorator
  create(@Body() createUserDto: CreateUserDto, @Req() req: any): Promise<User> {
    return this.usersService.create(createUserDto, req);
  }

  @Get()

  // let nest know it should check for queries
  async findAll(@Query() query: string, req: any): Promise<[User[], number]> {
    for (const queryKey of Object.keys(query)) {
      // iterate through our query by the number of elements in the query. Pick the first key do something, pick the next one do something ...

      if (queryKey == 'find-options') {
        return await this.usersService.findAllWithOptions(
          decodeURI(query[queryKey]),
          req,
        ); //decodeURI used for encoding
      }
    }
    return await this.usersService.findAll(req);
  }

  @Get(':id')

  // param lets nest know that in the url there is a certain segment that has what we want to capture as id
  findOne(@Param('id') id: string, req: any) {
    return this.usersService.findOne(+id, req); // converts numeric string to number, id comes as a string so adding a + converts it to number
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    req: any,
  ) {
    return this.usersService.update(+id, updateUserDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, req: any) {
    return this.usersService.remove(+id, req);
  }

  // let's work on handling relationships from the front end

  //Roles

  // users/1/roles/3
  // the id's are parameters so we have to decorate them
  @Patch(':userId/roles/:roleId') // we use colon(:) to indicate what will be a parameter
  async addRoleById(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<void> {
    return this.usersService.addRoleById(+userId, +roleId);
  }

  //add roles(multiple roles)

  //handling queries, the url would look like this; question mark to indicate it's a query
  // ?roleid=1&roleid=2&roleid=5
  @Patch(':userId/roles') // we use colon(:) to indicate what will be a parameter
  async addRolesById(
    @Param('userId') userId: string,
    @Query() query: string,
  ): Promise<void> {
    // here we use add because its many. if theres only a possibility of setting one we use 'set'

    return this.usersService.addRolesById(+userId, query['roleid']);
  }
}
