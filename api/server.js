var http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs"),
  port = process.argv[2] || 8888;

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname,
    filename = path.join(process.cwd(), uri);

  if(uri === '/data'){
    console.log('uri', uri);
        response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({user:{name: "Pierre B"}, messages: ["Message1", "Message2"], notifications: ["APP1", "APP2"]} ));
    return;
  }
  path.exists(filename, function(exists) {
    if (!exists) {
      response.writeHead(404, {
        "Content-Type": "text/plain"
      });
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if (err) {
        response.writeHead(500, {
          "Content-Type": "text/plain"
        });
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");