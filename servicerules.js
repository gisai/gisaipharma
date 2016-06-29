var xml = require('./xml');
conexiones=[];
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventRuleSchema = new Schema({
	subscribe:{},
	unsubscribe:{},
	renovate:{},
	fired:{},
	subscriptionId:{},
	data:{},
});


var ConditionRuleSchema = new Schema({
	data:{},
	evaluation:{}
});
//action schemas

var ActionRuleSchema= new Schema({
	action:{},
	data:{},
});
//rule schema
var RuleSchema = new Schema({
	id:{type: String},
	events:[EventRuleSchema],
	conditions:[ConditionRuleSchema],
	actions:[ActionRuleSchema]
});

var ServiceRulesSchema = new Schema({
	
	active:{type:Boolean},
	id:{type: String},
	owner: {type: String},
	description: {type:String},
	rules:[RuleSchema]
});

ServiceRulesSchema.statics.save= function save (req_body, owner, callback) {
	console.log("Salvando regla: " + req_body.id + ", owner: " + owner);
	console.log(req_body);
	ServiceRules.findOne({id:req_body.id, owner:owner}, function(err, docs){
		if(err)console.log(err);
		if(!docs){
			var t=new ServiceRules({id:req_body.id, owner:owner, description:req_body.description, active: false});
			t.save(function(e){if(e)console.log(e);});
			callback(true);
		 } else {
			ServiceRules.desactivateServiceRules(owner, req_body.id,  function(){
				docs.remove();
				var t=new ServiceRules({id:req_body.id, owner:owner, description:req_body.description,active:false});
				t.save(function(e){if(e)console.log(e);});
				callback(true);
			});
		} 
	});
};

ServiceRulesSchema.statics.destroy= function destroy (id, owner, callback) {
	ServiceRules.findOne({id:id, owner:owner}, function(err, docs){
		if(err)console.log(err);
		if(docs){
			ServiceRules.desactivateServiceRules(owner, id,  function(t){
				docs.remove();
				callback(true);
			});
		 } else {
			callback(null);
		}
	});
};

ServiceRulesSchema.statics.load= function load (query,callback) {
		ServiceRules.find(query, function(err, docs){
			if(err)console.log(err);
		if(docs)
		callback(docs);	
		else
		callback(err);
	});
};

ServiceRulesSchema.statics.saveEcaRule= function saveEcaRule (owner, req_body, callback) {
	console.log("servicerules_saveEcaRule");
	ServiceRules.findOne({owner:owner, id:req_body.servicerule_id}, function(err, doc){
		if(err)console.log(err);
		if(doc){
			doc.rules.push(new Rule({id:req_body.id}));
			doc.save(function(e){if(e)console.log(e);});
			callback(true);
		} else {
			callback(false);
		}
	});
};

ServiceRulesSchema.statics.saveEventRule=function saveEventRule(owner, req_body, event, callback){
	console.log("servicerules_saveEventRule");
	if (event == null){
		console.log('FATAL ERROR!! Event is null.');
		console.log('rule id: '+ req_body.servicerule_id+'\n');
		//callback(false);//return;
	}
	ServiceRules.findOne({owner: owner, id:req_body.servicerule_id}, function (err,doc){
		if(err)console.log(err);
		if(doc){
			console.log("servicerules_saveEventRule_found");
			doc.rules.forEach(function(rule){
				console.log("servicerules_saveEventRule_rule");
				console.log(req_body.ecarule_id);
				console.log(rule.id);
				if(req_body.ecarule_id==rule.id){
					var subscriptionId=owner+'_'+req_body.servicerule_id+'_'+rule.id;
					console.log("servicerules_saveEventRule_doc ecarule");
					var er = new EventRule({subscriptionId:subscriptionId, data:req_body, fired:event.fired, subscribe:event.subscribe, unsubscribe:event.unsubscribe, renovate:event.renovate});
					console.log("servicerules_saveEventRule_doc new er");
					rule.events.push(er);
				}
			});
			console.log("servicerules_saveEventRule_doc saving");
			doc.save(function(e){if(e)console.log(e);});
			console.log("servicerules_saveEventRule_doc saved");
			callback(true);			
		} else {
			callback(false);
		}
	});
};

ServiceRulesSchema.statics.saveConditionRule=function saveConditionRule(owner, req_body,evaluation, callback){
	console.log("servicerules_saveConditionRule");
	ServiceRules.findOne({owner: owner, id:req_body.servicerule_id}, function (err,doc){
	if(err)console.log(err);
		if(doc){
			doc.rules.forEach(function(rule){
				if(req_body.ecarule_id==rule.id){
					rule.conditions.push(new ConditionRule({data:req_body, evaluation: evaluation}));
				}
			});
			doc.save(function(e){if(e)console.log(e);});		
			callback(true);			
		} else {
			callback(false);
		}
	});
};

ServiceRulesSchema.statics.saveActionRule=function saveActionRule(owner, req_body, behaviour,  callback){
	console.log("servicerules_saveConditionRule");
	ServiceRules.findOne({owner: owner, id:req_body.servicerule_id}, function (err,doc){
		if(err)console.log(err);
		if(doc){
			doc.rules.forEach(function(rule){
				if(req_body.ecarule_id==rule.id){
				rule.actions.push(new ActionRule({data:req_body, action:behaviour}));
				doc.save(function(e){if(e)console.log(e);});	
				}
			});
			callback(true);			
		} else {
			callback(false);
		}
	});
};
//metodo que activa a partir de el nombre de usuario y el nombre de las reglas de servicio todos los eventos
ServiceRulesSchema.statics.activateServiceRules=function activateServiceRules (owner, servicerule_id,callback){
	console.log('Activando servicio: '+servicerule_id+', Usuario: '+owner);
	ServiceRules.findOne({owner: owner, id:servicerule_id}, function (err,doc){
		if(err)console.log(err);
		if(doc){
			doc.active=true;
			doc.markModified('rules');
			doc.save(function(err){
				if(!err){
					doc.rules.forEach(function(rule){
						console.log("Regla: ",rule);
						if(rule.events[0]){
							console.log("Regla encontrada");
							eval(rule.events[0].subscribe);
						}
					});
					callback(true);
				} else {
					console.log(err);
				}
			});
		} else {
			callback(false);
		}
	});
}

//metodo que desactiva a partir de el nombre de usuario y el nombre de las reglas de servicio todos los eventos
ServiceRulesSchema.statics.desactivateServiceRules=function desactivateServiceRules (owner, servicerule_id,callback){
	console.log('Desactivando servicio: '+servicerule_id+', Usuario: '+owner);
	ServiceRules.findOne({owner: owner, id:servicerule_id}, function (err,doc){
		if(err)console.log(err);
		if(doc){
			doc.active=false;
			doc.markModified('rules');
			doc.save(function(err){
				 if(!err){
					doc.rules.forEach(function(rule){
						if(rule.events[0])
							eval(rule.events[0].unsubscribe);
					});
					callback(true);
				 }
			});
		} else {
			callback(false);
		}
	});
}



ServiceRulesSchema.statics.eventFired=function eventFired (owner, servicerule_id, ecarule_id, eventData){
	console.log("servicerules_eventFired");
	ServiceRules.findOne({owner: owner, id:servicerule_id}, function (err,doc){
		if(err)console.log(err);
		if(doc){
			if(doc.active){
				doc.rules.forEach(function(rule) {
					if(rule.id==ecarule_id){
						eval(rule.events[0].fired);
					}
				});
			}
		}	
	});
}
//Esta función soluciona el acceso multiple a una regla en base de datos!

function retrySave(rule, owner, servicerule_id){

	ServiceRules.findOne({owner: owner, id:rule.actions[0].data.servicerule_id}, function (err,doc2){
		if(doc2){
		doc2.rules.forEach(function(rule2) { //Esto se introduce para evitar problemas sal acceder a una misma regla simultaneamente a la base de datos.
			if(rule2.id==rule.id){
				rule2.conditions[0].data=rule.conditions[0].data;
				rule2.events[0].data=rule.events[0].data;
				rule2.actions[0].data=rule.actions[0].data;
				console.log(rule2.conditions[0].data);
				doc2.markModified('rules');
				doc2.save(function(e){
					if(e){
						setTimeout (function(){retrySave(rule2,owner,servicerule_id)}, Math.random()*1000);
					}else{console.log('salvo'+e);}
				});
			}
		});
		}else{
		setTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*1000);
		}
	});
}
var ServiceRules=mongoose.model('ServiceRules', ServiceRulesSchema);

var Rule=mongoose.model('Rule', RuleSchema);
var EventRule=mongoose.model('EventRule', EventRuleSchema);
var ConditionRule=mongoose.model('ConditionRule', ConditionRuleSchema);
var ActionRule=mongoose.model('ActionRule', ActionRuleSchema);
