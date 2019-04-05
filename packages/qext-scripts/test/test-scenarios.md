## Configuration

This section defines the configuration of the `qext.config.json` file

| Property        | Type   | Required             | Description                                                                                              |
| --------------- | ------ | -------------------- | -------------------------------------------------------------------------------------------------------- |
| `extension`     | String | Yes                  | Name of deployed extension                                                                               |
| `output`        | String | Yes                  | Directory where built extension files are placed                                                         |
| `mode`          | String | Yes                  | Type of build. One of either `vanilla` or `compile`                                                      |
| `vanilla`       | Object | mode === "vanilla"   | Settings used for `"mode": "vanilla"`                                                                    |
| `deploy`        | String | No                   | Deployment destination. One of either `desktop` or `server`. Leave undefined if you don't wish to deploy |
| `desktopConfig` | Object | deploy === "desktop" | Settings used for `"deploy": "desktop"`                                                                  |
| `authenticate`  | String | deploy === "server"  | Type of authentication. One of either `header`, or `windows`                                             |
| `serverConfig`  | Object | deploy === "server"  | Settings used for `"deploy": "server"`                                                                   |
| `compile`       | Object | mode === "compile"   | Settings used for `"mode": "compile"`                                                                    |

</br>

### `vanilla`

| Property | Type   | Reqiured | Description                        |
| -------- | ------ | -------- | ---------------------------------- |
| `entry`  | String | Yes      | Entry file for webpack compilation |

</br>

### `desktopConfig`

| Property      | Type   | Reqiured | Description                             |
| ------------- | ------ | -------- | --------------------------------------- |
| `destination` | String | Yes      | Directory location to deploy on desktop |

</br>

### `serverConfig`

| Property                     | Type   | Reqiured                  | Description                                           |
| ---------------------------- | ------ | ------------------------- | ----------------------------------------------------- |
| `host`                       | String | Yes                       | Directory location to deploy on desktop               |
| `port`                       | Number | No                        | Port number of endpoint                               |
| `isSecure`                   | Bool   | No                        | Connection should be over http or https               |
| `allowSelfSignedCertificate` | Bool   | No                        | Allow rejectUnauthorized set to true in http requests |
| `hdr-usr`                    | String | authenticate === "header" | Directory location to deploy on desktop               |
| `prefix`                     | String | No                        | Prefix for virtual proxy                              |
