---
title: "Setting Up JadClipse and JAD Decompiler in Eclipse"
description: ""
date: "2014-04-21"
categories:
    - "Box2D"
    - "Eclipse"
    - "Java"
---
1. Download JAD decompiler from here [http://hsapkota.com.au/downloads/jad158g.mac.intel.zip ][1] and unzip it somewhere in your system

2. Download JadClipse - the Eclipse plugin for JAD from here [http://jadclipse.sourceforge.net/wiki/index.php/Main_Page#Download][2]


3. Put JadClipse inside the *plugins* folder of your Eclipse installation


4. Set up preferences by giving path to the JAD decompiler to the plugin


![][3]


5. Associate JadClipse to .CLASS files


Go to Preferences **-> General -> Editors -> File Associations** and associate **.class** and **.class without source **to Jadclipse File Viewer. Also make it default.


**![][4] **



## Testing JadClipse ##


Double click a .CLASS file to see the decompiled data. The image below shows an example.


![][5]


  [1]: downloads/jad158g.mac.intel.zip
  [2]: http://jadclipse.sourceforge.net/wiki/index.php/Main_Page#Download
  [3]: images/24-img-001.png
  [4]: images/24-img-002.png
  [5]: images/24-img-004.png
