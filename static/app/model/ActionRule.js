/*
 * END OF FILE - /app/model/ActionRule.js
 */
Ext.define('GisaiPharma.model.ActionRule', {
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
			}
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
			url : 'user/'+username+'/actionrule',
			noCache:false,
			appendId:false
		},
	},
});
/*
 * END OF FILE - /app/model/Action.js
 */