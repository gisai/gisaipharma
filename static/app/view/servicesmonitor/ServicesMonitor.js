/*
 * START OF FILE - /app/view/servicesmonitor/ServicesList.js
 */

Ext.define('GisaiPharma.view.servicesmonitor.ServicesMonitor', {
	extend : 'Ext.NavigationView',
	xtype:'servicesmonitor',
	id:'servicesmonitor',
	config : {
		title : 'Configurar',
		iconCls : 'settings',
		layout:'card',
		items:[
			{
				title:'Estado de los servicios',
				xtype:'list',
				store:{
					autoLoad:true,
					model: 'GisaiPharma.model.ServiceRule',
					proxy: {
						type: 'rest',
						url : '/user/'+username+'/loadservicerules',
						reader: {
							type: 'json',
						}
					},
				},
				itemTpl:'<div style="text-align:center">{id}<tpl if="active == true"> est&#225 activado</tpl><tpl if="active == false"> est&#225 desactivado</tpl></div>',
				flex:2,
			}
		]
	}
});
// /*
 // * END OF FILE - /app/view/servicesmonitor/ServicesList.js
 // */			

		



