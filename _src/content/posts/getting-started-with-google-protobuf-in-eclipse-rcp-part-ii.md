---
title: "Getting Started with Google Protobuf - 2"
description: "Google Protobuf is a great framework for serializing and deserializing data for your applications. In this series of article, we'll look into setting up Google Protobuf as an Eclipse Plugin and later integrate protobuf in your RCP applications."
date: "2012-12-07"
categories:
    - "Google Protobuf"
    - "Eclipse"
    - "Java"
---
Before starting with this tutorial, you should ensure that you have WindowBuilder Pro installed from the following update site: [http://download.eclipse.org/windowbuilder/WB/release/R201206261200/4.2/][1] . This link is for Eclipse Juno/Kepler 4.2/4.3. If you are using an older version of Eclipse, you should see [here][2]  on how to install WindowBuilder for that version.


##  1. Install Protocol Buffer Editor and Set preferences ##


[protobuf-dt][3]  is an eclipse plugin for creating, editing and compiling messages in Google Protobuf. You can install protobuf-dt from here: [http://code.google.com/p/protobuf-dt/wiki/Installing][4] . After the installation is complete, you should set some preferences for protobuf-dt as shown in the image below. The configuration shown in the image is specific for Mac OsX. 


![][5]


## 2. Create an Eclipse RCP application with a form editor [Advanced] ##


This section is going to be a bit lengthy and advanced. Here, we create an Eclipse RCP application that has the following features:

 * Custom perspective
 * A Common Navigator View
 * A Form Editor for managing addresses i.e. An Address Book


In the project/package explorer right click and create a new **Plug-in Project** named **contacts-manager**. Continue pressing the **next** button until you reach the **Templates **page. Select **Hello RCP** template and press the **Finish **button. This will result in the **manifest** editor for the project to open automatically as shown in the image below. 


![][6]


In the top right of the image, I've annotated the **Run** button. If you press the **Run **button, you should see an empty application window with the title **Hello RCP. **Next, We will add the **Eclipse Common Navigator view** in the application. [Eclipse Common Navigator Framework][7]  allows you to create and manage projects/files in the workspace of your RCP application.


In the **Manifest editor,** click on the **Extensions **tab and **Add** the **org.eclipse.ui.navigator.viewer **as shown in the images below. Essentially, we are adding a view to our RCP. Therefore, the view id is important to note. The view id that I set is **contacts_manager.comnav. **We will use this view id later**.**


**![][8] ![][9] **


** **Now, we need to write some codes to make the CNF show up properly in the RCP application. Open up **ApplicationWorkbenchAdvisor.java** and add the following two methods to it:

```
@Override
  public void initialize(IWorkbenchConfigurer configurer) {
    super.initialize(configurer);
    IDE.registerAdapters();
  }

@Override
public IAdaptable getDefaultPageInput() {
	 IWorkspace workspace = ResourcesPlugin.getWorkspace();
	 return workspace.getRoot();
}
```

Next, open up **Perspective.java **and add the following code to **createInitialLayout** method.


`layout.addView("contacts_manager.comnav", IPageLayout.LEFT, 0.10f, layout.getEditorArea());`


The code above adds the common navigator view to the perspective of our RCP application. If you run the RCP application now, it should look similar to the image below.


![][10]


Next, we create an editor for managing simple contacts.


In the **Dependencies** tab of **manifest editor,** add **org.eclipse.ui.forms** as a dependency. Then, go to **Extensions** tab and add a new extension **org.eclipse.ui.editors** as shown in the images below. We'll be using **Multi-page Editor** template, so don't forget to select it as well.


![][11] ![][12]


The template creates two files: **ContactEditor.java **and **ContactEditorContributor.java**. Because we're creating an editor for managing simple contacts, we'll remove all the template code and start with our own. Remove all the template code from **ContactEditor.java** and use the following code as the starting point. You might as well delete **ContactEditorContributor.java** because we won't be using it. If you do so, don't forget to remove the corresponding reference to it in the manifest file.


```
public class ContactEditor extends FormEditor {

	@Override
	protected void addPages() {
	}

	@Override
	public void doSave(IProgressMonitor monitor) {
	}

	@Override
	public void doSaveAs() {
	}

	@Override
	public boolean isSaveAsAllowed() {
		return false;
	}

}
```
A **Form editor** is a collection of form pages. We'll create a form page using **Window Builder**. As shown in the images below, create a new form page called **ContactFormPage.java.**


![][13] ![][14]


Using the **Window Builder**, we will create a simple form like below:


![][15]


The following are the variable names for the text fields:** txtFirstName, txtMiddleName, txtLastName, txtMobile, ****txtHomepage, **and **btnSave. **We need to add this form page in the **ContactEditor.java** file. Update the **ContactEditor.java** file as below:

```
  public class ContactEditor extends FormEditor {

  	ContactFormPage cfp;

  	@Override
  	protected void addPages() {
  		try {
  			cfp = new ContactFormPage(this, "ContactFormPage", "Contacts");

  			addPage(cfp);
  		} catch (PartInitException e) {
  			e.printStackTrace();
  		}
  	}

  	@Override
  	protected void setInput(IEditorInput input) {
  		super.setInput(input);

  		setPartName("Simple Contact Editor");
  	}

  	@Override
  	public void doSave(IProgressMonitor monitor) {
  	}

  	@Override
  	public void doSaveAs() {
  	}

  	@Override
  	public boolean isSaveAsAllowed() {
  		return false;
  	}

  }
```

## Testing what we have so far ##


In the last section we covered a lot of information related to creating a RCP application with a common navigator; and a simple form editor. To test what we have so far, run the application and create a new project called **addresses.** In this project, create a new file called **supervisor.contact**. This is shown in image below.


![][16]


Click on the **Finish **button. You should now have the form editor open the contact file automatically as shown in the image below.


![][17] 


That's it for this part. In the [next and final part][18] , we will focus on how to persist the data for the **.contact **file using Google Protobuf.


  [1]: http://download.eclipse.org/windowbuilder/WB/release/R201206261200/4.2/
  [2]: https://developers.google.com/java-dev-tools/download-wbpro
  [3]: http://code.google.com/p/protobuf-dt/
  [4]: http://code.google.com/p/protobuf-dt/wiki/Installing
  [5]: images/25-img-001.png
  [6]: images/25-img-002.png
  [7]: http://wiki.eclipse.org/index.php/Common_Navigator_Framework
  [8]: images/25-img-003.png
  [9]: images/25-img-004.png
  [10]: images/25-img-005.png
  [11]: images/25-img-006.png
  [12]: images/25-img-007.png
  [13]: images/25-img-008.png
  [14]: images/25-img-009.png
  [15]: images/25-img-010.png
  [16]: images/25-img-011.png
  [17]: images/25-img-012.png
  [18]: index.php/blog/eclipse/27-getting-started-with-google-protobuf-in-eclipse-rcp-part-iii
