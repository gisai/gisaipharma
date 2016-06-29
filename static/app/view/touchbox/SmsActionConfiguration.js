/*
 * START OF FILE - /app/view/touchbox/SmsActionConfiguration.js
 */		
Ext.define('GisaiPharma.view.touchbox.SmsActionConfiguration', {
	extend : 'Ext.form.Panel',
	xtype:'smsActionConf',
	config : {
		layout:'vbox',
		items:[
				{
					xtype: 'fieldset',
					layout:'vbox',
					items: [
						{
							xtype: 'textfield',
							name : 'telephoneNumber',
							label: 'Telephone Number:',
							
						},
						{
							xtype: 'textareafield',
							name : 'text',
							label: 'Enter your notification:',
							
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
									itemId:'done'
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
 * END OF FILE - /app/view/touchbox/SmsActionConfiguration.js
 */	


