---
title: "Consuming Binary Data in Angular with ProtobufJS"
description: ""
date: "2014-06-10"
categories:
    - "Google Protobuf"
    - "ProtobufJS"
    - "Binary Wire Data"
    - "Coffeescript"
    - "AngularJS"
---
For one of the apps that I've been working on, I have a server written in GO that sends out binary data encoded with Google Protobuf messages via. REST endpoints.
For example:

```
message Word {
  optional string name = 1;
  optional string category = 2;
}

message WordList {
  repeated Word word = 1;
}
```

The question is how do you consume the binary data in Angular ? The answer - Use ```responseType: "arraybuffer"``` in your ```$http.get```.

```
$http.get("/words", {responseType: "arraybuffer"}).success (data) ->
  ##Process data
```

The second question is how do you decode the binary data in Javascript/Angular ? The answer - Use [ProtobfJS](https://github.com/dcodeIO/ProtoBuf.js).

Installation is easy with bower:
```
bower install --save protobuf
```

Once installed, don't forget to add libs in your index.html.

```
<script src="bower_components/bytebuffer/ByteBuffer.min.js"></script>
<script src="bower_components/ProtoBuf/ProtoBuf.min.js"></script>
```
Finally, decoding the data.

```
WordList = dcodeIO.ProtoBuf.loadProtoFile("/model").build("model.WordList")
$http.get("/words", {responseType: "arraybuffer"}).success (data) ->
  wlist = WordList.decode(data)
  $scope.words = wlist.word
```
