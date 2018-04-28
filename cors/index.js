module.exports = function() {
    return function(req, res, next) {
        var CORSHeaders = withCORS({}, req)
        if (req.method === 'OPTIONS') {
          // Pre-flight request. Reply successfully:
          res.writeHead(200, CORSHeaders)
          res.end()
          return
        }
        // else

        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, POST')
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Access-Token, Accept, Authorization, x-access-token')
        next();
    }
}

/**
 * Adds CORS headers to the response headers.
 *
 * @param headers {object} Response headers
 * @param request {ServerRequest}
 */
function withCORS(headers, request) {
    headers['access-control-allow-origin'] = '*';
    var corsMaxAge = request.corsAnywhereRequestState.corsMaxAge;
    if (corsMaxAge) {
      headers['access-control-max-age'] = corsMaxAge;
    }
    if (request.headers['access-control-request-method']) {
      headers['access-control-allow-methods'] = request.headers['access-control-request-method'];
      delete request.headers['access-control-request-method'];
    }
    if (request.headers['access-control-request-headers']) {
      headers['access-control-allow-headers'] = request.headers['access-control-request-headers'];
      delete request.headers['access-control-request-headers'];
    }
  
    headers['access-control-expose-headers'] = Object.keys(headers).join(',');
  
    return headers;
  }