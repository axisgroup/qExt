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

| Property | Type   | Reqiured | Default | Description                        |
| -------- | ------ | -------- | ------- | ---------------------------------- |
| `entry`  | String | Required | Yes     | Entry file for webpack compilation |

</br>

### `desktopConfig`

| Property      | Type   | Reqiured | Default | Description                             |
| ------------- | ------ | -------- | ------- | --------------------------------------- |
| `destination` | String | Required | Yes     | Directory location to deploy on desktop |
