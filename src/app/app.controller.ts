import { Controller, ForbiddenException, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { EnhancedParseUUIDPipe } from 'src/app.settings/validation-pipe/parse-uuid.pipe';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiResponse({ status: 200, description: 'The blog has been successfully created.', type: String })
  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Get('error')
  async getForbidden(
  ): Promise<string> {
    throw new ForbiddenException()
  }

  @Get('error2')
  async getForbidden2(
  ): Promise<string> {
    throw new ForbiddenException({ message: '2' })
  }

  @Get('user/:id')
  async getHelloId(
    @Param('id', new EnhancedParseUUIDPipe()) id: string,
  ): Promise<string> {
    return await this.appService.getHello();
  }

}
