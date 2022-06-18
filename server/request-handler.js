/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
/*
---------------------------- PROJECT NOTES ---------------------------
1. the requestHandler constructor is written in functional instantiation style - BE CONSISTENT!!!!
2. Need additional functions to check for port name, parts of request
3. if (request.url !== ‘/classes/messages’) {
    response.writeHead(notFoundCode, headers);
    response.end(‘404 not found’);
  }
*/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

var messages = [];

var requestHandler = function (request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/JSON';



  if (!(request.url === '/classes/messages')) {
    if (request.method === 'GET') {
      response.writeHead(404, headers);
      response.end('Not Found');
    }
  } else if (request.url === '/classes/messages') {
    if (request.method === 'GET') {
      response.writeHead(200, headers);
      response.end(JSON.stringify(messages));

    }
    if (request.method === 'POST') {
      request.on('data', (message) => {
        messages.push(JSON.parse(message));
      });
      response.writeHead(201, headers);
      response.end('This Posted');
    }
  }
};


module.exports = {
  requestHandler
};
