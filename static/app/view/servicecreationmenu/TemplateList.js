/*
 * START OF FILE - /app/view/servicecreationmenu/TemplateList.js
 */		


Ext.define('GisaiPharma.view.servicecreationmenu.TemplateList', {
	extend:'Ext.List',
	xtype:'templatelist',
	config:{
		itemId:'servListTemplate',
		itemTpl: '<p><b>Nombre de plantilla:</b> {id}</p></br><p><b>Descripci&#243n:</b> {description}</p>',
		grouped: true,
		store:{
			model: 'GisaiPharma.model.Service',
			autoLoad:true,
			grouper:'owner',
			proxy: {
				type: 'rest',
				url : '/user/'+username+'/loadservicetemplate',
				reader: {
					type: 'json',
				}
			},
		}
	}
});

/*
 * END OF FILE - /app/view/servicecreationmenu/TemplateList.js
 */	
