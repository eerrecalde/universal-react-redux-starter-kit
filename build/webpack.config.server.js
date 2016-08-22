import webpackConfig from './webpack.config'
import clone from 'clone'
import config from '../config/defaults'
import _debug from 'debug'
import fs from 'fs'
import path from 'path'

const debug = _debug('app:webpack:config')

debug('Create server configuration.')
const webpackConfigServer = clone(webpackConfig)

webpackConfigServer.name = 'server'
webpackConfigServer.target = 'node'
webpackConfigServer.externals = fs.readdirSync(path.join(config.paths.base, 'node_modules'))
  .concat([
    'react-dom/server', 'react/addons'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {})

// ------------------------------------
// Entry Points
// ------------------------------------
webpackConfigServer.entry = [
  'babel-polyfill',
  path.join(config.paths.src, config.entry_server)
]

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfigServer.output = {
  filename: 'server.js',
  path: config.paths.dist,
  library: 'server',
  libraryTarget: 'umd',
  umdNamedDefine: true
}

export default webpackConfigServer
