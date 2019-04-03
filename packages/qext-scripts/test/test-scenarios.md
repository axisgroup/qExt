## Configuration

This section defines the configuration of the `qext.config.json` file

| Property        | Type   | Required | Default   | Description                                                          |
| --------------- | ------ | -------- | --------- | -------------------------------------------------------------------- |
| `extension`     | String | Yes      | -         | Name of deployed extension                                           |
| `output`        | String | Yes      | -         | Directory where built extension files are placed                     |
| `mode`          | String | Yes      | `vanilla` | Type of build. One of either `vanilla` or `compile`                  |
| `vanilla`       | Object | No       | `{}`      | Settings used for `"mode": "vanilla"`                                |
| `authenticate`  | String | No       | `none`    | Type of authentication. One of either `none`, `header`, or `windows` |
| `deploy`        | String | No       | -         | Deployment destination. One of either `desktop` or `server`          |
| `desktopConfig` | Object | No       | `{}`      | Settings used for `"deploy": "desktop"`                              |
| `serverConfig`  | Object | No       | `{}`      | Settings used for `"deploy": "server"`                               |
| `compile`       | Object | No       | `{}`      | Settings used for `"mode": "compile"`                                |

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

| Property   | Type   | Reqiured                  | Description                             |
| ---------- | ------ | ------------------------- | --------------------------------------- |
| `host`     | String | Yes                       | Directory location to deploy on desktop |
| `port`     | Number | No                        | Port number of endpoint                 |
| `isSecure` | Bool   | No                        | Connection should be over http or https |
| `hdr-usr`  | String | authenticate === "header" | Directory location to deploy on desktop |
| `prefix`   | String | No                        | Prefix for virtual proxy                |
