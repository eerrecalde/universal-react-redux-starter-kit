import React from 'react'
import { match } from 'react-router'
import { renderToStaticMarkup } from 'react-dom/server'
import { syncHistoryWithStore } from 'react-router-redux'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import { getStyles } from 'simple-universal-style-loader'
import Helmet from 'react-helmet'
import configureStore from './store/configureStore'
import { loadCounter } from './actions/counterActions'
import {loadCourses} from './actions/courseActions'
import {loadAuthors} from './actions/authorActions'
import Index from './index'
import _debug from 'debug'
import * as Assetic from './modules/Assetic'
import defaultLayout from '../config/defaultLayout'
import { renderHtmlLayout } from 'helmet-webpack-plugin'
import config from '../config'
import routes from './routes'

const debug = _debug('app:server:universal:render')

export default getClientInfo => {
  return async function (ctx, next) {
    const initialState = {}
    const memoryHistory = createMemoryHistory(ctx.req.url)
    const store = configureStore(initialState, memoryHistory)
    const history = syncHistoryWithStore(memoryHistory, store, {
      selectLocationState: (state) => state.router
    })

    store.dispatch(loadCounter())
    store.dispatch(loadCourses())
    store.dispatch(loadAuthors())

    console.log('SERVER INIT!!!')

    match({history, routes, location: ctx.req.url}, async (err, redirect, props) => {
      debug('Handle route', ctx.req.url)

      let head, content
      let {app, vendor} = getClientInfo().assetsByChunkName
      let links = Assetic
        .getStyles(([vendor, app]))
        .map(asset => ({
          rel: 'stylesheet',
          href: `${asset}`
        }))

      // This will be transferred to the client side in __LAYOUT__ variable
      // when universal is enabled we need to make sure the client to know about the chunk styles
      let layoutWithLinks = {
        ...defaultLayout,
        link: links
      }

      // React-helmet will overwrite the layout once the client start running so that
      // we don't have to remove our unused styles generated on server side
      let layout = {
        ...layoutWithLinks,
        style: getStyles().map(style => ({
          cssText: style.parts.map(part => `${part.css}\n`).join('\n')
        })),
        script: [
          ...defaultLayout.script,
          {type: 'text/javascript', innerHTML: `___INITIAL_STATE__ = ${JSON.stringify(store.getState())}`},
          {type: 'text/javascript', innerHTML: `___LAYOUT__ = ${JSON.stringify(layoutWithLinks)}`}
        ]
      }

      // ----------------------------------
      // Internal server error
      // ----------------------------------
      if (err) {
        content = renderToStaticMarkup(
          <div>
            <Helmet {...{...layout, title: '500 - Internal server error'}} />
            <h3>Error 500</h3>
            <div>{'An error occurred:' + err}</div>
          </div>
        )
        head = Helmet.rewind()
        ctx.status = 500
        ctx.body = renderHtmlLayout(head, content)
        return
      }

      // ----------------------------------
      // No route matched
      // This should never happen if the router has a '*' route defined
      // ----------------------------------
      if (typeof err === 'undefined' && typeof redirect === 'undefined' && typeof props === 'undefined') {
        debug('No route found.')

        // We could call our next middleware maybe
        // await next()
        // return

        // Or display a 404 page
        content = renderToStaticMarkup(
          <div>
            <Helmet {...{...layout, title: '404 - Page not found'}} />
            <h3>Error 404</h3>
            <div>404 - Page not found</div>
          </div>
        )
        head = Helmet.rewind()
        ctx.status = 404
        ctx.body = renderHtmlLayout(head, content)
        return
      }

      // ----------------------------------
      // Everything went fine so far
      // ----------------------------------
      let scripts = Assetic
        .getScripts(([vendor, app]))
        .map((asset, i) => <script key={i} type='text/javascript' src={`${asset}`}></script>)
      content = renderToStaticMarkup(
        <Index
          history={history}
          routerKey={Math.random()}
          routes={routes}
          store={store}
          layout={layout} />
      )
      head = Helmet.rewind()
      let body = <div key='body' {...config.app_mount_point} dangerouslySetInnerHTML={{__html: content}} />
      ctx.status = 200
      ctx.body = renderHtmlLayout(head, [body, scripts])
    })
  }
}
