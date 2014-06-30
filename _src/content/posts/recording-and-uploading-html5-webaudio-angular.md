---
title: "Recording and Uploading HTML5 WebAudio - Angular + GO"
description: ""
date: "2014-06-30"
categories:
    - "AngularJS"
    - "Google GO"
    - "HTML5"
    - "Web Audio"
    - "Coffeescript"
---
### Introduction ###
In this brief tutorial, I'll show how to record audio with HTML5 Web Audio API and upload it to server.

### Libraries ###
We'll use the [RecordRTC](https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RecordRTC) library
for handling the nitty gritty of Web Audio API.

### Client side Recording ###

The following angular service initialises recordRTC context and maps it to the window. It also exposes the ```UploadLastRecording``` method for posting
the audio data to the server.

```
angular.module('app.audioMaster', [])

.factory('AudioService', [
   '$window', '$http'
   ($window, $http) ->
     navigator.userMedia = (
       $window.navigator.getUserMedia ||
       $window.navigator.webkitGetUserMedia ||
       $window.navigator.mozGetUserMedia ||
       $window.navigator.msGetUserMedia)

     navigator.getUserMedia {audio:true, video:false},
       (stream) ->
         $window.recordRTC = RecordRTC(stream)
         return
       (err) ->
         console.log(err)
         return

     return {
       UploadLastRecording: ->
         blob = $window.recordRTC.getBlob()
         fd = new FormData()
         fd.append('audio', blob)
         $http.post('/path/to/server', fd,
           {
             transformRequest: angular.identity
             headers: {'Content-Type' : undefined }
           }).success(data) ->
           console.log("Posted sound")
         return
     }
 ])
```

See [here](http://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs) for more detail on how to post multipart form data in angular.

```blob = $window.recordRTC.getBlob()``` returns the binary data which is ready to be sent over the wire.
