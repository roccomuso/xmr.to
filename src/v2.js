
const HOST = 'https://xmr.to/api/'
const VERSION = 'v2'
const BASE = `${HOST}/${VERSION}/xmr2btc`

module.exports = {
  FORMAT_RES: formatResponse,
  VERSION: () => VERSION,
  GET_PARAMS: () => `${BASE}/order_parameter_query/`,
  CREATE_ORDER: () => `${BASE}/order_create/`,
  QUERY_ORDER: () => `${BASE}/order_status_query/`
}

function formatResponse (response) {
  if (response.error) {
    const err = new Error(response.error_msg || `Request failed with code: ${response.error}`)
    err.code = response.error
    throw err
  }
  return response
}
