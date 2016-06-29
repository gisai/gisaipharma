/*
 * START OF FILE - /app/view/touchbox/EmailActionConfiguration.js
 */		
Ext.define('GisaiPharma.view.touchbox.EmailActionConfiguration', {
	extend : 'Ext.form.Panel',
	xtype:'emailActionConf',
	config : {
		layout:'vbox',
		items:[
				{
					xtype: 'fieldset',
					layout:'vbox',
					items: [
						{
							xtype: 'textfield',
							name : 'emailAddress',
							label: 'E-mail:',
							
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
 * END OF FILE - /app/view/touchbox/EmailActionConfiguration.js
 */	


