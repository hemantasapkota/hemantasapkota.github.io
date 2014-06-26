---
title: "Using LevelDB in Go with Heroku without addons"
description: ""
date: "2014-06-26"
categories:
    - "Google GO"
    - "Heroku"
    - "LevelDB"
---
Heroku is great because it allows you to deploy LevelDB in your GO webapp as it is. Google App Engine, on the other hand does not. Instead, it forces to use the DataStore API.

```
package main

import (
  "github.com/syndtr/goleveldb/leveldb"
)

func main() {
  db, err := leveldb.OpenFile("db", nil)
  if err != nil {
    panic(err)
  }
  defer db.Close()
}
```

