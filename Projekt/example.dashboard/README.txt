Getting Started
===============

Importing the App into the App Editor
-------------------------------------
1. Click "File" -> "Import..."
2. Choose "General" -> "Existing Projects into Workspace" and click on "Next"
3. Select the folder in which you found this README file as the root directory
4. "example.dashboard" will be visible in "Projects". Make sure it is selected
   and click on "Finish"
5. In the main menu, click on "SmartDesign" -> "Import App SDK from SmartDesign"
6. Enter the connection details for your SmartDesign instance and click "Finish"


For now it is required to do further steps in order to add the SmartDesign SDK
to the project's build path (this will not be required in the future):

7. Right click on project "example.dashboard" -> "Build Path" -> "Configure Build Path ... "
8. Switch to the "Libraries" tab, select "SmartDesign SDK Library" and click "Remove"
9. Click "Apply and Close", then repeat step 7
10. In the "Libraries" tab, click on "Add Library"
11. Select "SmartDesign SDK Library" -> Next -> "Use external SmartDesign SDK"
    and leave the installation directory as is (i.e. "/GlobalAppResources/appsdk/")
12. Click on "Finish" -> "Apply and Close"

After a few seconds, the import should be completed and any errors gone.


Exporting and changing the app in the development phase
-------------------------------------------------------

Switching to the "web" folder, you will see that we use a nowadays fairly common software
stack for this web app example: npm, webpack and TypeScript. We assume you have heard of these
technologies and have a recent version of npm installed on your system.

1. Open a terminal and "cd" into the "web" folder.
2. Run "npm install"
3. Run "npm run dev"

After that, a  webserver will be listening on http://localhost:8082 and serving the web app.

Now, export the example.dashboard app from within the App Editor to SmartDesign:

1. Main menu: "SmartDesign" -> "Export Apps"
2. Enter connection details and click "Next"
3. Select "example.dashboard" and click "Finish"

When you now login again, you should see the new "Example Dashboard" app.
Any changes you make will result in the web app being recompiled automatically
and the browser is refreshed.

Now, the only thing that is left is to adjust the origin for connecting to the Web API:
Open the file "index.ts" and change the URL parameter of the "connect()" call to your
installation, e.g. "http://crm.company.org".


Exporting and hosting the app in SmartDesign for production
-----------------------------------------------------------

When you're happy with your changes, you can package and upload an optimized version of the web app:

1. In file "index.ts", remove the optional origin parameter from the connect() call
2. In the "web" directory, run "npm run build". This step places the files "index.html" and "index.js"
   into webcontent folder.
3. In the App Editor, change the "url" property in file "HTMLPage.from" from `\'http://localhost:8082\'` to `\'index.html'`
4. Export the app to SmartDesign one more time (see above)
