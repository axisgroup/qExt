# Server Deployment

To deploy extensions to the server using qExt you need to define the `serverDeploy` property object

## Setting up serverDeploy

The main properties needed to define a server deployment are the host name, as well as the authentication mean. You can also set the `isSecure` property to true or false depending on whether connections should be made over https or http, and the `allowSelfSignedSignature` property can be set to true if the certificate on the server is self signed

```json
{
	"host": "172.16.84.100",
	"isSecure": true,
	"allowSelfSignedSignature": true
}
```

## Authentication

When deploying to a server, you will usually also need to authenticate against the server you are deploying to. there are 2 ways to do this with qExt: windows authentication and header authentication

## Windows authentication

To enable windows authentication, you need to set the `windowsAuth` property in qext config to true. when you run the deploy script, you will get an authentication prompt in the terminal, and the extension upload will be done over a session authorized by the authenticated user

## Header authentication

To enable header authentication, you need to set the `hdrAuthUser` to the directory and username that will be used to publish the extension. the `prefix` property should also be set to the virtual proxy prefix that is configured for header authentication, and `headerAuthName` can be set to the header name that is sent to the qlik server

```json
{
	"serverDeploy": {
		"host": "hostname",
		"isSecure": true,
		"allowSelfSignedSignature": true,
		"prefix": "hdr",
		"hdrAuthHeaderName": "hdr-usr",
		"hdrAuthUser": "directory\\username"
	}
}
```

For more details on setting up header authentication on the qlik server, check out the [Header Auth section](./header-auth.md)
