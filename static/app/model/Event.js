/*
 * END OF FILE - /app/model/Event.js
 */
Ext.define('GisaiPharma.model.Event', {
	extend : 'Ext.data.Model',
	config : {
	fields : [
			{
				name:'type',
				type:'string'
			},
			{
				name:'configured',
				type:'boolean'
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
			name:'touchbox'
		},
		{
			type:'belongsTo',
			model:'GisaiPharma.model.Service',
			name:'service'
		},
	],

	proxy: 	{
			type: 'rest',
			url : 'user/'+username+'/event',
			noCache:false,
			appendId:false
		},
	},
});
/*
 * END OF FILE - /app/model/Event.js
 */