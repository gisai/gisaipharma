/*
 * START OF FILE - /app/view/Notifications.js
 */
Ext.define('GisaiPharma.view.Notifications', {
	extend : 'Ext.NavigationView',
	xtype:'notifications',
	config : {
		title : 'Notificaciones',
		iconCls : 'time',
		layout:'card',
		items:[
			{
				xtype:'list',
				itemId:'listaNotificaciones',
				title:'Notificaciones',
				flex:5,
				store:{
					storeId:'MyNotificationStore',
					fields: ['txt' , 'date'],
					grouper: 'date',
				},
				itemTpl: '<div class="message">{txt}</div>',
				grouped:true,
			}
		]
	}
});
/*
 * END OF FILE - /app/view/Notifications.js
 */			
			