const debug = require('debug')('xmr.to')
const crossFetch = require('cross-fetch')
const assert = require('assert')
const v2 = require('./v2')

class XmrTo {
  constructor () {
    this.Api = v2
    debug('Using Xmr.to API version:', this.Api.VERSION())
    const headers = {
      'Content-Type': 'application/json'
    }

    this.get = (uri, opts) => crossFetch(uri, {
      headers,
      ...opts
    }).then(res => res.json())
      .then(this.Api.FORMAT_RES)
    this.post = (uri, body) => crossFetch(uri, {
      method: 'post',
      headers,
      body: JSON.stringify(body)
    }).then(res => res.json())
      .then(this.Api.FORMAT_RES)

    return this
  }

  version () {
    return this.Api.VERSION
  }

  async getParams () {
    return this.get(this.Api.GET_PARAMS())
  }

  async createOrder (amount, address) {
    assert(typeof amount === 'number', 'amount number is required')
    assert(typeof address === 'string', 'address string is required')
    return this.post(this.Api.CREATE_ORDER(), { btc_amount: amount, btc_dest_address: address })
  }

  async queryOrder (uuid) {
    assert(typeof uuid === 'string', 'uuid string is required')
    return this.post(this.Api.QUERY_ORDER(), { uuid })
  }
}

module.exports = XmrTo
