---
title: "Selecting a GO web framework - Martini"
description: "Using Martini Web Framework for GoLang."
date: "2014-06-06"
categories:
    - "Google GO"
    - "Martini Web Framework"
---
When GO came out in 2009, I had looked into it briefly. At the time, I didn't have much experience writing web servers or concurrent systems,
therefore, couldn't fully put into perspective the different features Go had introduced.

Fast forward around April 2014, after having extensive experience working on Javascript and Node.JS, I picked up GO again. 
I even attended GoLang Sydney Meetup at ThoughtWorks.

![][1]

Go is likely to be a number one choice for writing servers in the coming years.

## Martini by CodeGangsta ##

[Martini](https://github.com/go-martini/martini) is a framework for writing web applications in GO, which is extremely easy to pick up.
Conceptually, It's similar to Express-JS, which the main reason why I went with it.

## Sample Code - Martini + LevelDB ##
Here's a sample code from one of my projects using Martini and GoLang. 

```
package main

import (
  "sample/handler"
  "github.com/go-martini/martini"
  "github.com/syndtr/goleveldb/leveldb"
)

func main() {
  db, err := leveldb.OpenFile("db", nil)
  if err != nil {
    panic(err)
  }
  defer db.Close()

  m := martini.Classic()
  m.Map(db)

  //Get model.proto required by the javascript client
  m.Get("/model", handler.GetProtoSchema)
  m.Get("/words", handler.GetWords)
  m.Post("/word", handler.PostWord)
  ▸ m.Post("/tag", handler.TagWord)
  m.Delete("/word/:name", handler.DeleteWord)
  m.Post("/upload", handler.UploadPic)

  m.Run()
}
```

[1]: images/GoLangMeetupSyd2014.jpg

