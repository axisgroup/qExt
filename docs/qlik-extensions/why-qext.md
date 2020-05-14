# Why qExt?

The qExt library was created for 3 main reasons

1. provide better support for **next-generation javascript** compilation
2. streamline the **deployment** process of extensions to qlik sense environments
3. make initializing new extension projects more repeatable with **boiler-plate code templates**

## Next-gen javascript

the script you saw in the prior page (and the javascript you'll see in many qlik extensions) is written in vanilla javascript, which typically can be used as is in most modern web browsers. this is a great start for many getting their feet wet with javascript, but many developers want to leverage newer versions and capabilities of javascript, including module imports, arrow functions and more

there are many tools that help with converting newer javascript code into formats that are backwards compatible. qExt uses babel in coordination with webpack to compile all code into a format that can be used by modern browsers

## Streamline deployment

the last section mentioned the deployment process for extensions in our qlik environments. if you're doing serious development work on a project, the manual solution of deleting and re-importing project code everytime a change is made probably isn't suitable. that's why we built deployment integration into qExt. the tool can make a direct connection with your qlik server and automatically delete the old extension and deploy the updated one in seconds using the qrs api

## Templates

the sample code from the prior page used only 1 of many methods available in qlik extensions. typically when developing extensions, we use other objects and methods such as initialProperties, template, controller and more to fully leverage the settings of our extensions. we find that a lot of these are used quite often across projects, and instead of re-defining them every time we build a new extension, we defined them in template projects that can be used to spawn new extension projects from
