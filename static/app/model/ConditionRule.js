/*
 * END OF FILE - /app/model/ConditionRule.js
 */
Ext.define('GisaiPharma.model.ConditionRule', {
	extend : 'Ext.data.Model',
	config : {
	fields : [
			{
				name:'type',
				type:'string'
			},
			{
				name:'data',
				type:'auto'
			},
		],
		associations: [
			{
				type:'belongsTo',
				model:'GisaiPharma.model.EcaRule',
				name:'ecarule'
			},
			{
			type:'belongsTo',
			model:'GisaiPharma.model.ServiceRule',
			name:'servicerule'
			},
		],
		proxy: 	{
			type: 'rest',
			url : 'user/'+username+'/conditionrule',
			noCache:false,
			appendId:false
		},
	},
});
/*
 * END OF FILE - /app/model/Condition.js
 */