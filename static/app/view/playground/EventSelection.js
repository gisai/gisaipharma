/*
 * START OF FILE - /app/view/playground/EventSelection.js
 */
Ext.define('GisaiPharma.view.playground.EventSelection', {
	extend : 'Ext.Container',
	xtype:'eventselection',
	config : {
		title : 'Select Event',
		layout:'vbox',
		items:[
			{
				xtype:'list',
				flex:5,
				store:{
					fields: ['name', 'url', 'type'],
					data: [
						{ name: 'RFID Read',   url: '/img/arco1.png', type:"epcisEvent" },
						{ name: 'Data (inactivo)', url:'/img/database.png', type:"databaseEvent"},
						{ name: 'Data Inventory', url:'/img/inventory.jpg', type:"epcisQuantityEvent"},
					]
				},
				itemTpl:'<div><img src={url} style="vertical-align: middle;"  height=50 width=60>  {name}</div>',
			}
		]
	}
});
/*
 * END OF FILE - /app/view/playground/EventSelection.js
 */			
			