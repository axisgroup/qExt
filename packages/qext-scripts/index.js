import pack from './package.json'

const baseObj = {
  version: pack.version
}

const QextScripts = {
  baseObj
}

console.log(QextScripts)

export default QextScripts