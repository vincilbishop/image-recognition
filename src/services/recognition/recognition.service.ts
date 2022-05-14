import { Injectable } from '@nestjs/common';
import * as vision from '@google-cloud/vision';
import { ImageModificationInstanceLabel } from 'src/models/image-modification-instance-label';
import * as fs from 'fs';
import { ImageModificationInstanceObject } from 'src/models/image-modification-instance-object';
@Injectable()
export class RecognitionService {
  // Creates a client 
  client = new vision.ImageAnnotatorClient();
  async annotateImage(image: string) {
    // Performs label detection on the image file
    // TODO: Increase the max number of labels objects to 250
    const [result] = await this.client.labelDetection(image);
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach((label) => console.log(label.description));
    labels.forEach((label) => console.log(JSON.stringify(label, null, 2)));
    return labels as Partial<ImageModificationInstanceLabel>[];
  }

  async detectObjects(image: string) {
    const request = {
      image: { content: fs.readFileSync(image) },
    };

    // Performs label detection on the image file
    // TODO: Increase the max number of detected objects to 250
    const [result] = await this.client.objectLocalization(request);
    const objects = result.localizedObjectAnnotations;
    objects.forEach((object) => {
      console.log(`Name: ${object.name}`);
      console.log(`Confidence: ${object.score}`);
      const vertices = object.boundingPoly.normalizedVertices;
      vertices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`));
    });
    return objects as Partial<ImageModificationInstanceObject>[];
  }
}
