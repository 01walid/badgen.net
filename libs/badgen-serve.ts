import url from 'url'
import matchRoute from 'my-way'

import serve404 from './serve-404'
import serveBadge from './serve-badge'
import sentry from './sentry'

import { BadgenParams } from './types'

export type BadgenServeMeta = {
  title: string
  examples: { [url: string]: string }
  help?: string
}

export type BadgenServeHandlerArgs = { [key: string]: string }
export type BadgenServeHandlerResult = Promise<BadgenParams | undefined>
export type BadgenServeHandler = (args: BadgenServeHandlerArgs) => BadgenServeHandlerResult
export type BadgenServeHandlers = { [key: string]: BadgenServeHandler }

export function badgenServe (handlers: BadgenServeHandlers): Function {
  return async function httpHandler (req, res) {
    const { pathname = '/', query } = url.parse(req.url, true)

    // serve favicon
    if (pathname === '/favicon.ico') {
      return res.end()
    }

    // Lookup handler
    let matchedArgs
    const matchedScheme = Object.keys(handlers).find(scheme => {
      matchedArgs = matchRoute(scheme, decodeURI(pathname))
      return matchedArgs !== null
    })

    const defaultLabel = pathname.split('/')[1]

    if (matchedScheme) {
      try {
        const params = await handlers[matchedScheme](matchedArgs) || {
          subject: defaultLabel,
          status: 'unknown',
          color: 'grey'
        }

        params.subject = decodeURIComponent(params.subject)
        params.status = decodeURIComponent(params.status)

        if (query.style === undefined
          && process.env.BADGE_STYLE === 'flat'
          || req.headers.host.startsWith('flat.')) {
          query.style = 'flat'
        }

        return serveBadge(req, res, { params, query })
      } catch (error) {
        if (error instanceof BadgenError) {
          console.log(`BGE${error.code} "${error.status}" ${req.url}`)
          return serveBadge(req, res, {
            code: error.code,
            sMaxAge: 5,
            params: {
              subject: defaultLabel,
              status: error.status,
              color: error.color
            }
          })
        }

        // Handle timeout for `got` requests
        if (error.code === 'ETIMEDOUT') {
          console.error(`E504 ${req.url}`)
          // todo: send to google

          return serveBadge(req, res, {
            code: 504,
            sMaxAge: 5,
            params: {
              subject: defaultLabel,
              status: 'timeout',
              color: 'grey'
            }
          })
        }

        // Handle requests errors from `got`
        if (error.statusCode) {
          const errorInfo = `${error.url} ${error.statusMessage}`
          console.error(`APIE${error.statusCode} ${req.url} ${errorInfo}`)
          // todo: send to google

          return serveBadge(req, res, {
            code: error.statusCode,
            sMaxAge: 5,
            params: {
              subject: defaultLabel,
              status: error.statusCode,
              color: 'grey'
            }
          })
        }

        sentry.configureScope((scope) => {
          scope.setTag('path', req.url)
          scope.setTag('service', defaultLabel)
        })
        sentry.captureException(error)

        console.error(`E500 ${req.url}`, error.message)
        return serveBadge(req, res, {
          code: 500,
          sMaxAge: 5,
          params: {
            subject: 'badgen',
            status: 'error',
            color: 'grey'
          }
        })
      }
    } else {
      return serve404(req, res)
    }
  }
}

export class BadgenError {
  public status: string // error badge param: status (required)
  public color: string  // error badge param: color
  public code: number   // status code for response

  constructor ({ status, color = 'grey', code = 500 }) {
    this.status = status
    this.color = color
    this.code = code
  }
}
