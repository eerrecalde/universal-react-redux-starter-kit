import fs from 'fs-extra'
import _debug from 'debug'
import webpackCompiler from './webpack-compiler'
import webpackConfigClient from './webpack.config.client'
import webpackConfigServer from './webpack.config.server'
import config from '../config'
import path from 'path'

const debug = _debug('app:bin:compile')
const clientInfo = path.join(config.paths.dist, 'client_info.json')

;(async function () {
  try {
    let stats

    debug('Run compiler for client')
    stats = await webpackCompiler(webpackConfigClient)
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      debug('Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }

    debug('Write client info')
    let {hash, version, assetsByChunkName} = stats
    await writeClientInfo({hash, version, assetsByChunkName})

    if (config.universal && config.universal.enabled) {
      debug('Run compiler for server')
      stats = await webpackCompiler(webpackConfigServer)
      if (stats.warnings.length && config.compiler_fail_on_warning) {
        debug('Config set to fail on warning, exiting with status code "1".')
        process.exit(1)
      }
    }

    debug('Copy static assets to dist folder.')
    fs.copySync(path.join(config.paths.src, 'static'), config.paths.public)
  } catch (e) {
    debug('Compiler encountered an error.', e)
    process.exit(1)
  }
})()

function writeClientInfo (data) {
  return new Promise((resolve, reject) => {
    fs.writeJson(clientInfo, data, function (err) {
      if (err) {
        reject(err)
      }
      resolve(true)
    })
  })
}
