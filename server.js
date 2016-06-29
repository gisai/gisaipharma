/* 
 * START OF FILE - server.js
 Author: Daniel Caballero Bellot
 Description: Node.js http main application server. Serves the application data and manages the creation and execution of services using REST protocol. 
 */
var domain_id = parseInt(process.argv[2]);
if(process.argv.length < 3 || domain_id < 0 || domain_id > 2){
	console.log("----Incorrect or missing Domain id----");
	console.log("Usage:\nnode server #domain_id #firstRun");
	console.log("#domain_id = 0 : Laboratorio");
	console.log("#domain_id = 1 : Logistica");
	console.log("#domain_id = 2 : Farmacia");
	console.log("#firstRun = 1/0");
	process.exit(1);
}
var firstRun = process.argv[3]||false;
var configurationFile = "config.json";
var email = [],numerosTelefono=[],epcs=[],arcos=[];
require('./users');
require('./services');
require('./servicerules');
require('./actions');
require('./conditions');
require('./events');
var sys = require('util'),
	http = require('http'),
	fs = require('fs');
var configRead = JSON.parse(fs.readFileSync(configurationFile));
var config = {};
config.port = configRead.port + domain_id;
config.host = configRead.host;
config.db = configRead.db;
config.fosstrak = configRead.fosstrak;
config.domain = configRead.domains[domain_id];
exports.config = config;
var io = require('socket.io'),
	xml = require('./xml'),
	xml2js = require('xml2js'),
	sms = require('./sms'),
	session = require('./session'),
	mongoose = require('mongoose'),
	connect = require('connect');

var dbUrl = "mongodb://"+config.db.user+":"+config.db.password+"@"+config.db.host+"/"+config.db.name+"_"+config.domain;
var db = mongoose.connect(dbUrl);
var parser = new xml2js.Parser();
var express = require('express');
var parseCookie = require('connect').utils.parseCookie;
var MongoStore = require('connect-mongo')(connect);
var sessionStore = new MongoStore({url:dbUrl});
var server = express();
var app = http.createServer(server);
var socket = io.listen(app, {log: false});

server.configure(function(){
	server.use(express.logger());
	server.use(express.methodOverride());
	server.use(express.bodyParser());  // añadido xmlencoded.js para parsear text/xml el 09/08/2012
	server.use(connect.cookieParser(session.secretString()));
	server.use(connect.session({cookie:{maxAge:60000000}, store:sessionStore}));
	server.use(server.router);
	server.use(function(err,req,res,next){
		console.error(err.stack);
		res.send(500,'Something broke!');
	});
});
//Session Management

server.get('/', session.checkAuth, function(req, res,next){
	next();
});

server.get('/index.html',session.checkAuth, function(req, res, next){
	next();
});

var User = db.model('User');
var Service = db.model('Service');
var ServiceRules = db.model('ServiceRules');
var EventObject = db.model('EventObject');
var ConditionObject = db.model('ConditionObject');
var ActionObject = db.model('ActionObject');

if (firstRun){
	setTimeout(function(){
		console.log("\n----Initializing DB----\n");
		ActionObject.go();
		ConditionObject.go();
		EventObject.go();
	},2000);
}

server.post('/login', function(req,res){
	User.authenticate(req.body.name, req.body.email, req.body.password, function(user){
		if (user!=null){
		req.session.user=user;
			req._id=user;
			res.send({"success":true})	
		} else {
			res.send({"success":false});
		}
	});
});

server.post('/register', function(req,res){
	User.register(req.body.name,req.body.email, req.body.password, function(user){
		if (user!=null){
			req.session.user=user;
			res.send({"success":true,});
		} else {
			res.send({"success":false});
		}
	});
});

server.get('/logout', function(req,res){
		req.session.user=null;
		res.redirect('/login.html');
});

server.post('/user/:username/service/:id',  session.checkAuth, function(req,res) {
	Service.save(req.params.id, req.params.username,req, function(t){
			res.send({"success":t});
		});
});

server.put('/user/:username/service/:id',  session.checkAuth, function(req,res) {
	Service.save(req.params.id, req.params.username, req, function(t){
			res.send({"success":t});
		});
});

server.del('/user/:username/service/:id', function(req, res){
	Service.destroy(req.params.id, req.params.username, function(t){
			res.send({"success":t});
		});
});

server.post('/user/:username/touchbox',  session.checkAuth, function(req,res) {
		Service.saveTouchbox(req.params.username, req.body, function(t){
			res.send({"success":t});
		});
});

server.put('/user/:username/touchbox', session.checkAuth, function(req,res) {
		Service.saveTouchbox(req.params.username, req.body, function(t){
			res.send({"success":t});
		});
});

server.post('/user/:username/connection',  session.checkAuth, function(req,res) {
		Service.saveConnection(req.params.username, req.body, function(t){
			res.send({"success":t});
		});
});

server.put('/user/:username/connection', session.checkAuth, function(req,res) {
		Service.saveConnection(req.params.username, req.body, function(t){
			res.send({"success":t});
		});
});

server.get('/user/:username/loadservice', session.checkAuth, function(req, res){
	Service.load({owner:req.params.username}, function(t){
		res.json(t);
	});
});

server.get('/user/:username/loadservicetemplate', session.checkAuth, function(req, res){
	Service.load({shared:true}, function(t){
		res.json(t);
	});
});

server.post('/user/:username/event', session.checkAuth, function(req, res){
	Service.saveEvent(req.params.username, req.body, function(t){
	res.send({"success":t});
	}); 
});

server.put('/user/:username/event', session.checkAuth, function(req, res){
	Service.saveEvent(req.params.username, req.body, function(t){
	res.send({"success":t});
	}); 
});

server.post('/user/:username/condition', session.checkAuth, function(req, res){
	Service.saveCondition(req.params.username, req.body, function(t){
	res.send({"success":t});
	}); 
});

server.put('/user/:username/condition', session.checkAuth, function(req, res){
	Service.saveCondition(req.params.username, req.body, function(t){
	res.send({"success":t});
	}); 
});

server.post('/user/:username/action', session.checkAuth, function(req, res){
	Service.saveAction(req.params.username, req.body, function(t){
	res.send({"success":t});
	}); 
});

server.put('/user/:username/action', session.checkAuth, function(req, res){
	Service.saveAction(req.params.username, req.body, function(t){
	res.send({"success":t});
	}); 
});
//peticiones relativas a reglas del servicio

server.post('/user/:username/servicerule/', session.checkAuth, function(req, res){
	ServiceRules.save(req.body, req.params.username, function(t){
	res.send({"success":t});
	}); 
});

server.put('/user/:username/servicerule/', session.checkAuth, function(req, res){
	ServiceRules.save(req.body, req.params.username, function(t){
	res.send({"success":t});
	}); 
});
server.post('/user/:username/ecarule', session.checkAuth, function(req, res){
	ServiceRules.saveEcaRule(req.params.username, req.body, function(t){
	res.send({"success":t});
	}); 
});

server.put('/user/:username/ecarule', session.checkAuth, function(req, res){
	ServiceRules.saveEcaRule(req.params.username, req.body, function(t){
	res.send({"success":t});
	}); 
});

server.post('/user/:username/eventrule', session.checkAuth, function(req, res){
	EventObject.findOne({type:req.body.type}, function(err,docs){
		ServiceRules.saveEventRule(req.params.username, req.body, docs, function(t){
			res.send({"success":t});
		});
	});
});

server.put('/user/:username/eventrule', session.checkAuth, function(req, res){
	console.log("Searching Rule type: ",req.body.type);
	EventObject.findOne({type:req.body.type}, function(err,docs){
		if(err){
			console.log("ERROR searching. "+err);
		}
		if(docs){
			console.log("Found rule: "+docs);
		} else {
			console.log("ERROR. Could not find "+req.body.type);
		}
		ServiceRules.saveEventRule(req.params.username, req.body, docs, function(t){
			res.send({"success":t});
		});
	});
});

server.post('/user/:username/conditionrule', session.checkAuth, function(req, res){
	ConditionObject.findOne({type:req.body.type}, function(err,docs){
		ServiceRules.saveConditionRule(req.params.username, req.body,docs.evaluation, function(t){
			res.send({"success":t});
		}); 
	});
});

server.put('/user/:username/conditionrule', session.checkAuth, function(req, res){
	console.log("Searching Condition type: ",req.body.type);
	ConditionObject.findOne({type:req.body.type}, function(err,docs){
		if(err){
			console.log(err);
		}
		console.log(docs);
		ServiceRules.saveConditionRule(req.params.username, req.body,docs.evaluation, function(t){
			res.send({"success":t});
		}); 
	});
});
server.post('/user/:username/actionrule', session.checkAuth, function(req, res){
	console.log(req.body.type);
	ActionObject.findOne({type:req.body.type}, function(err,docs){
		ServiceRules.saveActionRule(req.params.username, req.body, docs.action, function(t){
		res.send({"success":t});
		}); 
	});
});
server.put('/user/:username/actionrule', session.checkAuth, function(req, res){
	console.log(req.body.type);
	ActionObject.findOne({type:req.body.type}, function(err,docs){
	if(docs)
		ServiceRules.saveActionRule(req.params.username, req.body, docs.action, function(t){
		res.send({"success":t});
		}); 
	});
});
server.get('/user/:username/loadservicerules', session.checkAuth, function(req, res){
	ServiceRules.load({owner:req.params.username}, function(t){
		res.json(t);
	});
});
server.del('/user/:username/servicerule/', session.checkAuth, function(req, res){
	ServiceRules.destroy(req.body.id, req.params.username, function(t){
			res.send({"success":t});
		});
});
server.post('/user/:username/activateservicerule/:serviceid', session.checkAuth, function(req, res) {
	ServiceRules.activateServiceRules(req.params.username, req.params.serviceid, function(t){
		res.send({"success":t});
	})
});

server.post('/user/:username/desactivateservicerule/:serviceid',session.checkAuth,  function(req, res) {
	ServiceRules.desactivateServiceRules(req.params.username, req.params.serviceid, function(t){
		res.send({"success":t});
	})
});
server.use(express.static(__dirname + '/static'));

//Session Management end
server.post('/respuestaepcis', function(req,res){
	console.log("Respuesta EPCIS recibida:", req.body);
	parser.parseString(req.body, function(err,result){; //returns an string containing the json structure by default	
				
		if(result.EPCISBody['ns3:QueryResults']){
			var eventData=result.EPCISBody['ns3:QueryResults'].resultsBody.EventList;
			console.log('Event Data: ', eventData);
			console.log(eventData.QuantityEvent.bizTransactionList.bizTransaction);
			var subscriptionId=result.EPCISBody['ns3:QueryResults'].subscriptionID;
			var n=subscriptionId.split("_");
			var owner=n[0];
			var servicerules_id=n[1];
			var ecarule_id=n[2];

			ServiceRules.eventFired(owner, servicerules_id,ecarule_id, eventData);
			
		} 	else if(result.EPCISBody['ns3:ImplementationException']){

			var date=new Date().getTime();
			var subscriptionId=result.EPCISBody['ns3:ImplementationException'].subscriptionID;
			var n=subscriptionId.split("_");
			var owner=n[0];
			var servicerules_id=n[1];
			var ecarule_id=n[2];
		}	else {
			console.log(err);
		}    
	});
});

//PARTE DE WEBSOCKETS//

var socketsession=socket.of('/session').authorization(function(hsData,callback){
	if(hsData.headers.cookie){
		hsData.cookie = parseCookie(hsData.headers.cookie);
		hsData.sessionID = hsData.cookie['connect.sid'].substring(0,hsData.cookie['connect.sid'].indexOf('.'));
		sessionStore.get(hsData.sessionID, function (err, session) {
			if (err || !session) {
				console.log('errorparseodecookie');
				callback('Error', false);
			} else {
			sessionStore.set(hsData.sessionID,session,function(){});
				hsData.session=session;
				callback(null, true);
			}
		});
	}
}).on('connection', function(client){
	conexiones[client.handshake.session.user.name]=client;
	client.emit('name',{name:client.handshake.session.user.name,email:client.handshake.session.user.email});
		client.on('chatmessage', function(message){
		client.broadcast.emit('chatmessage', client.handshake.session.user.name+' dijo: '+message);
		});
	});
//PARTE DE WEBSOCKETS//

//var port = process.env.PORT || 5000;
app.listen(config.port, function() {
  console.log("\n-----Running domain " + config.domain +" on port " + config.port+"-----\n");
});

/* 
 * END OF FILE - server.js
 */