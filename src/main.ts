import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  app.init();
  const appService = app.get(AppService);
  // await appService.processImages();
  await appService.annotateImages();
  app.close()
}
bootstrap();
