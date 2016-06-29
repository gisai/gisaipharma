/*
 * START OF FILE - /app/view/touchbox/EpcisQuantityConfiguration.js
 */		
Ext.define('GisaiPharma.view.touchbox.EpcisQuantityEventConfiguration', {
	extend : 'Ext.form.Panel',
	xtype:'epcisEventQConf',
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
							xtype: 'selectfield',
							name : 'comparador',
							value:'Igual',
							label: 'Comparador:',
							options: [
								{text: 'Igual',  value: 'igual'},
								{text: 'Mayor',  value: 'mayor'},
								{text: 'Menor',  value: 'menor'},
							]
						},
						{
							xtype: 'textfield',
							name : 'cantidad',
							label: 'Numero:',
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
 * END OF FILE - /app/view/touchbox/EpcisQuantityEventConfigurationConfiguration.js
 */	


