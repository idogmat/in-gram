import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentsTypes } from './getConfiguration';
import { HttpExceptionFilter } from './exception-filter';
import { ConfigService } from '@nestjs/config';
// import { LoggingInterceptor } from '../utils/interceptors/logging.interceptor';


export const applyAppSettings = (app: INestApplication): { port: number; env: string } => {
  const { port, env, prefix } = getEnv(app)

  setAppPrefix(app, prefix);

  setSwagger(app, prefix);

  setAppPipes(app);

  setAppExceptionsFilters(app);
  return { port, env }
};

const getEnv = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3003;
  const env = configService.get<EnvironmentsTypes>('NODE_ENV');
  const prefix = configService.get<string>('APP_PREFIX');
  return { port, env, prefix }
}

const setAppPrefix = (app: INestApplication, prefix: string) => {
  app.setGlobalPrefix(prefix);
};

const setSwagger = (app: INestApplication, prefix: string) => {
  // if (env !== EnvironmentMode.PRODUCTION) {
  const swaggerPath = prefix + '/swagger';

  const config = new DocumentBuilder()
    .setTitle('in-gram')
    .setDescription('API for control in-gram')
    .setVersion('1.0')
    // .addBearerAuth()
    // .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document, {
    customSiteTitle: 'in-gram Swagger',
  });
  // }
};

const setAppPipes = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const customErrors = [];
        console.log(errors, 'pipe');
        errors.forEach((e) => {
          const constraintKeys = Object.keys(e.constraints);
          constraintKeys.forEach((cKey) => {
            const msg = e.constraints[cKey];
            customErrors.push({ field: e.property, message: msg });
          });
        });


        throw new BadRequestException(customErrors);
      },
    }),
  );
};

const setAppExceptionsFilters = (app: INestApplication) => {
  app.useGlobalFilters(new HttpExceptionFilter());
};
