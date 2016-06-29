/*
 * START OF FILE - /app/view/servicecreationmenu/DeleteList.js
 */		


Ext.define('GisaiPharma.view.servicecreationmenu.DeleteList', {
	extend:'Ext.List',
	xtype:'deletelist',
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
 * END OF FILE - /app/view/servicecreationmenu/DeleteList.js
 */	
