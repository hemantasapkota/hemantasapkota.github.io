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
```pod 'GoogleProtobuf', '~> 2.5.0'```
does the job very well.

However, openFrameworks has it's own build settings that does not play well
with CocoaPods workspace.
