import unfetch from 'isomorphic-unfetch'

const RSF_VERSION_HEADER = 'x-rsf-api-version'
const apiVersion = process.env.RSF_API_VERSION || '1'

/**
 * An isomorphic implementation of the fetch API that always sends the x-rsf-api-version header.  You should
 * always use this to fetch data on both the client and server to ensure that React Storefront's
 * service worker serves responses cached by the service worker.
 *
 * @param {String} url
 * @param {Object} opts
 * @return {Promise}
 */
export default function fetch(url, opts = {}) {
  const headers = opts.headers || {}
  headers[RSF_VERSION_HEADER] = apiVersion
  return unfetch(url, { ...opts, headers })
}

/**
 * Adds x-rsf-api-version to all xhr
 */
function monkeyPatchXHR() {
  const open = XMLHttpRequest.prototype.open

  XMLHttpRequest.prototype.open = function() {
    const res = open.apply(this, arguments)
    this.setRequestHeader(RSF_VERSION_HEADER, apiVersion)
    return res
  }
}

/**
 * Adds x-rsf-api-version to all fetch requests
 */
function monkeyPatchFetch() {
  // We don't add fetch if it's not there, so browsers will not try to detect it
  if (window.fetch) {
    window.fetch = fetch
  }
}

if (typeof window !== 'undefined') {
  monkeyPatchXHR()
  monkeyPatchFetch()
}
