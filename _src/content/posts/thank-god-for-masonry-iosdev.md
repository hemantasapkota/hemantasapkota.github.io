---
title: "Thank God for Masonry - #IOSDev"
description: "Use Masonry to programmatically create layout for your IOS apps superfast!"
date: "2014-10-15"
categories:
    - "IOSDev"
    - "https://github.com/Masonry/Masonry"
    - "XCode AutoLayout"
---
[Masonry](https://github.com/Masonry/Masonry) is a framework built on top of Auto Layout for constructing layouts for IOS/OSX. It comes with its own DSL. It's a boon for constructing layouts for devices of multiple sizes.

Take a look the following layout:

{{% figure src="images/masonry-demo1.PNG" style="width:50%" %}}

With Masonry, You'd do something like below to code the layout.

```
menuView = [[UIView alloc] initWithFrame:[MASUtil frame]];
[self.containerView addSubview:menuView];

[menuView makeConstraints:^(MASConstraintMaker *make) {
  make.edges.equalTo(self.containerView);
}];

FUIButton *startBtn = [FlatUIUtil makeSuccessBtn];
[startBtn setTitle:@"START" forState:UIControlStateNormal];
[startBtn addTarget:self action:@selector(onStartPressed:) forControlEvents:UIControlEventTouchUpInside];
[menuView addSubview:startBtn];

[startBtn makeConstraints:^(MASConstraintMaker *make) {
  [self makeBtnWidth:make];
  make.centerX.equalTo(self.childView.centerX);
  make.centerY.equalTo(self.childView.centerY).with.offset([MASUtil makeDim:-40]);
}];

FUIButton *exitBtn = [FlatUIUtil makeDangerBtn];
[exitBtn setTitle:@"QUIT" forState:UIControlStateNormal];
[exitBtn addTarget:self action:@selector(onQuitPressed:) forControlEvents:UIControlEventTouchUpInside];
[menuView addSubview:exitBtn];

[exitBtn makeConstraints:^(MASConstraintMaker *make) {
  [self makeBtnWidth:make];
  make.centerX.equalTo(self.childView.centerX);
  make.top.greaterThanOrEqualTo(startBtn.bottom).with.offset(offy);
}];
```
