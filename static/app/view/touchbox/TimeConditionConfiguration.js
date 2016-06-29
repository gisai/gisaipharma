/*
 * START OF FILE - /app/view/touchbox/TimeEventConfiguration.js
 */		
Ext.define('GisaiPharma.view.touchbox.TimeConditionConfiguration', {
	extend : 'Ext.form.Panel',
	xtype:'timeConditionConf',
	config : {
		layout:'vbox',
		items:[
				{
					xtype: 'fieldset',
					layout:'vbox',
					items: [
						{
							xtype: 'datepickerfield',
							name : 'timeFrom',
							label: 'Date from:',
							value: new Date((new Date).getTime() - (24 * 60 * 60 * 1000)),
							dateFormat: "Y-m-d H:i:s.u",
							picker:{
								yearTo:2012
							}
						},
						{
							xtype: 'datepickerfield',
							name : 'timeTo',
							label: 'Date to:',
							value: new Date((new Date).getTime() + (24 * 60 * 60 * 1000)),
							dateFormat: 'Y-m-d H:i:s.u',
							picker:{
								yearTo:2020
							}
						},
						{
							xtype: 'togglefield',
							name : 'workday',
							label: 'Activate only on working days',
							
						},						
						{
							xtype: 'hiddenfield',
							name : 'timeCondition',
							value:true
							
						},
						{
							xtype:'toolbar',
							items:[

								{
									xtype:'button',
									docked:'bottom',
									itemId:'done',
									text:'Done',
									ui:'confirm',
									cls:'letrabotones',
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
 * END OF FILE - /app/view/touchbox/timeConditionConfiguration.js
 */	


