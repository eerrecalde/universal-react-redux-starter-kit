/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path'
import _debug from 'debug'
import { argv } from 'yargs'
import ip from 'ip'

const localip = ip.address()
const debug = _debug('app:config')
debug('Creating default configuration.')

// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_src: 'src',
  dir_dist: 'dist',
  dir_public: 'dist/public',
  dir_server: 'server',
  dir_test: 'tests',

  paths: {
    base: path.join(__dirname, '..'),
    src: path.join(__dirname, '..', 'src'),
    dist: path.join(__dirname, '..', 'dist'),
    public: path.join(__dirname, '..', 'dist/public')
  },

  // ----------------------------------
  // Entry points
  // ----------------------------------
  entry_client: 'client.js',
  entry_server: 'server.js',

  // ----------------------------------
  // App mount point config
  // ----------------------------------
  app_mount_point: {
    id: 'root',
    style: {height: '100%'}
  },

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: process.env.HOST || localip,
  server_port: process.env.PORT || 3000,
  universal: {
    enabled: true,
    output: 'server.js',
    client_info: 'client_info.json'
  },

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendor: [
    'alertify-js',
    'babel-polyfill',
    'history',
    'react',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux'
  ]
}

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development' && !argv.no_debug,
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendor = config.compiler_vendor
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    )
  })

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)

// Environment specific options!!
const environments = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  // NOTE: In development, we use an explicit public path when the assets
  // are served webpack by to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  development: (config) => ({
    compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
    proxy: {
      enabled: false,
      options: {
        host: 'http://localhost:8000',
        match: /^\/api\/.*/
      }
    }
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: (config) => ({
    compiler_public_path: '/',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    compiler_devtool: null,
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  })
}
const overrides = environments[config.env]
if (overrides) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

export default config
