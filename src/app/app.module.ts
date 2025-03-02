import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfiguration } from 'src/app.settings/getConfiguration';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    load: [getConfiguration]
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
