/*
 * END OF FILE - /app/model/Touchbox.js
 */
Ext.define('GisaiPharma.model.Touchbox', {
	extend : 'Ext.data.Model',
	config : {
		fields : [
			{
				name:'identificator',
				type: 'string'
			},
			{
				name : 'type',
				type : 'string'
			}, 
			{
				name : 'coordinateX',
				type : 'int'
			}, 
			{
				name : 'coordinateY',
				type : 'int'
			},
			
		],
		proxy: 	
			{
				type: 'rest',
				url : 'user/'+username+'/touchbox',
				noCache:false,
				appendId:false
			},
		associations: [
			{
				type:'belongsTo',
				model:'GisaiPharma.model.Service',
				name:'service'
			},
			{
				type:'hasOne',
				model:'GisaiPharma.model.Event',
				name:'event'
			},
			{
				type:'hasOne',
				model:'GisaiPharma.model.Condition',
				name:'condition'
			},
			{
				type:'hasOne',
				model:'GisaiPharma.model.Action',
				name:'action'
			}
		]
	},
});
/*
 * END OF FILE - /app/model/Touchbox.js
 */