# qExt

`qExt` is a tool that allows you to quickly and easily spin up Qlik Sense Extension projects and deploy them to a server environment

---

## Why?
I have Qlik Sense Server installed within a VM on my machine, but wanted to be able to develop outside of the VM. I also wanted to be able to automate the process of zipping up an extension, deleting the old extension, and importing the new extension.


## Initial Setup
qExt makes use of the Qlik Sense QRS APIs. In order to delete and post extensions to the server from your local machine, you will need to set up a Virtual Proxy in Qlik Sense Server with Header Authentication to allow these actions to be taken. For steps on setting this up, check out the **Setup Virtual Proxy with Header Authentication** section of [this article] ().


## Installation

`npm install -g qext`


## Usage

### Server
1. Run `qext --create-extension [name] --install` to create a new extension project in your working directory and install all dependencies
2. Once installation completes, change your working directory to the project directory that was just created
3. Update `server.host` property value to the hostname of your Sense Server and the `server.headers.hdr-usr` property value to the domain and username of a Qlik Sense admin account
4. Run `npm run watch-webpack-deploy-server` to start watching and deploying your source files every time an edit is made


### Desktop
The same functionality of qExt can be used in a Qlik Sense Desktop environment. All we need to do is point the deployment location to the Qlik Sense Extensions folder. To do this, repeat steps 1 & 2 above in the Server Usage section. Then:

1. Update `desktop.destination` by replacing `%username%` in the path with the username associated with your machine
2. Run `npm run watch-webpack-deploy-desktop` to start watching and deploying your source files every time an edit is made


## Scripts
In the **Usage** section above, we saw 2 examples of npm scripts that can be run in your Extension development environment. Here is a full list of all scripts that can be run

1. `build-webpack` will bundle your code using Webpack and Babel allowing you to use ES6 in your extension source. It will also zip up the bundled files.

2. `watch-webpack` will watch your `src` directory and bundle and zip your code anytime a change is made.

3. `build-vanilla` will not bundle your code, but instead will zip up all source files as they are in the source.

4. `watch-vanilla` will watch your `src` directory and zip up all source files anytime a change is made.

5. `deploy-server` will deploy the zipped up extension file from the `dist` directory to the Qlik Sense Server.

6. `deploy-desktop` will deploy the zipped up extension file from the `dist` directory to the Qlik Sense Desktop extensions directory location.

7. `build-webpack-deploy-server` will bundle your code as in step #1 and then will deploy the resulting zip file to the server.

8. `watch-webpack-deploy-server` will watch and bundle your code as in step #2 and will deploy the resulting zip file to the server any time a change is made.

9. `build-webpack-deploy-desktop` will bundle your code as in step #1 and then will deploy the resulting zip file to the desktop.

10. `watch-webpack-deploy-desktop` will watch and bundle your code as in step #2 and will deploy the resulting zip file to the desktop any time a change is made.

11. `build-vanilla-deploy-server` will zip your code as in step #3 and then will deploy the resulting zip file to the server.

12. `watch-vanilla-deploy-server` will watch and zip your code as in step #4 and will deploy the resulting zip file to the server any time a change is made.

13. `build-vanilla-deploy-desktop` will zip your code as in step #3 and then will deploy the resulting zip file to the desktop.

14. `watch-vanilla-deploy-desktop` will watch and zip your code as in step #4 and will deploy the resulting zip file to the desktop any time a change is made.