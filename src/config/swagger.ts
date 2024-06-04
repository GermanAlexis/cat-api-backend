import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API documentation for PLAYGRREEN-SPORT')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        description: 'here you write token',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      })
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}
