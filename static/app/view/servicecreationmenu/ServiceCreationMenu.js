 /*
 * START OF FILE - /app/view/servicecreationmenu/ServiceCreationMenu.js
 */
Ext.define('GisaiPharma.view.servicecreationmenu.ServiceCreationMenu', {
	extend : 'Ext.NavigationView',
	xtype : 'servicecreationmenu',
	id:'serviceCreationMenu',
	onBackButtonTap: function(){backButtonSelection();},
	config: {
		title: 'Servicios',
		iconCls: 'star',
		id:'serviceCreationMenu',
		autoDestroy: true,
		items: [
			{
				xtype:'container',
				title:'Selecccione',
				
				cls: 'info',
				layout:{
					type: 'vbox',
					pack:'center',
					align:'stretch',
				},
				items:[
					{
						xtype:'spacer',
						flex:1,

					},
					{
						xtype:'button',
						text:'Crear Servicio',
						id:'serviceCreation',
						flex:3,
						cls:'letrabotones',
						iconMask:true,
						iconCls:'add',
					},
					{
						xtype:'spacer',
						flex:1,
					},
					{
						xtype:'button',
						text:'Cargar Servicio',
						id:'serviceLoad',
						flex:3,
						cls:'letrabotones',
						iconMask:true,
						iconCls:'refresh',
					},
					{
						xtype:'spacer',
						flex:1,

					},
					{
						xtype:'button',
						html:'Crear Servicio desde Plantilla',
						id:'serviceTemplate',
						flex:3,
						cls:'letrabotones',
						iconMask:true,
					    iconCls:'compose',
					},
					{
						xtype:'spacer',
						flex:1,
						cls:'letrabotones'
					},
					{
						xtype:'button',
						text:'Eliminar Servicio',
						id:'deleteService',
						ui:'decline',
						flex:3,
						cls:'letrabotones',
						iconMask:true,
						iconCls:'trash',
					},
					{
						xtype:'spacer',
						flex:1,
						cls:'letrabotones'
					},
				]
			}
		],
	},
});
/*
 * END OF FILE - /app/view/servicecreationmenu/ServiceCreationMenu.js
 */
