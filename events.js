var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var EventObjectSchema= new Schema({
	type: {type: String},
	fired:{type:String},
	subscribe: {type: String},
	unsubscribe: {type: String},
	renovate:{type: String}
});

EventObjectSchema.statics.go=function go(){

	/*
	------epcisQuantityEvent methods------
	/*
	*Fired
	*/
	/*
var recordDate=new Date(eventData.QuantityEvent.recordTime).getTime();
if(eventData.QuantityEvent.quantity&&eventData.QuantityEvent.epcClass&&eventData.QuantityEvent.readPoint){
	var caducidad = null;
	var nombre = null;
	eventData.QuantityEvent.bizTransactionList.bizTransaction.forEach(function(entry){
		if(entry["@"].type=="nombre"){
			nombre = entry["#"];
		} else if(entry["@"].type=="caducidad"){
			caducidad = entry["#"];
		}
	});
	var eventDataUtil={Cantidad:eventData.QuantityEvent.quantity,EPC:eventData.QuantityEvent.epcClass, readPoint:eventData.QuantityEvent.readPoint, caducidad:caducidad, nombre:nombre}; 
	if (recordDate){
		var date=new Date(rule.events[0].data.recordTime);
		if (date.getTime()<recordDate) {
			var now=new Date().toISOString();
			rule.events[0].data.recordTime=now;
			eval(rule.conditions[0].evaluation);
			eval(rule.events[0].renovate);
		}
	} else {
		var now=new Date().toISOString();
		rule.events[0].data.recordTime=now;
		eval(rule.events[0].renovate);
	}
} else {
	var now=new Date().toISOString();
	rule.events[0].data.recordTime=now;
	eval(rule.events[0].renovate);
}
	*/
	var fired = 'var recordDate=new Date(eventData.QuantityEvent.recordTime).getTime();\nif(eventData.QuantityEvent.quantity&&eventData.QuantityEvent.epcClass&&eventData.QuantityEvent.readPoint){\n\tvar caducidad = null;var nombre = null;eventData.QuantityEvent.bizTransactionList.bizTransaction.forEach(function(entry){if(entry["@"].type=="nombre"){nombre = entry["#"];} else if(entry["@"].type=="caducidad"){caducidad = entry["#"];}});	var eventDataUtil={Cantidad:eventData.QuantityEvent.quantity,EPC:eventData.QuantityEvent.epcClass, readPoint:eventData.QuantityEvent.readPoint, caducidad:caducidad, nombre:nombre};\n\tif (recordDate){\n\t\tvar date=new Date(rule.events[0].data.recordTime);\n\t\tif (date.getTime()<recordDate) {\n\t\t\tvar now=new Date().toISOString();\n\t\t\trule.events[0].data.recordTime=now;\n\t\t\teval(rule.conditions[0].evaluation);\n\t\t\teval(rule.events[0].renovate);\n\t\t}\n\t} else {\n\t\t\tvar now=new Date().toISOString();\n\t\t\trule.events[0].data.recordTime=now;\n\t\teval(rule.events[0].renovate);\n\t}\n} else {\n\t\t\tvar now=new Date().toISOString();\n\t\t\trule.events[0].data.recordTime=now;\n\t\teval(rule.events[0].renovate);\n}';
	/*
	*Subscribe
	*/
	// var date=new Date().toISOString();
	// rule.events[0].data.recordTime=date;
	// xml.subscribirQ(rule.events[0].data.data.epc,rule.events[0].data.data.arco,rule.events[0].data.data.cantidad,rule.events[0].data.data.comparador,rule.events[0].subscriptionId, date);
	// doc.markModified('rules');
	// doc.save(function(e){
			// if(e){
				// setTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);
			// }
		// });

	var subscribe = 'var date=new Date().toISOString();\nrule.events[0].data.recordTime=date;\nxml.subscribirQ(rule.events[0].data.data.epc,rule.events[0].data.data.arco,rule.events[0].data.data.cantidad,rule.events[0].data.data.comparador,rule.events[0].subscriptionId, date);\ndoc.markModified(\'rules\');\ndoc.save(function(e){\n\t\tif(e){\n\t\t\tsetTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);\n\t\t}\n\t});';
		/*
	*Unsubscribe
	*/
	// xml.unsubscribeQ(rule.events[0].subscriptionId, function(){
		// doc.markModified('rules');
		// doc.save(function(e){
			// if(e){
				// setTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);
			// }
		// });
	// });
		
	var unsubscribe = 'xml.unsubscribeQ(rule.events[0].subscriptionId, function(){\n\tdoc.markModified(\'rules\');\n\tdoc.save(function(e){\n\t\tif(e){\n\t\t\tsetTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);\n\t\t}\n\t});\n});';
	/*
	*Renovate
	*/

	// xml.renovateQ(rule.events[0].data.data.epc,rule.events[0].data.data.arco,rule.events[0].data.data.cantidad,rule.events[0].data.data.comparador,rule.events[0].subscriptionId, rule.events[0].data.recordTime, function() {
		// doc.markModified('rules');
		// doc.save(function(e){
			// if(e){
				// setTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);
			// }
		// });
	// });

	var renovate = 'xml.renovateQ(rule.events[0].data.data.epc,rule.events[0].data.data.arco,rule.events[0].data.data.cantidad,rule.events[0].data.data.comparador,rule.events[0].subscriptionId, rule.events[0].data.recordTime, function() {\n\tdoc.markModified(\'rules\');\n\tdoc.save(function(e){\n\t\tif(e){\n\t\t\tsetTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);\n\t\t}\n\t});\n});';
	var t=new EventObject({type:'epcisQuantityEvent', subscribe:subscribe, renovate:renovate, unsubscribe:unsubscribe, fired:fired});
		t.save();
	/*
	------epcisEvent methods------
	/*
	*Fired
	*/
	// var recordDate=new Date(eventData.QuantityEvent.recordTime).getTime();
	// if(eventData.QuantityEvent.epcClass&&eventData.QuantityEvent.readPoint){
		// var eventDataUtil={EPC:eventData.QuantityEvent.epcClass, readPoint:eventData.QuantityEvent.readPoint}; 
		// if (recordDate){
			// var date=new Date(rule.events[0].data.recordTime);
			// if (date.getTime()<recordDate) {
				// var now=new Date().toISOString();
				// rule.events[0].data.recordTime=now;
				// eval(rule.conditions[0].evaluation);
				// eval(rule.events[0].renovate);
			// }
		// } else {
				// var now=new Date().toISOString();
				// rule.events[0].data.recordTime=now;
			// eval(rule.events[0].renovate);
		// }
	// } else {

				// var now=new Date().toISOString();
				// rule.events[0].data.recordTime=now;
			// eval(rule.events[0].renovate);
	// }
	var fired= 'var recordDate=new Date(eventData.QuantityEvent.recordTime).getTime();\nif(eventData.QuantityEvent.epcClass&&eventData.QuantityEvent.readPoint){\n\tvar eventDataUtil={EPC:eventData.QuantityEvent.epcClass, readPoint:eventData.QuantityEvent.readPoint}; \n\tif (recordDate){\n\t\tvar date=new Date(rule.events[0].data.recordTime);\n\t\tif (date.getTime()<recordDate) {\n\t\t\tvar now=new Date().toISOString();\n\t\t\trule.events[0].data.recordTime=now;\n\t\t\teval(rule.conditions[0].evaluation);\n\t\t\teval(rule.events[0].renovate);\n\t\t}\n\t} else {\n\t\t\tvar now=new Date().toISOString();\n\t\t\trule.events[0].data.recordTime=now;\n\t\teval(rule.events[0].renovate);\n\t}\n} else {\n\t\t\tvar now=new Date().toISOString();\n\t\t\trule.events[0].data.recordTime=now;\n\t\tconsole.log("hello");eval(rule.events[0].renovate);\n}';
	/*
	*Subscribe
	*/
	/*
var date=new Date().toISOString();
rule.events[0].data.recordTime=date;
//xml.subscribir(rule.events[0].data.data.epc,rule.events[0].data.data.arco,rule.events[0].subscriptionId, date);
xml.subscribirQ(rule.events[0].data.data.epc,rule.events[0].data.data.arco,"ALL",null,rule.events[0].subscriptionId, date);
doc.markModified('rules');
doc.save(function(e){
if(e){
setTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);
}
});
	*/
	var subscribe= 'var date=new Date().toISOString();\nrule.events[0].data.recordTime=date;\nxml.subscribirQ(rule.events[0].data.data.epc,rule.events[0].data.data.arco,"ALL",null,rule.events[0].subscriptionId, date);\ndoc.markModified(\'rules\');\ndoc.save(function(e){\n\t\tif(e){\n\t\t\tsetTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);\n\t\t}\n\t});';
	/*
	*Unsubscribe
	*/
	// xml.unsubscribe(rule.events[0].subscriptionId, function(){
		// doc.markModified('rules');
		// doc.save(function(e){
			// if(e){
				// setTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);
			// }
		// });
	// });
		
	var unsubscribe= 'xml.unsubscribe(rule.events[0].subscriptionId, function(){\n\tdoc.markModified(\'rules\');\n\tdoc.save(function(e){\n\t\tif(e){\n\t\t\tsetTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);\n\t\t}\n\t});\n});';
	/*
	*Renovate
	*/

	/*
//xml.renovate(rule.events[0].data.data.epc,rule.events[0].data.data.arco,rule.events[0].subscriptionId, rule.events[0].data.recordTime, function() {
xml.renovateQ(rule.events[0].data.data.epc,rule.events[0].data.data.arco,"ALL",null,rule.events[0].subscriptionId, rule.events[0].data.recordTime, function() {
doc.markModified('rules');
doc.save(function(e){
	if(e){
		setTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);
	}
});
});
	*/
	var renovate = 'xml.renovateQ(rule.events[0].data.data.epc,rule.events[0].data.data.arco,"ALL",null,rule.events[0].subscriptionId, rule.events[0].data.recordTime, function() {\n\tdoc.markModified(\'rules\');\n\tdoc.save(function(e){\n\t\tif(e){\n\t\t\tsetTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);\n\t\t}\n\t});\n});';	
	var t=new EventObject({type:'epcisEvent', subscribe:subscribe, renovate:renovate, unsubscribe:unsubscribe, fired:fired});
		t.save();

	/*
	------epcisLote methods------
	/*
	*Fired
	*/
/*
var recordDate=new Date(eventData.QuantityEvent.recordTime).getTime();
if(eventData.ObjectEvent.epcList&&eventData.QuantityEvent.readPoint){
	var eventDataUtil={EPC:eventData.ObjectEvent.epcList.epc, readPoint:eventData.QuantityEvent.readPoint}; 
	if (recordDate){
		var date=new Date(rule.events[0].data.recordTime);
		if (date.getTime()<recordDate) {
			var now=new Date().toISOString();
			rule.events[0].data.recordTime=now;
			eval(rule.conditions[0].evaluation);
			eval(rule.events[0].renovate);
		}
	} else {
		var now=new Date().toISOString();
		rule.events[0].data.recordTime=now;
		eval(rule.events[0].renovate);
	}
} else {
	var now=new Date().toISOString();
	rule.events[0].data.recordTime=now;
	eval(rule.events[0].renovate);
}
*/
	var fired= 'var recordDate=new Date(eventData.QuantityEvent.recordTime).getTime();\nif(eventData.QuantityEvent.epcClass&&eventData.QuantityEvent.readPoint){\n\tvar eventDataUtil={EPC:eventData.QuantityEvent.epcClass, readPoint:eventData.QuantityEvent.readPoint}; \n\tif (recordDate){\n\t\tvar date=new Date(rule.events[0].data.recordTime);\n\t\tif (date.getTime()<recordDate) {\n\t\t\tvar now=new Date().toISOString();\n\t\t\trule.events[0].data.recordTime=now;\n\t\t\teval(rule.conditions[0].evaluation);\n\t\t\teval(rule.events[0].renovate);\n\t\t}\n\t} else {\n\t\t\tvar now=new Date().toISOString();\n\t\t\trule.events[0].data.recordTime=now;\n\t\teval(rule.events[0].renovate);\n\t}\n} else {\n\t\t\tvar now=new Date().toISOString();\n\t\t\trule.events[0].data.recordTime=now;\n\t\tconsole.log("hello");eval(rule.events[0].renovate);\n}';
	/*
	*Subscribe
	*/
	/*
var date=new Date().toISOString();
rule.events[0].data.recordTime=date;
xml.subscribir(rule.events[0].data.data.epc,rule.events[0].data.data.arco,rule.events[0].subscriptionId, date);
doc.markModified('rules');
doc.save(function(e){
if(e){
setTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);
}
});
	*/
	var subscribe= 'var date=new Date().toISOString();\nrule.events[0].data.recordTime=date;\nxml.subscribir(rule.events[0].data.data.epc,rule.events[0].data.data.arco,rule.events[0].subscriptionId, date);\ndoc.markModified(\'rules\');\ndoc.save(function(e){\n\t\tif(e){\n\t\t\tsetTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);\n\t\t}\n\t});';
	/*
	*Unsubscribe
	*/
	// xml.unsubscribe(rule.events[0].subscriptionId, function(){
		// doc.markModified('rules');
		// doc.save(function(e){
			// if(e){
				// setTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);
			// }
		// });
	// });
		
	var unsubscribe= 'xml.unsubscribe(rule.events[0].subscriptionId, function(){\n\tdoc.markModified(\'rules\');\n\tdoc.save(function(e){\n\t\tif(e){\n\t\t\tsetTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);\n\t\t}\n\t});\n});';
	/*
	*Renovate
	*/

	/*
xml.renovate(rule.events[0].data.data.epc,rule.events[0].data.data.arco,rule.events[0].subscriptionId, rule.events[0].data.recordTime, function() {
doc.markModified('rules');
doc.save(function(e){
if(e){
setTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);
}
});
});
	*/
	var renovate = 'xml.renovate(rule.events[0].data.data.epc,rule.events[0].data.data.arco,null,rule.events[0].subscriptionId, rule.events[0].data.recordTime, function() {\n\tdoc.markModified(\'rules\');\n\tdoc.save(function(e){\n\t\tif(e){\n\t\t\tsetTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);\n\t\t}\n\t});\n});';	
	var t=new EventObject({type:'epcisLote', subscribe:subscribe, renovate:renovate, unsubscribe:unsubscribe, fired:fired});
		t.save();

	/*
	------ActionFireEvent------
	/*
	*Fired
	*/
	//eval(rule.conditions[0].evaluation);
	var fired = 'eval(rule.conditions[0].evaluation);';
	/*
	*Subscribe
	*/
	//null

	var subscribe = null;
	/*
	*Unsubscribe
	*/
	// null

		
	var unsubscribe = null;
	/*
	*Renovate
	*/
	//null
	var renovate=null;
	var t=new EventObject({type:'ActionFireEvent', subscribe:subscribe, renovate:renovate, unsubscribe:unsubscribe, fired:fired});
		t.save();
}
var EventObject=mongoose.model('EventObject', EventObjectSchema);
