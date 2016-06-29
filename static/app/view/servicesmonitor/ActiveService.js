/*
 * START OF FILE - /app/view/servicesmonitor/ActiveService.js
 */

Ext.define('GisaiPharma.view.servicesmonitor.ActiveService',{
	extend:'Ext.Panel',
	xtype:'activeservice',
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
						text:'Desactivar',
						cls:'letrabotones',
						ui:'decline',
						itemId:'desactivateservicebutton',
					},
					{
						xtype:'panel',
						itemId:'activeinfopanel',
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
 // * END OF FILE - /app/view/servicesmonitor/ActiveService.js
 // */			

		



