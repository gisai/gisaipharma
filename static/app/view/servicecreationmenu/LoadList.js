/*
 * START OF FILE - /app/view/servicecreationmenu/LoadList.js
 */		


Ext.define('GisaiPharma.view.servicecreationmenu.LoadList', {
	extend:'Ext.List',
	xtype:'loadlist',
	config:{
		itemTpl: '{id}',
		store:{
			autoLoad:true,
			model: 'GisaiPharma.model.Service',
			proxy: {
				type: 'rest',
				url : '/user/'+username+'/loadservice',
				reader: {
					type: 'json',
				}
			},
		}
	}
});

/*
 * END OF FILE - /app/view/servicecreationmenu/LoadList.js
 */	
