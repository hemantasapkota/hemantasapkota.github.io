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

* RAW audio data are huge. A 3 Seconds recording sampled @ 44100 is about 529 KB in size. Storing it permanently in iphone/android/ipad wouldn't be a good idea. See (http://stackoverflow.com/questions/22292677/apps-must-follow-the-ios-data-storage-guidelines-or-they-will-be-rejected-in-app)

* Sample
