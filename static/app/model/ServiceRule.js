/*,
 * START OF FILE - /app/model/ServiceRule.js
 */
Ext.define('GisaiPharma.model.ServiceRule', {
	extend: 'Ext.data.Model',
	config: {
		fields:[
			{
				name:'id',
				type:'string'
			},
			{
				name:'active',
				type:'boolean'
			},
			{
				name:'description',
				type:'string'
			}
		],
		associations:[
			{
				type:'hasMany',
				model:'GisaiPharma.model.EcaRule',
				name: 'ecarules',
	
			},
			
		],
		proxy: {
            type: 'rest',
            url : 'user/'+username+'/servicerule/',
			noCache:false,
			appendId:false,
            reader: {
                type: 'json',
                rootProperty: 'ecarules'
            }
        }		
	}
});
/*
 * END OF FILE - /app/model/ServiceRule.js
 */