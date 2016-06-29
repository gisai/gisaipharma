/*
 * START OF FILE - /app/view/touchbox/EpcisEventConfiguration.js
 */		
Ext.define('GisaiPharma.view.touchbox.EpcisEventConfiguration', {
	extend : 'Ext.form.Panel',
	xtype:'epcisEventConf',
	config : {
		layout:'vbox',
		items:[
				{
					xtype: 'fieldset',
					layout:'vbox',
					items: [
						{
							xtype: 'selectfield',
							name : 'epc',
							value:'Paracetamol',
							label: 'Tag:',
							options: [
								{text: 'Aspirin',  value: 'Aspirin',},
								{text: 'Paracetamol', value: 'Paracetamol'},
								{text: 'Ibuprofen',  value: 'Ibuprofen'}
							]
						},
						{
							xtype: 'selectfield',
							name : 'arco',
							value:'urn:epc:id:sgln:00000.00000.rp00',
							label: 'Readpoint:',
							options: [
								{text: 'urn:epc:id:sgln:00000.00000.rp00',  value: 'urn:epc:id:sgln:00000.00000.rp00'},
								{text: 'urn:epc:id:sgln:00000.00000.rp01',  value: 'urn:epc:id:sgln:00000.00000.rp01'},
								{text: 'urn:epc:id:sgln:00000.00000.rp02',  value: 'urn:epc:id:sgln:00000.00000.rp02'},
							]
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
 * END OF FILE - /app/view/touchbox/EpcisEventConfiguration.js
 */	


