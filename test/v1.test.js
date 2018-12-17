const test = require('tape')
const XmrTo = require('../')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const xmr = new XmrTo()

const BTC_DEST_ADDRESS = '1L9CB5LzX2JkjGS28t5QKtQWAF6uU8dbB'

test('XmrTo is istantiable Class', (t) => {
  t.plan(1)
  t.ok(xmr instanceof XmrTo, 'XmrTo is a Class')
})

test('.getParams() returns information wether new orders can be created', (t) => {
  t.plan(5)
  const props = ['zero_conf_enabled', 'price', 'upper_limit', 'lower_limit', 'zero_conf_max_amount']
  xmr.getParams().then(res => {
    props.map(key => t.ok(res.hasOwnProperty(key), `has "${key}" property`))
  })
})

test('.createOrder(<amount>, <address>): params required', (t) => {
  t.plan(2)
  xmr.createOrder().then(t.fail).catch(e => {
    t.equal(e.message, 'amount number is required', 'amount is required')
  })
  xmr.createOrder(1).then(t.fail).catch(e => {
    t.equal(e.message, 'address string is required', 'address is required')
  })
})

test('.createOrder(<amount>, <address>): invalid address format', (t) => {
  t.plan(2)
  xmr.createOrder(1, 'wrong-format-address').then(t.fail).catch(e => {
    t.equal(e.message, 'malformed bitcoin address', 'expected malformed address error')
    t.equal(e.code, 'XMRTO-ERROR-002', 'got expected error code')
  })
})

let testUUID = null
test('.createOrder(<amount>, <address>): valid request', async (t) => {
  await delay(2e3) // delay exec for api limit
  t.plan(4)
  try {
    const { state, btc_amount: btcAmount, btc_dest_address: destAddress, uuid } = await xmr.createOrder(1, BTC_DEST_ADDRESS)
    t.equal(state, 'TO_BE_CREATED', 'got expected state')
    t.equal(btcAmount, 1, 'got expected amount')
    t.equal(destAddress, BTC_DEST_ADDRESS, 'got expected dest address')
    t.ok(typeof uuid === 'string')
    testUUID = uuid
  } catch (e) {
    console.error(e)
  }
})

test('.queryOrder(<uuid>): param required', (t) => {
  t.plan(1)
  xmr.queryOrder().then(t.fail).catch(e => {
    t.equal(e.message, 'uuid string is required', 'uuid is required')
  })
})

test('.queryOrder(<uuid>): param required', async (t) => {
  t.plan(14)
  await delay(3e3)
  const res = await xmr.queryOrder(testUUID)
  t.equal(res.btc_dest_address, BTC_DEST_ADDRESS)
  createdOrderHasProperties(res, t)
})

function createdOrderHasProperties (res, t) {
  // essential props:
  const props = ['xmr_recommended_mixin', 'created_at', 'xmr_receiving_address', 'btc_amount', 'btc_num_confirmations', 'xmr_receiving_integrated_address', 'expires_at', 'xmr_required_amount', 'state', 'xmr_amount_total', 'xmr_price_btc', 'uuid', 'xmr_num_confirmations_remaining']
  props.forEach(key => {
    t.ok(res.hasOwnProperty(key), `got expected ${key} property`)
  })
}
