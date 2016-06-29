/*
 * START OF FILE - /app/view/touchbox/Touchbox.js
 */
Ext.define('GisaiPharma.view.touchbox.Touchbox', {
	extend : 'Ext.Panel',
	xtype : 'touchbox',
	config:{
		data:{},
		layout:'hbox',
		docked:'top',
		items:[
			{
				xtype:'toolbar',
				ui:'light',
				docked:'top',
				items:[
					{
						xtype:'button',
						itemId:'touchboxConf',
						iconMask:true,
						iconCls:'add',

					},
					{
						xtype:'button',
						itemId:'touchboxConnection',
						iconMask:true,
						iconCls:'action',
					},	
				]
			}
		]
	},
});
/*
 * END OF FILE - /app/view/touchbox/Touchbox.js
 */
