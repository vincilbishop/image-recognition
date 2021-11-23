import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackgroundSubtractionService } from './services/modifications/background-subtraction/background-subtraction.service';
import { ContrastService } from './services/modifications/contrast/contrast.service';
import { DespeckleService } from './services/modifications/despeckle/despeckle.service';
import { SharpenService } from './services/modifications/sharpen/sharpen.service';
import { ImageService } from './services/image/image.service';
import { RecognitionService } from './services/recognition/recognition.service';
import { ReportService } from './services/report/report.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService, 
    BackgroundSubtractionService, 
    ContrastService, 
    DespeckleService, 
    ImageService,
    RecognitionService,
    ReportService,
    SharpenService, 
  ],
})
export class AppModule {}
