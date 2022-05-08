import { Injectable } from '@nestjs/common';
import * as vision from '@google-cloud/vision';
import { ImageModificationInstanceLabel } from 'src/models/image-modification-instance-label';

@Injectable()
export class RecognitionService {
    // Creates a client
    client = new vision.ImageAnnotatorClient();
    async annotateImage(image: string) {
        
       // Performs label detection on the image file
       const [result] = await this.client.labelDetection(image);
       const labels = result.labelAnnotations;
       console.log('Labels:');
       labels.forEach(label => console.log(label.description));
       labels.forEach(label => console.log(JSON.stringify(label, null, 2)));
       return labels as Partial<ImageModificationInstanceLabel>[]
    }
}
