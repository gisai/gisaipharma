/*
 * START OF FILE - /app/model/EcaRule.js
 */
Ext.define('GisaiPharma.model.EcaRule', {
	extend: 'Ext.data.Model',
	config: {
		associations: [
			{
				type:'belongsTo',
				model:'GisaiPharma.model.ServiceRule',
				name:'servicerule'
			},
			{
				type:'hasOne',
				model:'GisaiPharma.model.EventRule',
				name:'eventrule'
			},
			{
				type:'hasOne',
				model:'GisaiPharma.model.ConditionRule',
				name:'conditionrule'
			},
			{
				type:'hasOne',
				model:'GisaiPharma.model.ActionRule',
				name:'actionrule'
			},
		],
		proxy: 	{
			type: 'rest',
			url : 'user/'+username+'/ecarule',
			noCache:false,
			appendId:false
		},
	}
});
/*
 * END OF FILE - /app/model/EcaRule.js
 */