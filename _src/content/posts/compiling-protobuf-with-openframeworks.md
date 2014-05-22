---
title: "Compiling protobuf with openFrameworks."
description: "How to compile Google Protobuf with OpenFrameworks in XCode 5.1.1"
date: "2014-05-22"
categories:
    - "Google Protobuf"
    - "XCode"
    - "OpenFrameworks"
    - "C++"
---
For the past two days, I've been trying to get Google Protobuf to work with
openFrameworks (c++) in XCode 5.1.1, without success.

Actually, getting protobuf to work in standard IOS projects is trivial, thanks to
CocoaPods. A ```Podfile``` with the following entry
```pod 'GoogleProtobuf', '~> 2.5.0'``` combined with ```pod install```
does the job very well.

However, openFrameworks has its own build settings that does not play well
with CocoaPods workspace. Thankfully, [protobuf-objc](http://protobuf.axo.io/)
is here to save the day.

[protobuf-objc](http://protobuf.axo.io/) is an implementation of Protocol
Buffers in Objective-C. Installation procedure is straight forward. The only
thing to remember is that compiling ```.proto``` files should done via. the
```protoc-gen-objc``` plugin. More specifically,

```protoc --plugin=/usr/local/bin/protoc-gen-objc person.proto --objc_out="./"```

The resulting files are ```pb.h``` & ```pb.mm```.
