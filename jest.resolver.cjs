/* eslint-disable import/no-commonjs */
const nativeModule = require('node:module')

function resolver(module, options) {
  const { basedir, defaultResolver } = options
  try {
    return defaultResolver(module, options)
  } catch {
    return nativeModule.createRequire(basedir).resolve(module)
  }
}

module.exports = resolver