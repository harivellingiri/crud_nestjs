import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('user/getuser/all')
  async getUser() {

    console.log(process.env.AWS_REGION)
    const alluser = await this.appService.getUser();
    if (!alluser) {
      return "failed"
    }
    else {
      return alluser
    }
  }

  @Post('user/create')
  async createUser(@Body() user: User) {
    const crtuser = await this.appService.createUser(user)
    if (!crtuser) {
      return "User not created"
    } else {
      return "user created";
    }
  }

  @Put('user/update/:id')
  async updateUser(@Param('id') id: string, @Body() user: User) {
    const updateuser = await this.appService.updateUser(id, user)
    if (!updateuser) {
      return "User not Updated"
    } else {
      return "user updated";
    }
  }

  @Get('user/getuser/:id')
  async getSpecificUser(@Param('id') id: string) {
    const speuser = await this.appService.getSpecficUser(id)
    if (!speuser) {
      return "Error"
    } else {
      return speuser;
    }
  }

  @Delete('user/delete/:id')
  async deleteUser(@Param('id') id: string) {
    const deleteuser = await this.appService.deleteUser(id)
    console.log(deleteuser)
    if (!deleteuser) {
      return "User not Deleted"
    } else {
      return "user Deleted";
    }
  }

}
