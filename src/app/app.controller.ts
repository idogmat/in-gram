import { Controller, ForbiddenException, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { EnhancedParseUUIDPipe } from 'src/app.settings/validation-pipe/parse-uuid.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Get('/error')
  async getForbidden(
  ): Promise<string> {
    throw new ForbiddenException()
  }

  @Get('/error2')
  async getForbidden2(
  ): Promise<string> {
    throw new ForbiddenException({ message: '2' })
  }

  @Get(':id')
  async getHelloId(
    @Param('id', new EnhancedParseUUIDPipe()) id: string,
  ): Promise<string> {
    return await this.appService.getHello();
  }

}
