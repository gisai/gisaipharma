
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TouchboxSchema = new Schema ({
	identificator: {type: String},
	id:{type:String},
	coordinateX: {type: String},
	coordinateY:{type: String},
	type:{type:String},
	event:[EventSchema],
	condition: [ConditionSchema],
	action:[ActionSchema]
});
var ConnectionSchema =new Schema ({
	origin: {type: String},
	destination: {type: String},
});

var ServiceSchema = new Schema({
	id: {type: String},
	owner:{type: String},
	description:{type:String},
	shared:{type:Boolean},
	touchboxes: [TouchboxSchema],
	connections: [ConnectionSchema]
	
});
var EventSchema = new Schema({
data:{}
});

var ConditionSchema = new Schema({
data:{}
});

var ActionSchema = new Schema({
data:{}
});


ServiceSchema.statics.save= function save (id, owner, req, callback) {
	console.log("sevices_save");
	Service.findOne({id:id, owner:owner}, function(err, docs){
		if(err)console.log(err);
		if(!docs){
			var t=new Service({id:id, owner:owner, description:req.body.description, shared:req.body.shared});
			t.save(function(e){if(e)console.log(e);})
			callback(true);
		 } else {
			docs.remove();
			var t=new Service({id:id, owner:owner,description:req.body.description, shared:req.body.shared});
			t.save(function(e){if(e)console.log(e);})
			callback(true);
		}
	});
};

ServiceSchema.statics.destroy= function destroy (id, owner, callback) {
	console.log("sevices_destroy");
	Service.findOne({id:id, owner:owner}, function(err, docs){
		if(err)console.log(err);
		if(docs){
			docs.remove();
			callback(true);
		 } else {
			callback(null);
		}
	});
};

ServiceSchema.statics.load= function load (query,callback) {
	console.log("sevices_load");
	Service.find(query, function(err, docs){
		if(err)console.log(err);
		callback(docs);	
	});
};

ServiceSchema.statics.saveTouchbox= function saveTouchbox (owner, req_body, callback) {
	console.log("sevices_saveTouchbox");
	Service.findOne({owner:owner, id:req_body.service_id,}, function(err, doc){
		if(err)console.log(err);
		if(doc){
			doc.touchboxes.push({id:req_body.id, identificator:req_body.identificator, coordinateX:req_body.coordinateX, coordinateY: req_body.coordinateY, type:req_body.type });
			doc.save(function(e){if(e)console.log(e);});
			callback(true);
		} else {
			callback(false);
		}
	});
};

ServiceSchema.statics.saveEvent=function saveEvent(owner, req_body, callback){
	console.log("sevices_saveEvent");
	Service.findOne({owner: owner, id:req_body.service_id}, function (err,doc){
		if(err)console.log(err);
		if(doc){
			doc.touchboxes.forEach(function(touchbox){
				if (touchbox.id==req_body.touchbox_id){
					touchbox.event.push(req_body);
				}
			});
			doc.save(function(e){if(e)console.log(e);});
			callback(true);
		} else {
			callback(false);
		}
	});
};

ServiceSchema.statics.saveCondition=function saveCondition(owner, req_body, callback){
	console.log("sevices_saveCondition");
	Service.findOne({owner: owner, id:req_body.service_id}, function (err,doc){
		if(err)console.log(err);
		if(doc){
			doc.touchboxes.forEach(function(touchbox){
				if (touchbox.id==req_body.touchbox_id){
					touchbox.condition.push(req_body);
				}
			});
			doc.save(function(e){if(e)console.log(e);});
			callback(true);
		} else {
			callback(false);
		}
	});
};

ServiceSchema.statics.saveAction=function saveAction(owner, req_body, callback){
	console.log("sevices_saveAction");
	Service.findOne({owner: owner, id:req_body.service_id}, function (err,doc){
		if(err)console.log(err);
		if(doc){
			doc.touchboxes.forEach(function(touchbox){
				if (touchbox.id==req_body.touchbox_id){
					touchbox.action.push(req_body);
				}
			});
			doc.save(function(e){if(e)console.log(e);});
			callback(true);
		} else {
			callback(false);
		}
	});
};

ServiceSchema.statics.saveConnection= function saveConnection (owner, req_body, callback) {
	console.log("sevices_saveConnection");
		Service.findOne({owner:owner, id:req_body.service_id, 'connections.origin': req_body.origin, 'connections.destination': req_body.destination}, function(err, doc){
			if(!doc){
				Service.findOne({owner:owner, id:req_body.service_id}, function(err, doc){
					if(err)console.log(err);
					if(doc){
						doc.connections.push({origin:req_body.origin, destination: req_body.destination});
						doc.save(function(e){if(e)console.log(e);});
						callback(true);
					}else{
						callback(false);
					}
				});
		} else {
			callback(false);
		}
	});
};

var Service=mongoose.model('Service', ServiceSchema);

