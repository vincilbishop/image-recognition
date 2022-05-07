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
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultConnection } from './ormconfig';
import { ImageFile } from './models/image-file';
import { ImageModificationInstanceLabel } from './models/image-modification-instance-label';
import { ImageModificationInstance } from './models/image-modification-instance';
import { ImageOperation } from './models/image-operation';

const ModelsModuleDefinition = [
  TypeOrmModule.forFeature([
    ImageFile,
    ImageModificationInstanceLabel,
    ImageModificationInstance,
    ImageOperation
  ])
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return defaultConnection;
      },
    }),
  ],
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
