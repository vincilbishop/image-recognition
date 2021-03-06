# Enhanced Computer Vision Using Automated Optimized Neural Network Image Pre-Processing 
# Reproduction Package

## About
This repository was prepared for the [IS&T Archiving Conference 2022](https://www.imaging.org/Site/IST/Conferences/Archiving/Archiving_Home)
## Description
Image recognition logic for testing.

The logic uses the following filters in 25% incremental increases:
- Contrast (0%, 25%, 50%, 75%, 100%)
- Background Removal (100%)
- Sharpen (0%, 25%, 50%, 75%, 100%)
- Despeckle (100%)
The ideal code would run:
1. All possible combinations of these image alterations on a batch of photos in a folder we designate and save the new altered photos.
2. Use the google vision API to return the top classification results.
I can separately run all the original photos for our baseline and write up an analysis of the end results.
This should produce 990 alterations from which predictive modeling can be performed to focus on which more specific combinations
would perform the best.
For the photo sets, I was thinking of using a batch of aerial aircraft or simply vehicle photos since this could have significant impac

## Methods

* Contrast: https://imagemagick.org/script/command-line-options.php#brightness-contrast
* Sharpen: https://imagemagick.org/script/command-line-options.php#sharpen
* Despeckle: https://imagemagick.org/script/command-line-options.php#despeckle
* Background Subtraction: 


https://github.com/nadermx/backgroundremover

export JAVA_HOME=/Applications/Fiji.app/java/macosx/adoptopenjdk-8.jdk/jre/Contents/Home; /Applications/Fiji.app/Contents/MacOS/ImageJ-macosx --headless --console -macro ./subtract-background.java 'folder=./folder1 parameters=a.properties output=./samples/Output'

--headless --console -macro ./subtract-background.java 'folder=../folder1 parameters=a.properties output=../samples/Output'

/Applications/ImageJ.app/Contents/MacOS/ImageJ --headless --console -macro ./subtract-background.java 'folder=../folder1 parameters=a.properties output=../samples/Output'
https://imagej.net/learn/headless



### Libraries

The following libraries are candidates for use in the solution:

* https://github.com/aheckmann/gm 
* https://www.npmjs.com/package/@google-cloud/vision

The following libraries are interesting:
* https://www.npmjs.com/package/imagej
* https://www.npmjs.com/package/opencv

## Installation

### To install imagemagick & graphicsmagick

```bash
$ brew install ImageJ
$ brew install imagemagick
$ # brew install graphicsmagick
$ yarn add imagemagick
$ yarn add @types/imagemagick --dev
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch


## License

[MIT licensed](LICENSE).

## General Notes
https://blog.risingstack.com/opencv-tutorial-computer-vision-with-node-js/
