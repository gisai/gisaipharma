/*
 * START OF FILE - /app/view/touchbox/CountConditionConfiguration.js
 */		
Ext.define('GisaiPharma.view.touchbox.CountConditionConfiguration', {
	extend : 'Ext.form.Panel',
	xtype:'countConditionConf',
	config : {
		layout:'vbox',
		items:[
				{
					xtype: 'fieldset',
					layout:'vbox',
					items: [
					{
							xtype: 'selectfield',
							name : 'count',
							label: 'Number of times:',
							options: [
								{text: 'Two times...',  value: 2},
								{text: 'Three times...', value: 3},
								{text: 'Four times...',  value: 4}
							]	
					},							
						{
							xtype: 'hiddenfield',
							name : 'actualCount',
							value:0
							
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
 * END OF FILE - /app/view/touchbox/CountConditionConfiguration.js
 */	


