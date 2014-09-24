---
title: "Record Microphone Audio into a Float Buffer with AudioQueues - #IOSDEV"
description: ""
date: "2014-09-30"
categories:
    - "IOS"
    - "Audio Queues"
    - "XCode"
    - "Microphone Recording"
---
### Introduction ###
This article is a how-to on recording microphone audio into a float buffer using Audio Queues for IOS. The first question then is why would you want to record the data into a float buffer ?

The usual option is to record the data into a file, ex: AIF format. Recording in a float buffer allows you to process the audio data for needs like visualiations, futher processing with algorithms, speech recognition etc.

### AudioRecorder.h ###
```
#ifndef SpeechBookWormSwift_AudioRecorder_h
#define SpeechBookWormSwift_AudioRecorder_h

#import <Foundation/Foundation.h>
#import <AudioToolbox/AudioQueue.h>
#import <AudioToolbox/AudioFile.h>

#import "ASREngine.h"

#define NUM_BUFFERS 1

typedef struct
{
  AudioStreamBasicDescription dataFormat;
  AudioQueueRef               queue;
  AudioQueueBufferRef         buffers[NUM_BUFFERS];
  AudioFileID                 audioFile;
  SInt64                      currentPacket;
  bool                        recording;
}RecordState;

void AudioInputCallback(void * inUserData,  // Custom audio metadata
                        AudioQueueRef inAQ,
                        AudioQueueBufferRef inBuffer,
                        const AudioTimeStamp * inStartTime,
                        UInt32 inNumberPacketDescriptions,
                        const AudioStreamPacketDescription * inPacketDescs);

@interface AudioRecorder : NSObject {
  RecordState recordState;
}

- (void)setupAudioFormat:(AudioStreamBasicDescription*)format;
- (void)startRecording;
- (void)stopRecording;

@end
#endif
```
