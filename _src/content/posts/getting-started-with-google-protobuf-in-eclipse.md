---
title: "Getting Started with Google Protobuf - 1"
description: "Google Protobuf is a great framework for serializing and deserializing data for your applications. In this series of article, we'll look into setting up Google Protobuf as an Eclipse Plugin and later integrate protobuf in your RCP applications."
date: "2012-12-06"
categories:
    - "Google Protobuf"
    - "Eclipse"
    - "Java"
---

##  Setting up Google Protobuf - Compiling tools and API ##


 1. Download Google Protobuf 2.4.1 from [http://code.google.com/p/protobuf/downloads/list][1]


 2. Compile Google Protobuf


I'm using OSX Lion and Eclipse Juno. In OSX, before compiling you need to install command line tools. See here on how to do it. You can skip it, if you already have the command line tools installed. You can check if it is installed from Xcode 4 Preferences.![][2]


Continuing with the setting up, unzip the archive. Open terminal and change the directory to the unzipped directory and compile it using the following commands:


`configure && sudo make install`


The protobuf compiler is installed at `/usr/local/bin/protoc`


 3. Create protobuf-2.4.1.jar API file


You'll have to compile and bundle the Java API as well. The quickest way to do it is to use Maven to package the JAR file. Inside the protobuf-2.4.1 folder that you unzipped, open the terminal and change the directory to "java". Use the following command to compile and bundle the JAR file:


`mvn package`


This process creates a target directory where you'll find protobuf-java-2.4.1.jar file. This JAR file is the Java API for reading/writing protobuf messages in Java. Therefore, it is very important.


![][3]


##  Setting up Google Protobuf - Eclipse plugin ##


 Now, we create an eclipse plugin from existing JAR archive just like the way we did it here: [http://hsapkota.com.au/index.php/blog/eclipse/22-creating-eclipse-plugins-from-any-jar-archives-or-existing-frameworks][4]


 1. Create a new Eclipse plugin project from existing JAR archives


![][5]


 2. Add external JAR file protobuf-2.4.1.jar that we just compiled


![][6]


 3. Enter name and version for the eclipse plugin


![][7]


 4. You should see the plugin in your package explorer now.


![][8]


I've created a [GitHub project][9]  for this plugin so that other users can use it without having to recompile the files.


That's it for this part. In [Part II][10] , we'll look in creating a RCP application and integrate the plugin we just created for serializing and deserializing data.


  [1]: http://code.google.com/p/protobuf/downloads/list
  [2]: images/23-img-005.png
  [3]: images/23-img-006.png
  [4]: index.php/blog/eclipse/22-creating-eclipse-plugins-from-any-jar-archives-or-existing-frameworks
  [5]: images/img001.png
  [6]: images/23-img-002.png
  [7]: images/23-img-001.png
  [8]: images/23-img-004.png
  [9]: https://github.com/hemantasapkota/google-protobuf-2.4.1
  [10]: index.php/blog/eclipse/25-getting-started-with-google-protobuf-in-eclipse-rcp-part-ii
