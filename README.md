# xmr.to [![NPM Version](https://img.shields.io/npm/v/xmr.to.svg)](https://www.npmjs.com/package/xmr.to) ![node](https://img.shields.io/node/v/xmr.to.svg) [![Dependency Status](https://david-dm.org/roccomuso/xmr.to.png)](https://david-dm.org/roccomuso/xmr.to) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [<img width="100" align="right" src="https://raw.githubusercontent.com/roccomuso/xmr.to/master/altcoins.png?sanitize=true" alt="bitcoin">](https://github.com/roccomuso/xmr.to)

> Fully tested Browser and Node.js [Xmr.to](https://xmr.to) API client

Anonymously exchange XMR to Bitcoin with few lines of code.

## Install

    npm install --save xmr.to

## Usage

```javascript
const XmrTo = require('xmr.to')

;(async () => {

  const cs = new XmrTo()

  const params = await cs.getParams()
  console.log(params)
  /*
  { zero_conf_enabled: true,
      price: 0.011923,
      upper_limit: 20,
      lower_limit: 0.001,
      zero_conf_max_amount: 0.1 }
  */
})()
```

### Make an exchange order

```javascript
const xmr = new XmrTo()

// create order
const {
  state,
  btc_amount: btcAmount,
  btc_dest_address: destAddress,
  uuid } = await xmr.createOrder(1, '1L9CB5LzX2JkjGS28t5QKtQWAF6uU8dbB')

// query order
const {
  xmr_receiving_address: receivingAddress,
  xmr_amount_total: amountToSend,
  state
} = await xmr.queryOrder(uuid)

/*
// queryOrder(uuid) result:

{ xmr_price_btc: 0.01180468,
  uuid: 'xmrto-6zSPYD',
  state: 'UNPAID',
  btc_amount: 1,
  btc_dest_address: '1L9CB5LzX2JkjGS28t5QKtQWAF6uU8dbB',
  xmr_required_amount: 84.7122,
  xmr_receiving_address:
   '45LaGeQ2AFsiGHKi9KKTKR1XjCb2pgve9c7FgL1qTXzvNfHjVuo1YntAxg8J6q7ewVgrQmWsm4Ry92JYFke2fvQXHhQAtf7',
  xmr_receiving_integrated_address:
   '4F3FHTDWmXPiGHKi9KKTKR1XjCb2pgve9c7FgL1qTXzvNfHjVuo1YntAxg8J6q7ewVgrQmWsm4Ry92JYFke2fvQXRdUKcRXCm1FK1Hd2uu',
  xmr_required_payment_id_long:
   'ae44a36b61298a5d5d8404c280e7dd059b5d4e570cbaf3957afc70e1c8171a97',
  xmr_required_payment_id_short: '3efc91e28f0b969f',
  created_at: '2018-12-16T23:44:05Z',
  expires_at: '2018-12-16T23:59:05Z',
  seconds_till_timeout: 899,
  xmr_amount_total: 84.7122,
  xmr_amount_remaining: 84.7122,
  xmr_num_confirmations_remaining: -1,
  xmr_recommended_mixin: 11,
  btc_num_confirmations_before_purge: 144,
  btc_num_confirmations: 0,
  btc_transaction_id: '' }
*/

console.log(`
==============
UUID: ${uuid}
State: ${state}
Deposit: XMR (${amountToSend})
Receive: BTC (${btcAmount})
Exchange Address: ${receivingAddress}
==============
`)
```

### Methods

|Method Name|Return|Description|
|:-----|:-----:|-----------|
|`.getParams()`|`Object`|Returns information wether new orders can be created|
|`.createOrder(<btc amount>, <btc address>)`|`Object`|Create a new order. It will return transaction object with an `uuid` to query for the order detail.|
|`.queryOrder(<uuid>)`|`Object`|Get order detail given a UUID|


## Test

> npm test

## Debug

To enable debug set the env var `DEBUG=xmr.to`

# License

MIT
