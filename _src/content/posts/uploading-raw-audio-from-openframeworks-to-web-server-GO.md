---
title: "Uploading raw audio data from Openframeworks (C++) to web server (GO) - #IOSDEV"
description: ""
date: "2014-07-06"
categories:
    - "CreativeCoding"
    - "Raw Audio Data"
    - "OpenFrameworks"
    - "Go"
    - "ASIHttpRequest"
    - "IOSDEV"
---
Working with audio recordings has several pain points associated with them, which I'll talk about below. The problems get compounded when you're working on devices with limited capacities like mobile phones.

Back to the problems:

1. RAW audio data are huge. A 3 Seconds recording sampled @ 44100 is about 529 KB in size. Storing it permanently in iphone/android/ipad wouldn't be a good idea. See (http://stackoverflow.com/questions/22292677/apps-must-follow-the-ios-data-storage-guidelines-or-they-will-be-rejected-in-app)

2. In OpenFrameworks, as of now there isn't any great solution to converting audio data to compressed format. Or even uncompressed format for that matter. See (https://github.com/openframeworks/openFrameworks/issues/2511)

One solution is to simply upload the raw audio data and let the server decide the correct treatment.

### Openframeworks App Setup ###
With the following setup, we're recording audio sampled @ 16000 for 3 seconds. The samples are accumulated in the buffer periodically. For details, checkout this book. (http://books.google.com.au/books?id=WRr2AAAAQBAJ)

```
void ofApp::setup() {
  sampleRate = 16000;
  duration = 3;
  recPos = 0;
  size = duration * sampleRate
  isRecording = false;
  buffer.resize(size, 0.0);
  //Note: these are some low fidelity settings. You'd want to sample at least @44100 with 2 output channels and 4 buffers
  ofSoundStreamSetup(1, 1, this, sampleRate, 512, 1);
}

void ofApp::audioIn(float * input, int bufferSize, int nChannels){
  if (!isRecording) {
      return;
  }

  for (int i=0; i<bufferSize; i++) {
    buffer[recPos] = input[i];
    recPos++;
    recPos %= size;
  }
}
```

### Turning on/off the recording ###

```
void ofApp::startListening() {
  std::fill(buffer.Begin(), buffer.End(), 0)
  isRecording = true
}

void ofApp::stopListening() {
  isRecording = false;
  uploadSound();
}
```

### Uploading sound ###
