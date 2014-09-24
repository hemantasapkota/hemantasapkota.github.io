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

