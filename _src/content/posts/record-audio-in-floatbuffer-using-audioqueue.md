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

### Implementation ###
```
#import "AudioRecorder.h"

#define AUDIO_DATA_TYPE_FORMAT float

@implementation AudioRecorder

void AudioInputCallback(void * inUserData,  // Custom audio metadata
                        AudioQueueRef inAQ,
                        AudioQueueBufferRef inBuffer,
                        const AudioTimeStamp * inStartTime,
                        UInt32 inNumberPacketDescriptions,
                        const AudioStreamPacketDescription * inPacketDescs) {

    RecordState * recordState = (RecordState*)inUserData;

    AudioQueueEnqueueBuffer(recordState->queue, inBuffer, 0, NULL);

    AudioRecorder *rec = (AudioRecorder *) refToSelf;
    [rec feedSamplesToEngine:inBuffer->mAudioDataBytesCapacity audioData:inBuffer->mAudioData];

    }

- (id)init
{
  self = [super init];
  if (self) {
    en = new ASREngine();
    en->engineInit("1293.lm", "1293.dic");
    refToSelf = self;
  }
  return self;
}

- (void)setupAudioFormat:(AudioStreamBasicDescription*)format {
    format->mSampleRate = 16000.0;

    format->mFormatID = kAudioFormatLinearPCM;
    format->mFormatFlags = kAudioFormatFlagsNativeFloatPacked;
    format->mFramesPerPacket  = 1;
    format->mChannelsPerFrame = 1;
    format->mBytesPerFrame    = sizeof(Float32);
    format->mBytesPerPacket   = sizeof(Float32);
    format->mBitsPerChannel   = sizeof(Float32) * 8;
}

- (void)startRecording {
  [self setupAudioFormat:&recordState.dataFormat];

  recordState.currentPacket = 0;

  OSStatus status;
  status = AudioQueueNewInput(&recordState.dataFormat,
                              AudioInputCallback,
                              &recordState,
                              CFRunLoopGetCurrent(),
                              kCFRunLoopCommonModes,
                              0,
                              &recordState.queue);

  if (status == 0) {

    for (int i = 0; i < NUM_BUFFERS; i++) {
      AudioQueueAllocateBuffer(recordState.queue, 256, &recordState.buffers[i]);
      AudioQueueEnqueueBuffer(recordState.queue, recordState.buffers[i], 0, nil);
    }

    recordState.recording = true;

    status = AudioQueueStart(recordState.queue, NULL);
  }
}

- (void)stopRecording {
  recordState.recording = false;

  AudioQueueStop(recordState.queue, true);

  for (int i = 0; i < NUM_BUFFERS; i++) {
  AudioQueueFreeBuffer(recordState.queue, recordState.buffers[i]);
  }

  AudioQueueDispose(recordState.queue, true);
  AudioFileClose(recordState.audioFile);
}

@end
```
