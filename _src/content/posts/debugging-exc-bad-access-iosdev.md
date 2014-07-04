---
title: "Debugging EXC_BAD_ACCESS - #IOSDEV"
description: ""
date: "2014-07-04"
categories:
    - "EXC_BAD_ACCESS"
    - "IOSDEV"
---
Debugging EXC_BAD_ACCESS bugs can be real pain, as you it can leave you scratching the head.

EXC_BAD_ACCESS occurs when the code tries to reference objects that have been deallocated. They're called Zombie objects.

To enable debugging, enable NSZombieObjects option from the Edit Scheme of the current target. See image below:


![][1]


[1]: images/nszombie.png

