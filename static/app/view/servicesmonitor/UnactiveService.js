/*
 * START OF FILE - /app/view/servicesmonitor/UnctiveService.js
 */

Ext.define('GisaiPharma.view.servicesmonitor.UnactiveService',{
	extend:'Ext.Panel',
	xtype:'unactiveservice',
	config:{
		records:{},
		layout:'vbox',
		cls:'servicemonitor',
		items:[
			{
				flex:1,
				xtype:'formpanel',
				padding:0,
				items:[
						{
						xtype:'button',
						flex:1,
						text:'Activar',
						cls:'letrabotones',
						ui:'confirm',
						itemId:'activateservicebutton',
					},
					{
						xtype:'panel',
						itemId:'unactiveinfopanel',
						flex:1,
						cls:'letrabotones',
					}
				]
			}
		]
	},
	constructor: function(){
	 	 this.callParent(arguments);
		 this.initConfig(arguments);
		 
	}
});

// /*
 // * END OF FILE - /app/view/servicesmonitor/UnactiveService.js
 // */			

		



