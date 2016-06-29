/*,
 * START OF FILE - /app/model/Service.js
 */
Ext.define('GisaiPharma.model.Service', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{
				name:'id',
				type:'string'
			},
			{ 
				name: 'owner',
				type: 'string'
			},
			{
				name:'description',
				type:'string'
			},
			{
				name:'shared',
				type:'boolean',
				defaultValue:false
			}
		],
		associations:[
			{
				type:'hasMany',
				model:'GisaiPharma.model.Touchbox',
				name: 'touchboxes',
	
			},
			{
				type:'hasMany',
				model:'GisaiPharma.model.Connection',
				name:'connections',

			}
		],
		proxy: {
            type: 'rest',
            url : 'user/'+username+'/service/',
			noCache:false,
            reader: {
                type: 'json',
                rootProperty: 'touchboxes'
            }
        }		
	}
});
/*
 * END OF FILE - /app/model/Service.js
 */