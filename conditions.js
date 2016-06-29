
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ConditionObjectSchema= new Schema({
	type: {type: String},
	evaluation: {type: String}
});



ConditionObjectSchema.statics.go=function go(){

	var t=new ConditionObject({type:'noCondition', evaluation:'eval(rule.actions[0].action)'});
	t.save(function(e){if(e)console.log(e);});
	
// var now=new Date();
// var nowString=now.toISOString();
// console.log('Comprobacion condicion de tiempo');
// if(nowString<rule.conditions[0].data.data.timeTo&&nowString>rule.conditions[0].data.data.timeFrom) {
	// if(rule.conditions[0].data.data.workday){
		// console.log(now.getDay());
		// if(1<=now.getDay()&&now.getDay()<=5){
			// console.log('Se cumple la condicion! y es dia de diario, Ejecuto!');
			// eval(rule.actions[0].action);
		// }
	// } else {
	// console.log('Se cumple la condicion!, Ejecuto!');
		 // eval(rule.actions[0].action);
	// }
// }
	var myVariable = 'var now=new Date();\nvar nowString=now.toISOString();\nconsole.log(\'Comprobacion condicion de tiempo\');\nif(nowString<rule.conditions[0].data.data.timeTo&&nowString>rule.conditions[0].data.data.timeFrom) {\n\tif(rule.conditions[0].data.data.workday){\n\t\tconsole.log(now.getDay());\n\t\tif(1<=now.getDay()&&now.getDay()<=5){\n\t\t\tconsole.log(\'Se cumple la condicion! y es dia de diario, Ejecuto!\');\n\t\t\teval(rule.actions[0].action);\n\t\t}\n\t} else {\n\tconsole.log(\'Se cumple la condicion!, Ejecuto!\');\n\t\t eval(rule.actions[0].action);\n\t}\n}';
	var t=new ConditionObject({type:'timeCondition', evaluation:myVariable});
	t.save(function(e){if(e)console.log(e);});
	
	
// rule.conditions[0].data.data.actualCount++;
// if(rule.conditions[0].data.data.actualCount==rule.conditions[0].data.data.count){
	// rule.conditions[0].data.data.actualCount=0;
		// doc.markModified('rules');
			// doc.save(function(e){
		// if(e){
			// setTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);
		// }
	// });eval(rule.actions[0].action);
// }else{
// doc.markModified('rules');
	// doc.save(function(e){
	// if(e){
		// setTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);
	// }
	// });}
	var myVariable = 'rule.conditions[0].data.data.actualCount++;\nif(rule.conditions[0].data.data.actualCount==rule.conditions[0].data.data.count){\n\trule.conditions[0].data.data.actualCount=0;\n\t\tdoc.markModified(\'rules\');\n\t\t\tdoc.save(function(e){\n\t\tif(e){\n\t\t\tsetTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);\n\t\t}\n\t});eval(rule.actions[0].action);\n}else{\ndoc.markModified(\'rules\');\n\tdoc.save(function(e){\n\tif(e){\n\t\tsetTimeout (function(){retrySave(rule,owner,servicerule_id)}, Math.random()*500);\n\t}\n\t});}';
	var t=new ConditionObject({type:'countCondition', evaluation:myVariable});
	t.save(function(e){if(e)console.log(e);});
/*
	
*/
/*
var now=new Date(eventDataUtil.caducidad);
var date = new Date();
if(date < now){
	eval(rule.actions[0].action)
}
*/
	var t=new ConditionObject({type:'caducidadCondition', evaluation:'var now=new Date(eventDataUtil.caducidad);var date = new Date();if(date < now){eval(rule.actions[0].action)}'});
	t.save(function(e){if(e)console.log(e);});
}
var ConditionObject=mongoose.model('ConditionObject', ConditionObjectSchema);
