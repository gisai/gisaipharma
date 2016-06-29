/*
 * START OF FILE - /app/model/Query.js
 */
Ext.define('GisaiPharma.model.Connection', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{ 
				name: 'origin', type: 'string'
			},
			{ 
				name: 'destination', type: 'string'
			},
			{
				name:'type', type:'string'
			}
		],
		associations: [
			{
				type:'belongsTo',
				model:'GisaiPharma.model.Service',
				name:'service'
			}
		],
		proxy:
			{
				type: 'rest',
				url : '/user/'+username+'/connection',
				appendId:false,
				noCache:false,
				reader: {
					type: 'json',
					rootPropertyt: 'touchboxes'
				}
			}
	}		
});
/*
 * END OF FILE - /app/model/Query.js
 */