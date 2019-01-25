import pack from './package.json'

import * as Components from './src/components/component-exports'

const baseObj = {
  version: pack.version
}

const QextScripts = Object.assign(baseObj, Components)

export default QextScripts