/*
 * END OF FILE - /app/model/Condition.js
 */
Ext.define('GisaiPharma.model.Condition', {
	extend : 'Ext.data.Model',
	config : {
	fields : [
			{
				name:'configured',
				type:'boolean'
			},
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
				model:'GisaiPharma.model.Touchbox',
				name:'touchboxes'
			},
			{
				type:'belongsTo',
				model:'GisaiPharma.model.Service',
				name:'service'
			},
		],
		proxy: 	{
			type: 'rest',
			url : 'user/'+username+'/condition',
			noCache:false,
			appendId:false
		},
	},
});
/*
 * END OF FILE - /app/model/Condition.js
 */