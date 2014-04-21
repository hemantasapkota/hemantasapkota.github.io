---
title: "Getting Started with Google Protobuf - 3"
description: "Google Protobuf is a great framework for serializing and deserializing data for your applications. In this series of article, we'll look into setting up Google Protobuf as an Eclipse Plugin and later integrate protobuf in your RCP applications."
date: "2012-12-06"
categories:
    - "Google Protobuf"
    - "Eclipse"
    - "Java"
---
## Creating a simple message in Google Protobuf - contact.proto  ##


We'll start off by creating the message or data format for our contact app. Create a new **protocol buffer descriptor file** using the **new wizard, **call it **contact.proto** and save it inside the **contactsmanager** package.


![][1]


The contents of the proto file is below. The message itself is very simple. That's because, our tutorial is very simple. 

```
package contactsmanager.proto; //The package where the compiled version of this object is saved
// The name of the message. It is important not to give the same name as the proto file name// i.e. the message name Contact would not compile. This issue can be avoided by using the java_outer_classname option
message PContact {        //the optional keyword indicates that the field may or may not be set. When parsing this message, if optional value is not set, then default value is used
	optional string firstName = 1;
	optional string middleName = 2;
	optional string lastName = 3;
	optional string mobile = 4;
	optional string homepage = 5;
}
```
Once you save the .proto file, the protobuf compiler compiles it automatically and creates the corresponding java file for reading/writing to the message in you project folder. The folder it creates it: *src-gen *You need to link up this folder as source folder so that when we use the PContact.java file, eclipse can include it automatically in the imports. Right click on the **contacts-manager** project that we are working on and link up the *src-gen* folder in **java build path.** This is illustrated below.


![][2]


## Wiring the code for saving/reading data to protobuf format ##


First thing we have to do is incude the **google-protobuf-2.4.1 **plugin in our **contacts-manager** rcp **dependencies list.**


![][3]


Next, open up **ContactFormPage.java** in **Window Builder **moder.** **Double click on the **save** button. The builder automatically creates a click handler and switches to code mode. In the code create a new method called *performSave()**.***** **Also, call the method *performSave() *inside the button event handler.

```
private void performSave() {
	String firstName = txtFirstName.getText().trim();
	String middleName = txtMiddleName.getText().trim();
	String lastName = txtLastName.getText().trim();
	String mobile = txtMobile.getText().trim();
	String homepage = txtHomePage.getText().trim();

         //the compiled java class has in-built builder for creating objects of the PContact class
        PContact contact = PContact.newBuilder().setFirstName(firstName)
				.setMiddleName(middleName).setLastName(lastName)
				.setMobile(mobile).setHomepage(homepage).build();

        //save the contents of contact (byte array) to file using eclipse resources api
	IFile file = ((FileEditorInput) getEditorInput()).getFile();
	ByteArrayInputStream baio = new ByteArrayInputStream(contact.toByteArray());
	try {
		file.setContents(baio, false, false, null);
	} catch (CoreException e) {
		e.printStackTrace();
	}
}
```
Now, we'll create another method that loads the data from the file. Create *loadContact() *and call the method inside **createFormContent()** method.

```
@Override
protected void createFormContent(IManagedForm managedForm) {
	FormToolkit toolkit = managedForm.getToolkit();
	ScrolledForm form = managedForm.getForm();
	form.setText("Simple Contact Manager");
	Composite body = form.getBody();
	toolkit.decorateFormHeading(form.getForm());
	toolkit.paintBordersFor(body);
        .
        .
        .
        loadContact();
}

private void loadContact() {
	IFile file = ((FileEditorInput) getEditorInput()).getFile();
	try {
		PContact contact = PContact.parseFrom(file.getContents());

		txtFirstName.setText(contact.getFirstName());
		txtMiddleName.setText(contact.getMiddleName());
		txtLastName.setText(contact.getLastName());

		txtMobile.setText(contact.getMobile());
		txtHomePage.setText(contact.getHomepage());

	} catch (IOException e) {
		e.printStackTrace();
	} catch (CoreException e) {
		e.printStackTrace();
	}
}
```
## Output ##







  [1]: images/27-img-001.png
  [2]: images/27-img-002.png
  [3]: images/27-img-003.png
