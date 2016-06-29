/*
 * START OF FILE - /app/view/touchbox/ReportActionConfiguration.js
 */		
Ext.define('GisaiPharma.view.touchbox.ReportActionConfiguration', {
	extend : 'Ext.form.Panel',
	xtype:'reportActionConf',
	config : {
		layout:'vbox',
		items:[
				{
					xtype: 'fieldset',
					layout:'vbox',
					items: [
						{
							xtype: 'textareafield',
							name : 'text',
							label: 'Introduzca un mensaje',
							
						},
						{
							xtype: 'togglefield',
							name : 'includeInfo',
							label: 'Incluir datos del evento?',
							
						},		
						{
							xtype:'toolbar',
							
							items:[

								{
									xtype:'button',
									docked:'bottom',
									text:'Done',
									ui:'confirm',
									cls:'letrabotones',
									itemId:'done',
								},
							]
						}
					]
			}
		]
	},
	constructor: function(config){
		this.callParent();
		this.setValues(config);
	}
});
/*
 * END OF FILE - /app/view/touchbox/ReportActionConfiguration.js
 */	


