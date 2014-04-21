---
title: "Tutorial - Simple Personal Information Manager (PIM) for iPhone"
description: "In this tutorial, we will create a simple personal information manager for iPhone/iPod touch platform using XCode 4.3.2 with Automatic Reference Counting and Storyboards."
date: "2012-12-13"
categories:
    - "Tutorials"
    - "IOS"
---

Simple Personal Information Manager (PIM) is a basic app for iphone/ipod touch for managing personal information like email a/c, registration numbers, bank a/c. This is a one-stop app for conveniently looking up personal info when needed. Before we begin the tutorial, let's check out the output of this tutorial. The video shows what we intend to create during this tutorial.


## Creating the project ##


I'll be using Xcode 4.3.2 and testing the app in iPhone 3GS. Without further delays, create a new **XCode Project** and select **Single View** application for the **iPhone **platform. Select **Automatic Reference Counting **and **Use Storyboards**.


 ![][1]


## Setting up Navigation Controller and Root View Controller ##


At this point, if you click on **MainStoryboard.storyboard** you should see a single view. Remove this view and drag a **Navigation Controller** from the right, as shown in the image below.


![][2]


In the image above we have a **Navigation controller** linked up to a **Root View Controller **titled **Simple PIM. **You can change the title of the root view controller from the attributes inspector on the right. As of now, our root view controller is actually a **Table View Controller**. We will remove this and add a simple **View Controller **as a root view controller. So remove the **Table View Controller** by deleting it and drag a **View Controller **from the right. Once you have dragged it, you need to set this new view controller as the root view. So right click on the **Navigation Controller **and drag the click on to the view controller, as shown in the image below. Select **Relationship - Root View Controller. **This action sets up the newly created view controller as the root view of the navigation controller.


![][3] ![][4]


Now click on the top navigation bar of the view controller and change the title to **Simple PIM**.


## UI Design ##


For the purpose of this tutorial, our root view will have only two buttons called **Bank A/C** and **Gmail ID**. In order to make the buttons look pretty, i have provided two gradient images for button. You can use them as background image to the buttons. Download and drag them to your project in XCode. For more information on how you can create such images, see [https://github.com/dermdaly/ButtonMaker][5]


![][6] ![][7]


Drag two **Round Rect** **Button** and align them at the center. Change the type of the buttons to **Custom;** set the background image to **blue **and **green** respectively. Change the **Text Color**** **to **White** and name the buttons: **Bank A/C** and **Gmail ID.** This is illustrated below.


![][8]  


One final thing to do here, is to map this view controller to a **UIViewController** class. Create a new class that extends from **UIViewController **and name it **SimplePimViewController**. In the storyboard, select the above view controller and in the **custom class** section of **identity inspector** on the right, give the name **CSimpleViewController. **This is illustrated below:


![][9]


## Wiring the code for the Buttons ##


The idea is this: When we click a button, **a table view** should show up listing all the information. We will save all the information in a **PLIST** files. The files will reside inside the application. This approach is not safe for storing sensitive information but for the purpose of this tutorial, it should be okay. So when a button is clicked, the table view controller will load the corresponding **PLIST** file. 


Create two **PLIST** files named: **netbank.plist** and **gmail.plist** with the following contents:


![][10]


![][11]


Now let's create a table view controller by dragging it from the right. After that, create a new Objective-C class called **PListTableViewController** and make sure it's base class is **UITableViewController**. We will map the newly dragged table view controller to this class. Similar to what we've done above, in the** custom class** section of **identity inspector** on the right, put the name **CPListTableViewController. **The following is the description of what the two classes are supposed to do.


CSimplePimViewControllerHandles the button touched eventsCPListTableViewControllerLoads the data from the PLIST files and displays in table view
In **CSimplePimViewController** we create the two methods as shown below.

```
#import <UIKit/UIKit.h>

@interface CSimplePimViewControllerViewController : UIViewController

-(IBAction)onBankAcClicked:(id)sender;
-(IBAction)onGmailIdClicked:(id)sender;

@end

The initial implementation method looks something like this:


- (IBAction)onBankAcClicked:(id)sender {
    CPListTableViewController *cPimController = [CPListTableViewController new];
    [cPimController setTitle:@"Bank A/C"];
    [self.navigationController pushViewController:cPimController animated:true];
}

- (IBAction)onGmailIdClicked:(id)sender {
    CPListTableViewController *cPimController = [CPListTableViewController new];
    [cPimController setTitle:@"Gmail ID"];
    [self.navigationController pushViewController:cPimController animated:true];
}
```

The code just instantiates a new object of CPListTableViewController and pushes it to the **navigation controller**.


One last important thing remaining now is to map the buttons to the **IBAction** in the code. Right click on each button, drag it and map it to the corresponding IBActon as illustrated below. Do the same for each of the buttons.


![][12] ![][13]


## Testing what we have so far ##


If you've followed all the steps so far, the output you have should resemble what i have in the following video.





## Logic Time - Writing the code for CPListTableViewController ##


By now, we have the structure and wiring for our application. All we need is the code that loads up the PLIST file and displays it. Firstly, the interface file looks like this:

```
  @interface CPListTableViewController : UITableViewController

  //we init this class via this method. In the input, we provide the PLIST filename without
  //the extension
  - (id) initWithDataFile:(NSString*)dataFile;

  @end

  NSDictionary *contentsMap; //the contents of the PLIST file is stored as a map with key/value pairs
  NSString *dataFile; //reference to the filename

  NSArray *sections; //all the keys in the PLIST files are treated as sections in the table view controller
```

The implementation is a bit long, so we'll go through them one by one. First of all, we'll write the code for **initWithDataFile** method

```
- (id) initWithDataFile:(NSString*)_dataFile {
	self = [super init];
	if (self == nil)
	    return nil;

	dataFile = _dataFile;

	NSString *dataPath = [[NSBundle mainBundle] pathForResource:dataFile ofType:@"plist"];
	contentsMap = [[NSDictionary alloc] initWithContentsOfFile:dataPath];
        sections = [[NSArray alloc] initWithArray:[contentsMap allKeys]];

	return self;
}
```

What we did here was to create an internal path for PLIST file. Then, create a **NSDictionary** using the method **initWithContentsOfFile **which holds all the data from the PLIST file. Finally, we create an array called **sections** in which we put all the keys of the PLIST file. The reason why we're storing all the keys is because we want to use each of the keys as section header in our table view. Next, we write code that display data for the table view.

```
#pragma mark Table

// Each KEY in the PLIST file is a Section Header
- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
    return [sections objectAtIndex:section];
}

// Customize the number of sections in the table view.
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
	return [sections count];
}

// Customize the number of rows in a section
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    // no. of rows and no. of sections are the same
    return 1;
}

//Code for each cell row
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
     NSString *cellId = @"Cell";

     UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellId];
     if (cell == nil) {
	cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellId];
     }

    NSString *key = [sections objectAtIndex:indexPath.section];
    NSString *value = [contentsMap valueForKey:key];

    cell.textLabel.font = [UIFont fontWithName:@"Helvetica" size:13.0f];

    //Check if this row is a password field
    bool isPassword = [key isEqualToString:@"Password"];
    bool isPin = [key rangeOfString:@"pin" options:NSCaseInsensitiveSearch].location != NSNotFound;

    if (isPassword || isPin) {
        cell.textLabel.text = @"**********"; //hide the cell text from plain view
        cell.userInteractionEnabled = YES;
    } else {
        cell.textLabel.text = value;
        cell.userInteractionEnabled = NO;
    }

	return cell;
}

//Selection for cell row
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    NSString *key = [sections objectAtIndex:indexPath.section];
    NSString *value = [contentsMap valueForKey:key];

    //
    UIAlertView *alertView = [[UIAlertView alloc]
                              initWithTitle:@"Password"
                              message:value
                              delegate:nil
                              cancelButtonTitle:@"OK"
                              otherButtonTitles:nil,
                              nil];
    [alertView show];

    [tableView deselectRowAtIndexPath:indexPath animated:YES];
}
```

## Finalizing bits & pieces ##


By now, we have application structure i.e. navigation controller, UI design i.e. two buttons, the PLIST display controller and the logic for wiring all of them up. One final thing to do here is to go back and change some of the codes in CSimplePimViewController. When a button is clicked, for ex: Bank A/C, the corresponding PLIST file should be loaded and displayed. The logic for this is already written in **initWithDataFile** method. Therefore, all we have to do is call the method.

```
- (IBAction)onBankAcClicked:(id)sender {
    CPListTableViewController *cPimController = [[CPListTableViewController new] initWithDataFile:@"netbank"];
    [cPimController setTitle:@"Bank A/C"];
    [self.navigationController pushViewController:cPimController animated:true];
}

- (IBAction)onGmailIdClicked:(id)sender {
    CPListTableViewController *cPimController = [[CPListTableViewController new] initWithDataFile:@"gmail"];
    [cPimController setTitle:@"Gmail ID"];
    [self.navigationController pushViewController:cPimController animated:true];
}
```

That's it for this tutorial. Thank you for your time.


  [1]: images/26-img-001.png
  [2]: images/26-img-002.png
  [3]: images/26-img-003.png
  [4]: images/26-img-004.png
  [5]: https://github.com/dermdaly/ButtonMaker
  [6]: images/26-blue6_button.png
  [7]: images/26-green8_button.png
  [8]: images/26-img-005.png
  [9]: images/26-img-008.png
  [10]: images/26-img-006.png
  [11]: images/26-img-007.png
  [12]: images/26-img-009.png
  [13]: images/26-img-010.png
