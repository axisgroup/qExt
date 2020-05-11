# qExt Config

| property      | description                                                                      | type                            | required                   |
| ------------- | -------------------------------------------------------------------------------- | ------------------------------- | -------------------------- |
| extension     | name of extension object                                                         | string                          | yes                        |
| output        | directory where output files will be placed                                      | string                          | yes                        |
| vanilla       | configuration of vanilla settings in running in vanilla mode                     | [vanilla](#vanilla)             | yes if compile not defined |
| compile       | configuration of compile settings in running in compile mode                     | [compile](#compile)             | yes if vanilla not defined |
| serverDeploy  | configuration of server deployment settings if deploying to server               | [serverDeploy](#serverDeploy)   | no                         |
| desktopDeploy | configuration of desktop deployment settings if deploying to desktop environment | [desktopDeploy](#desktopDeploy) | no                         |

## vanilla

| property | description                                    | type   | required |
| -------- | ---------------------------------------------- | ------ | -------- |
| entry    | source directory path to be copied into output | string | yes      |
| static   | static directory path to be copied into output | string | no       |

## compile

| property         | description                                                                                         | type   | required |
| ---------------- | --------------------------------------------------------------------------------------------------- | ------ | -------- |
| entry            | entry file path to build project from                                                               | string | yes      |
| qext             | qext file path to be copied into output directory                                                   | string | yes      |
| static           | static directory path to be copied into output                                                      | string | no       |
| webpackComments  | set to false to hide webpack compile comments when building                                         | bool   | no       |
| altWebpackConfig | path to alternate webpack.config.js file that should override the default webpack config definition | string | no       |

## serverDeploy

| property          | description                                                                                                     | type   | required |
| ----------------- | --------------------------------------------------------------------------------------------------------------- | ------ | -------- |
| host              | host name of qlik server                                                                                        | string | yes      |
| port              | port over which to access qlik server                                                                           | number | no       |
| prefix            | prefix endpoint where resources are deployed. typically used with header authentication                         | string | no       |
| isSecure          | whether endpoint should be connected to over ssl                                                                | bool   | no       |
| hdrAuthUser       | name of user as defined in the header authentication virtual proxy                                              | string | no       |
| hdrAuthHeaderName | name of auth header property as defined in virtual proxy                                                        | string | no       |
| windowsAuth       | set to true to use windows authentication to deploy extension                                                   | bool   | no       |
| user              | username associated with windowsAuth. if defined here, you will not be prompted for credentials in the terminal | string | no       |
| password          | password associated with windowsAuth. if defined here, you will not be prompted for credentials in the terminal | string | no       |

## desktopDeploy

| property    | description                           | type   | required |
| ----------- | ------------------------------------- | ------ | -------- |
| destination | destination of built extension files. | string | yes      |
