---
title: "Using LevelDB & Go with Heroku without addons"
description: ""
date: "2014-06-26"
categories:
    - "Google GO"
    - "Heroku"
    - "LevelDB"
---
Heroku is great because it allows you to deploy LevelDB in your GO webapp as it is. Google App Engine, on the other hand does not. Instead, you'd have to use the DataStore API. Not exactly a portable solution, if you wish to migrate your codebase to some other provider in the future.

Here's an examples source:

```
package main

import (
  "github.com/syndtr/goleveldb/leveldb"
)

func main() {
  db, err := leveldb.OpenFile("db", nil)
  if err != nil {
    return
  }
  defer db.Close()
}
```

To run it all you have to do it:

```
godep save
git push heroku master
```

The reason why this works is that the [leveldb](http://github.com/syndtr/goleveldb/leveldb) package is a pure GO implementation.

