/*
 * START OF FILE - /app/view/Chat.js
 */		
Ext.define('GisaiPharma.view.Chat', {
	extend : 'Ext.Container',
	xtype:'chat',
	config : {
		title : 'Chat/Search',
		iconCls : 'user',
		layout:'vbox',
		items:[
			{
				xtype:'list',
				id:'listaChat',
				flex:5,
				store:{
					storeId:'MyChatStore',
					fields: ['txt' , 'date'],
					grouper: 'date',
				},
				itemTpl: '<div class="message">{txt}</div>',
				grouped:true,
				scrollable: {
					direction:'vertical'
				},	
			},
			{
				xtype:'panel',
				scrollable:false,
				items:{
					xtype: 'fieldset',
					title: 'Introduzca mensaje',
					layout:'hbox',
					items: [
						{
							xtype: 'textfield',
							label: 'Mensaje:',
							name: 'mensaje',
							id:'textochat',
							flex:8
						},
						{
							flex:1,
							xtype:'button',
							text:'Send',
							id:'sendChatButton',
							ui: 'confirm',
						}
					]
				}
			}
		]
	}
});
	
/*
 * END OF FILE - /app/view/Chat.js
 */		