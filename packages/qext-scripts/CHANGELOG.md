# 0.5.0 (2018-04-30)

### Bug Fixes

* watch-webpack now re-builds when the `.qext` file is updated ([1](https://github.com/axisgroup/qExt/issues/1))

### Features

* added file-loader to webpack build to allow images (.png, .jpg, .gif, .svg) to be used by reference
* added `static` directory that is copied into the build for any resources that can't be loaded by reference