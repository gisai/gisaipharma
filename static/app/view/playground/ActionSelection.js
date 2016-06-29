/*
 * START OF FILE - /app/view/playground/ActionSelection.js
 */
Ext.define('GisaiPharma.view.playground.ActionSelection', {
	extend : 'Ext.Container',
	xtype:'actionselection',
	config : {
		title : 'Select Action',
		layout:'vbox',
		items:[
			{
				xtype:'list',
				flex:5,
				store:  {
					fields: ['name', 'url', 'type'],
					data: [
					   { name: 'Notificaci&#243n', url: '/img/report.png', type:"reportAction" },
					   { name: 'Notificaci&#243n SMS (inactiva)',   url: '/img/sms.png', type:"smsAction" },
					   { name: 'Notificaci&#243n por e-mail', url:'/img/arroba.png', type:"emailAction"},
					   { name: 'Disparar Evento', url:'/img/switch.jpg', type:"ActionFireEvent"},
				   ],
				},
				itemTpl:'<div><img src={url} style="vertical-align: middle;"  height=50 width=60>  {name}</div>',
			}
		]
	}
});
/*
 * END OF FILE - /app/view/playground/ActionSelection.js
 */			
			