 /*
 * START OF FILE - /app/view/Playground.js
 */



Ext.define('GisaiPharma.view.playground.Playground', {
	extend : 'Ext.Container',
	scrollable:true,
	xtype:'playground',
	config : {
		iconCls : 'star',
		layout : 'vbox',
		items : [ 
		    {
				xtype:'panel',
				cls : 'cuadricula',
				itemId : 'whiteboard',
				flex : '1',
				scrollable:true,
			}, 
		    {
				xtype : 'toolbar',
				docked : 'top',
				itemId : 'toolbar',
				layout : {
					type : 'hbox',
					align : 'center'
				},
				items : [
				{
					text : 'Componentes (Eventos)',
					flex : "1",
					itemId : "eventButton"
				}, {
					text : 'Condiciones',
					flex : "1",
					itemId : "conditionButton"
				}, {
					text : 'Actions1',
					flex : "1",
					itemId : "actionButton"
				}, 
				{
					text : 'Ayuda',
					flex : "1",
					itemId : "ayudaButton"
				},
				]
			} 
		]
	}
});

/*
 * END OF FILE - /app/view/Playground.js
 */
