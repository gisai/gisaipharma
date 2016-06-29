


var send = function(numeroTelefono,servicerule_id, texto) {
console.log(texto);
console.log(servicerule_id);
var http = require('http');
var options = {
  host: 'api.tropo.com',
  port: 80,
  path: '/1.0/sessions?action=create&token=1628d609764ecb4887d2c14f5013739965b72e0fa5625fdc0231cc012679d1fd5c5e7b1b18551e0dfc22fa27&numberToDial=34'+numeroTelefono+'&servicerule_id='+servicerule_id+'&texto='+texto,
  method: 'GET',
  headers: {
  "Content-Type": "application/json"
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});
req.end();
console.log("Solicitud de envio de SMS enviada");
}



