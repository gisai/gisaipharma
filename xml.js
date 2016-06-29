//*Diferentes funciones para comunicar con la interfaz SOAP del EPCIS Repository.

//epcisEvent Componente epcisEvent
exports.subscribir = function(epc, arco,subscriptionId, date){
  var config = require('./server.js').config;
  var data ='<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>'+
  '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
  '<soap:Body>'+
  '<epcisq:Subscribe xmlns:epcisq="urn:epcglobal:epcis-query:xsd:1">'+
    '<queryName>SimpleEventQuery</queryName>'+
    '<params>'+
      '<param>'+
        '<name>eventType</name>'+
        '<value>'+
          '<string>ObjectEvent</string>'+
        '</value>'+
      '</param>'+
      '<param>'+
        '<name>MATCH_epc</name>'+
        '<value>'+
          '<string>'+epc+'</string>'+
        '</value>'+
      '</param>'+
      '<param>'+
        '<name>EQ_readPoint</name>'+
        '<value>'+
          '<string>'+arco+'</string>'+
        '</value>'+
      '</param>'+
    '</params>'+
   '<dest>http://'+config.host+':'+config.port+'/respuestaepcis</dest>'+//localhost:5000
    '<controls>'+
      '<trigger>'+epc+'</trigger>'+
      '<initialRecordTime>'+date+'</initialRecordTime>'+
      '<reportIfEmpty>false</reportIfEmpty>'+
    '</controls>'+
    '<subscriptionID>'+subscriptionId+'</subscriptionID>'+
  '</epcisq:Subscribe>'+
      '</soap:Body>'+
  '</soap:Envelope>';
  var http = require('http');
  var options = {
    host: config.fosstrak.host, //'localhost'
    port: config.fosstrak.port, //8080
    path: config.fosstrak.path, //'/epcis-repository-0.5.0/query'
    method: 'POST',
    headers: {
    "Content-Type": "text/xml"
    }
  };
  console.log("DATA: ",data);
  var req = http.request(options, function(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
  	});

  });
  req.on('error', function(error){
  	console.log(error);
  });
  req.write(data);
  req.end();
}

exports.unsubscribe = function(subscriptionId, callback){
  var config = require('./server.js').config;
  var data ='<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>'+
  '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
  '<soap:Body>'+
  '<epcisq:Unsubscribe xmlns:epcisq="urn:epcglobal:epcis-query:xsd:1">'+
    '<subscriptionID>'+subscriptionId+'</subscriptionID>'+
  '</epcisq:Unsubscribe>'+
      '</soap:Body>'+
  '</soap:Envelope>';
  var http = require('http');
  var options = {
    status:200,
    host: config.fosstrak.host, //'localhost'
    port: config.fosstrak.port, //8080
    path: config.fosstrak.path, //'/epcis-repository-0.5.0/query'
    method: 'POST',
    headers: {
    "Content-Type": "text/xml"
    }
  };

  var req = http.request(options, function(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
  	callback();
    });
  });
  req.on('error', function(error){
  	console.log(error);
  });
  req.write(data);
  req.end();
}

exports.renovate = function(epc, arco, subscriptionId, date, callback){
  var config = require('./server.js').config;
  var data ='<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>'+
  '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
  '<soap:Body>'+
  '<epcisq:Unsubscribe xmlns:epcisq="urn:epcglobal:epcis-query:xsd:1">'+
    '<subscriptionID>'+subscriptionId+'</subscriptionID>'+
  '</epcisq:Unsubscribe>'+
      '</soap:Body>'+
  '</soap:Envelope>';
  var http = require('http');
  var options = {
    status:200,
    host: config.fosstrak.host, //'localhost'
    port: config.fosstrak.port, //8080
    path: config.fosstrak.path, //'/epcis-repository-0.5.0/query'
    method: 'POST',
    headers: {
    "Content-Type": "text/xml"
    }
  };

  var req = http.request(options, function(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
  	if(res.statusCode==200){
  	exports.subscribir(epc, arco, subscriptionId, date);
  	callback();}
    });
  });
  req.on('error', function(error){
  	console.log(error);
  });
  req.write(data);
  req.end();
}

//epcisQEvent Componente quantity event
exports.subscribirQ = function(epc, arco, cantidad,comparador,subscriptionId, date){
  var config = require('./server.js').config;
  if(comparador=='mayor')
  	var tag= '<name>GT_quantity</name>'
  else if(comparador=='igual')
  	var tag= '<name>EQ_quantity</name>'
  else if(comparador=='menor')
  	var tag= '<name>LT_quantity</name>'
  var data ='<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>'+
  '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
  '<soap:Body>'+
  '<epcisq:Subscribe xmlns:epcisq="urn:epcglobal:epcis-query:xsd:1">'+
    '<queryName>SimpleEventQuery</queryName>'+
    '<params>'+
      '<param>'+
        '<name>eventType</name>'+
        '<value>'+
          '<string>QuantityEvent</string>'+
        '</value>'+
      '</param>';
  if (epc != "ALL"){
    data += '<param>'+
        '<name>MATCH_epcClass</name>'+
        '<value>'+
          '<string>'+epc+'</string>'+
        '</value>'+
      '</param>';
  }
  if (cantidad != "ALL"){
    data += '<param>'+
        tag+'<value>'+
          '<int>'+cantidad+'</int>'+
        '</value>'+
      '</param>';
  }
  data += '<param>'+
        '<name>EQ_readPoint</name>'+
        '<value>'+
          '<string>'+arco+'</string>'+
        '</value>'+
      '</param>'+
    '</params>'+
   '<dest>http://'+config.host+':'+config.port+'/respuestaepcis</dest>'+
    '<controls>'+
      '<trigger>'+epc+'</trigger>'+
      '<initialRecordTime>'+date+'</initialRecordTime>'+
      '<reportIfEmpty>false</reportIfEmpty>'+
    '</controls>'+
    '<subscriptionID>'+subscriptionId+'</subscriptionID>'+
  '</epcisq:Subscribe>'+
      '</soap:Body>'+
  '</soap:Envelope>';
  var http = require('http');
  var options = {
    host: config.fosstrak.host, //'localhost'
    port: config.fosstrak.port, //8080
    path: config.fosstrak.path, //'/epcis-repository-0.5.0/query'
    method: 'POST',
    headers: {
    "Content-Type": "text/xml"
    }
  };

  var req = http.request(options, function(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
  	});

  });
  req.on('error', function(error){
  	console.log(error);
  });
  req.write(data);
  req.end();
}
exports.unsubscribeQ = exports.unsubscribe;

exports.renovateQ = function(epc, arco, cantidad,comparador,subscriptionId, date, callback){
  var config = require('./server.js').config;
  var data ='<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>'+
  '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
  '<soap:Body>'+
  '<epcisq:Unsubscribe xmlns:epcisq="urn:epcglobal:epcis-query:xsd:1">'+
    '<subscriptionID>'+subscriptionId+'</subscriptionID>'+
  '</epcisq:Unsubscribe>'+
      '</soap:Body>'+
  '</soap:Envelope>';
  var http = require('http');
  var options = {
    status:200,
    host: config.fosstrak.host, //'localhost'
    port: config.fosstrak.port, //8080
    path: config.fosstrak.path, //'/epcis-repository-0.5.0/query'
    method: 'POST',
    headers: {
    "Content-Type": "text/xml"
    }
  };

  var req = http.request(options, function(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
  	if(res.statusCode==200){
  	exports.subscribirQ(epc, arco, cantidad,comparador,subscriptionId, date);
  	callback();}
    });
  });
  req.on('error', function(error){
  	console.log(error);
  });
  req.write(data);
  req.end();
}
//exports.unsubscribeQ("prueba5",function(){});
//exports.subscribirQ("Aspirin","arco1",68,"mayor","prueba4",new Date().toISOString());
//exports.renovateQ("Aspirin","arco1",68,"menor","prueba4",new Date().toISOString(),function(){});

