# qExt

Create new Qlik Sense Extension projects with ease.

---

### Initial Setup

What you'll need to use qExt
* [Node.js](https://nodejs.org/en/)
* [Qlik Sense Server configured with Header Authentication](http://help.qlik.com/en-US/sense-developer/September2017/Subsystems/Platform/Content/Examples/config-header-authentication.htm)
* Global installation of qext module

`npm install -g qext`
 
### Creating a new project
1. Run `qext --create-extension [name]` to create new extension project directory.
2. Change directory to the project that was just created.
3. Run `npm install` to install the `qext-scripts` package.
4. Configure the `server.config.json` file to the appropriate host and user.
5. Run `npm start` to start listening to changes within your src directory.