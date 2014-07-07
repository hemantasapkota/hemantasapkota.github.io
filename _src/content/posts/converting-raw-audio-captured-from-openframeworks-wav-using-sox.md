---
title: "Converting raw audio data captured from openframeworks to wav using SOX"
description: ""
date: "2014-07-07"
categories:
    - "OpenFrameworks"
    - "IOSDEV"
    - "SOX"
---

```
sox -r 16000 -e floating-point -b 32 -c 1 input.raw output.wav
```
where

```
-r 16000          -> Sampling rate of 16000
-e floating-point -> Encoded with floating point numbers
-b 32             -> Bits/Sample 32
-c 1              -> No. of input channels 1
```
