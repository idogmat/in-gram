import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentMode, EnvironmentsTypes } from './getConfiguration';
import { HttpExceptionFilter } from './exception-filter';
import { ConfigService } from '@nestjs/config';
// import { LoggingInterceptor } from '../utils/interceptors/logging.interceptor';

const APP_PREFIX = '/api';

export const applyAppSettings = (app: INestApplication): { port: number; env: string } => {
  const { port, env } = getEnv(app)

  setAppPrefix(app);

  setSwagger(app, env);

  setAppPipes(app);

  setAppExceptionsFilters(app);
  return { port, env }
};

const getEnv = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3003;
  const env = configService.get<EnvironmentsTypes>('NODE_ENV');
  return { port, env }
}

const setAppPrefix = (app: INestApplication) => {
  app.setGlobalPrefix(APP_PREFIX);
};

const setSwagger = (app: INestApplication, env: EnvironmentsTypes) => {
  if (env !== EnvironmentMode.PRODUCTION) {
    const swaggerPath = APP_PREFIX + '/swagger';

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
  }
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
