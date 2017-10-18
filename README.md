# qExt

Create a new Qlik Sense Extension project with ease.

---

### Initial Setup

What you'll need to use qExt
 * [Node.js](https://nodejs.org/en/) (version x.x.x or higher)
 * Qlik Sense Server configured with [Header Authentication](http://help.qlik.com/en-US/sense-developer/September2017/Subsystems/Platform/Content/Examples/config-header-authentication.htm)
 * Global installation of create-qext module
 
 `npm install -g create-qext`
 
 
 ### Creating a new project
 1. Open command line and go to the desired path where you would like the extension project to be built.
 2. Enter `create-qext my-extension` (replacing my-extension with the name of the extension you are building).
 3. After the extension project folder has been created, go into `my-extension/config/server.config.json` and update Qlik Sense host and user properties.
 4. Back in the command line type `cd my-extension` and hit enter
 5. Now type `npm start` and then enter.