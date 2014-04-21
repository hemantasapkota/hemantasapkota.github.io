---
title: "Tutorial - Creating Gmail/Facebook like Menu Navigation in IOS"
description: "Creating tabbed navigation structures in iPhone/IOS apps are pretty straightforward and boring. They are useful when you don't have a lot of pages to navigate. Apps like Gmail and Facebook, that have a large number of menu items, take it to next level by creating cool auto sliding views that toggle the menu navigation structure. In this tutorial, we'll try to create something similar."
date: "2013-01-27"
categories:
    - "Tutorials"
    - "IOS"
---


The following video shows the output of this tutorial.

{{% youtube R-6IiymHyqk %}}


Create a new **Single View Application** with **Storyboards **and **Automatic Reference Counting.** I've named the project **TablessNavigationTemplate.**


## Designing the UI - Setting up Root View Controller ##


Drag and Drop a **Navigation Controller **onto the storyboard.** **When the navigation controller is dropped, Xcode automatically adds a **UITableViewController** as a **Root View Controller. **We're going to use this root view controller as it is and add a couple of static cells onto it.


Select the root view controller and change the **content** type of the table to **Static Cells. **


![][1]


Double click **navigation bar** and change the text to **Inbox (268). **Drag and drop two **bar button items **on to the navigation bar. One button on the left. One button on the right. Set **|||** as the text for the left button. For the button on the right, change its **identifier **to **Search, **from the inspector. The navigation bar should look something like this.


![][2]


Now we're going to create a couple of static cells. You can use your imagination here by dropping labels and button on it. The content of it is not very important. The static cells i designed look like this:


![][3]


** **The navigation and root view controller should look like this:


![][4]


## UI Design - Setting up App Navigation View ##


Next, we drag another **View Controller**. This view controller will be toggled on/off. The toggling is controlled by the ||| button on the navigation bar. Drag a **Search ****Bar **and a **Table View **onto this view controller. From the Size inspector on the right, limit the width of both the search bar and the table view to **250px.** The following image should clarify this.


![][5]


Now assign the **data source **and **delegate **for the table view by right clicking on it and dragging the line at the bottom. The following image should clarify this.


![][6] ![][7]


At this point, we create an Objective-C class corresponding to this view controller. We'll call this **CNavViewController. **In the **Identity Inspector,** we change the class type of the view controller to **CNavViewController.** We also set the **Storyboard Id to **"*navigationView".*


*![][8] *


The interface definition (CNavViewController.h) looks like this:

```
#import <UIKit/UIKit.h>

@interface CNavViewController : UIViewController<UITableViewDataSource, UITableViewDelegate>

@property NSArray *navItems;            //contains the list of items to display in the table
@property IBOutlet UITableView *navTableView; //the outlet for our table in the view controller.

@end
```

Notice the IBOutlet navTableView. We need to link up this outlet in the view controller. At the bottom of our CNavViewController in Storyboard, you should see a panel of icons. From the first icon, right click and drag a line onto the view controller. Xcode lists up the outlet that we just created i.e. **navTableView**. We select the navTableView outlet. The following images should clarify this.


![][9] ![][10]


In Summary, what we did was, to create a **Navigation View Controller **with a **Table View Controller ** as its root view. We also created a custom **View Controller** that has a **Search Bar ** and a **UITableView. **The final UI structure looks like this.


 ![][11]


Before we go ahead in the next section to wire up the logic, for preparation, we need to give class names to each of the ui controllers above. We've already done this for our custom view controller i.e. CNavViewController. Set the class names **CNavigationViewController **and **CRootViewController **respectively in the **identity inspector、**referencing the image above.


## Wiring the Classes and Logic - CNavViewController ##


Let's continue implementing CNavViewController. 

```
- (void)viewDidLoad
{
    [super viewDidLoad];

    navItems = [NSArray arrayWithObjects:@"Inbox", @"* Important and unread", @"* Starred", @"* Everything", @"Sent Mail", @"Drafts", @"Spam" ,nil];
}
- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
    return @"";
}

- (NSString *)tableView:(UITableView *)tableView titleForFooterInSection:(NSInteger)section {
    return @" ";
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return navItems.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];

    if (cell == nil) {
		cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:CellIdentifier];
	}

    // Configure the cell...
    cell.textLabel.font = [UIFont fontWithName:@"Sans Serif" size:12];
    cell.textLabel.textColor = [UIColor whiteColor];
    cell.textLabel.backgroundColor = [UIColor clearColor];

    cell.textLabel.text = [navItems objectAtIndex:indexPath.row];

    return cell;
}
```

The above piece of code is responsible for loading data in the table view. The data is stored in NSArray in the class. The following would be the output for the code.


![][12]


## Wiring the Classes and Logic - CNavigationViewController ##


Create a class called CNavigationViewController which extends from UINavigationController. The purpose of this class is to manage the orientation for the app. To make matters simple for this tutorial, the app only supports **Portrait **orientation. We need to set that explicitly in the code.

```
- (BOOL)shouldAutorotate {
    return NO;
}

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationPortrait;
}
```
## Wiring the Classes and Logic - CRootViewController ##


Create a class called CRootViewController which extends from UITableViewController. The CRootViewController is the meat of the app. It contains the logic to animate the navigation controller and vice versa. So I'll go through it in detail. The interface definition file (CRootViewController.h) looks like this:

```
#import <UIKit/UIKit.h>;

@interface CRootViewController : UITableViewController

@property (strong) UIViewController *viewC;
 (IBAction)showNavigation:(id)sender;

@end
```

The implementation (CRootViewController.m) looks like this:


```
#import "CRootViewController.h"

@interface CRootViewController ()

@end

@class CNavViewController;

@implementation CRootViewController

@synthesize viewC;

    enum TranslateDirection {
        LEFT, RIGHT
    };

    const float TRANSLATE_CONST = 250;
    float translateX = TRANSLATE_CONST;
    enum TranslateDirection td = RIGHT;

- (IBAction)showNavigation:(id)sender {

    [UIView animateWithDuration:0.5f

            delay:0.0

            options:UIViewAnimationCurveLinear

            animations:^{
                if (td == LEFT) {
                    translateX = 0;
                } else if (td == RIGHT) {
                    translateX = TRANSLATE_CONST;
                }

                CGAffineTransform trans = CGAffineTransformMakeTranslation(translateX, 0);

                self.navigationController.view.transform = trans;

            }

            completion:^(BOOL finished){

                if (td == LEFT) {
                    td = RIGHT;
                } else if (td == RIGHT) {
                    td = LEFT;
                }

            }
     ];
}


- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.

    viewC = [self.storyboard instantiateViewControllerWithIdentifier:@"navigationView"];
    [self.navigationController.view.window insertSubview:viewC.view atIndex:0];

}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
@end
```

In the **showNavigation** method, we're using IOS Blocks to slide our navigation controller to the right. For this we construct an affine transformation that transforms the navigation controller by 250px to the right. We do a little plumbing to toggle the direction of translation i.e. right to left or left to right. 


In the **viewDidLoad **method, we instantiate a view controller that has the storyboard id "*navigationView". *This is the **CNavViewController** view. And the most important thing is, we place this view controller at index 0 inside the app window. This means, this view resides just below the **navigation controller **which in turn means, when the navigation controller is translated to the right, the **CNavViewController** residing at the bottom shows up.


In the final step, we link up the **showNavigation **outlet method to the ||| button on the top left corner of the navigation bar. To do this, right click on the button and drag it below to the first icon on the panel and select the outlet: ***showNavigation*****.**


That's it for the tutorial. Thank you for your time.


## Source Code  ##


The full source code to this tutorial is at [https://github.com/hemantasapkota/TablessNavigationTemplate][13]



  [1]: images/28-img-001.png
  [2]: images/28-img-002.png
  [3]: images/28-img-003.png
  [4]: images/28-img-004.png
  [5]: images/28-img-005.png
  [6]: images/28-img-006.png
  [7]: images/28-img-007.png
  [8]: images/28-img-008.png
  [9]: images/28-img-009.png
  [10]: images/28-img-010.png
  [11]: images/28-img-011.png
  [12]: images/29-img-012.png
  [13]: https://github.com/hemantasapkota/TablessNavigationTemplate
