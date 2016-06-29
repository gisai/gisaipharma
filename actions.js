
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ActionObjectSchema= new Schema({
	type: {type: String},
	action: {type: String}
});



ActionObjectSchema.statics.go=function go(){

/*
	var from = 'pruebasgisai@gmail.com';
	var to = [rule.actions[0].data.data.emailAddress];
	var subject = rule.actions[0].data.data.subject;
	var body = rule.actions[0].data.data.text;
	var aws = require('aws-sdk');
	aws.config.loadFromPath('config_aws.json');
	var ses = new aws.SES({apiVersion:'2010-12-01'});
	if(rule.actions[0].data.data.includeInfo){
		body+="\n\nInformacion del medicamento:\n"+JSON.stringify(eventDataUtil);
	}
	ses.sendEmail({ 
		Source: from,
		Destination: {ToAddresses: to },
		Message: {
			Subject: {Data: subject},
			Body: {Text: {Data: body}}
		}
	},function(err, data) {
		if(err) throw err;
		console.log('Email sent to '+to+' with message:');
		console.log(data);
	});
*/

	var myVariable = "var from = 'pruebasgisai@gmail.com';var to = [rule.actions[0].data.data.emailAddress];var subject = rule.actions[0].data.data.subject;var body = rule.actions[0].data.data.text;var aws = require('aws-sdk');aws.config.loadFromPath('config_aws.json');var ses = new aws.SES({apiVersion:'2010-12-01'});ses.sendEmail({ Source: from,Destination: {ToAddresses: to },Message: {Subject: {Data: subject},Body: {Text: {Data: body}}}},function(err, data) {if(err) throw err;console.log('Email sent to '+to+' with content:');console.log(data);});";
	var t=new ActionObject({type:'emailAction', action:myVariable});
	t.save();
	
	
// var send = function(numeroTelefono,servicerule_id, texto) {
// var http = require('http');
// var options = {
  // host: 'api.tropo.com',
  // port: 80,
  // path: '/1.0/sessions?action=create&token=1628d609764ecb4887d2c14f5013739965b72e0fa5625fdc0231cc012679d1fd5c5e7b1b18551e0dfc22fa27&numberToDial=34'+numeroTelefono+'&servicerule_id='+servicerule_id+'&texto='+texto,
  // method: 'GET',
  // headers: {
  // "Content-Type": "application/json"
  // }
// };
// var req = http.request(options, function(res) {
  // console.log('STATUS: ' + res.statusCode);
  // console.log('HEADERS: ' + JSON.stringify(res.headers));
  // res.setEncoding('utf8');
  // res.on('data', function (chunk) {
	// console.log('BODY: ' + chunk);
  // });
// });
// req.end();
// console.log("Solicitud de envio de SMS enviada");
// }
// var texto=encodeURI(rule.actions[0].data.data.text);
// console.log(texto)
// var numero=rule.actions[0].data.data.telephoneNumber;
// var encoded_servicerule_id=encodeURI(rule.actions[0].data.servicerule_id);
// send(numero, encoded_servicerule_id ,texto);
			
	var myVariable = 'var send = function(numeroTelefono,servicerule_id, texto) {\nvar http = require(\'http\');\nvar options = {\n  host: \'api.tropo.com\',\n  port: 80,\n  path: \'\/1.0\/sessions?action=create&token=1628d609764ecb4887d2c14f5013739965b72e0fa5625fdc0231cc012679d1fd5c5e7b1b18551e0dfc22fa27&numberToDial=34\'+numeroTelefono+\'&servicerule_id=\'+servicerule_id+\'&texto=\'+texto,\n  method: \'GET\',\n  headers: {\n  \"Content-Type\": \"application\/json\"\n  }\n};\nvar req = http.request(options, function(res) {\n  console.log(\'STATUS: \' + res.statusCode);\n  console.log(\'HEADERS: \' + JSON.stringify(res.headers));\n  res.setEncoding(\'utf8\');\n  res.on(\'data\', function (chunk) {\n\tconsole.log(\'BODY: \' + chunk);\n  });\n});\nreq.end();\nconsole.log(\"Solicitud de envio de SMS enviada\");\n}\nvar texto=encodeURI(rule.actions[0].data.data.text);\nconsole.log(texto)\nvar numero=rule.actions[0].data.data.telephoneNumber;\nvar encoded_servicerule_id=encodeURI(rule.actions[0].data.servicerule_id);\nsend(numero, encoded_servicerule_id ,texto);';
	var t=new ActionObject({type:'smsAction', action:myVariable});
	t.save();
	
	
// var mensaje='Service name: '+rule.actions[0].data.servicerule_id+' || Mensaje: '+rule.actions[0].data.data.text;

// if(rule.actions[0].data.data.includeInfo)
	// mensaje=mensaje+' || Datos del Evento:'+ JSON.stringify(eventDataUtil);
// if(conexiones[owner])
// conexiones[owner].emit('alarm', mensaje);

	var myVariable = 'var mensaje=\'Service name: \'+rule.actions[0].data.servicerule_id+\' || Mensaje: \'+rule.actions[0].data.data.text;\n\nif(rule.actions[0].data.data.includeInfo)\n\tmensaje=mensaje+\' || Datos del Evento:\'+ JSON.stringify(eventDataUtil);\nif(conexiones[owner])\nconexiones[owner].emit(\'alarm\', mensaje);\n';
	var t=new ActionObject({type:'reportAction', action:myVariable});
	t.save();


// var id=rule.actions[0].data.data.id;
// doc.rules.forEach(function(rule) {
	// if(rule.events[0].data.data.id==id){
		// eval(rule.events[0].fired);
	// }
// });
	var myVariable = 'var id=rule.actions[0].data.data.id;\ndoc.rules.forEach(function(rule) {\n\tif(rule.events[0].data.data.id==id){\n\t\teval(rule.events[0].fired);\n\t}\n});';
	var t=new ActionObject({type:'ActionFireEvent', action:myVariable});
	t.save();

/*
	var gcm=require("node-gcm");
	var message=new gcm.Message();
	var text=rule.actions[0].data.data.text;
	if(rule.actions[0].data.data.includeInfo){
		text+="\n\nInformacion del medicamento:\n"+JSON.stringify(eventDataUtil);
	}
	message.addData("message",text);
	message.addData("result","resultado");
	var sender=new gcm.Sender("AIzaSyDXffc0FTBNCu6PHkdzG5lpvVeLm_DgTwg");//
	sender.send(message,{topic:rule.actions[0].data.data.topic},function (err, response) {
		if(err){
		console.error(err);
		}else{
		console.log(response);
		}
	});
*/
	var myVariable = 'var gcm = require("node-gcm");var message = new gcm.Message();var text = rule.actions[0].data.data.text;if(rule.actions[0].data.data.includeInfo){text += "  Informacion del medicamento:  "+JSON.stringify(eventDataUtil);}message.addData("message", text);message.addData("result","resultado");var sender = new gcm.Sender("AIzaSyDXffc0FTBNCu6PHkdzG5lpvVeLm_DgTwg");sender.send(message, { topic: rule.actions[0].data.data.topic}, function (err, response) {if(err) {console.error(err);}else{console.log(response);}});';
	var t = new ActionObject({type:'notificationAction', action:myVariable});
	t.save();
}

var ActionObject=mongoose.model('ActionObject', ActionObjectSchema);
