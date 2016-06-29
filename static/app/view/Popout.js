 /*
 * START OF FILE - /app/views/Popout.js
 */
Ext.define('GisaiPharma.view.Popout', {
	extend : 'Ext.Panel',
	xtype : 'popout',
	config:{
		modal:true,
	hideOnMaskTap:true,
	showAnimation:{
		type:'popIn',
		duration:250,
		easing:'ease-out'
	},
	hideAnimation:{
		type:'popOut',
		duration:250,
		easing:'ease-out'
	},
	centered:true,
	width:'500px',
	height:'220px',
	styleHtmlContent:true,
	items:[
		{
			docked:'top',
			xtype:'toolbar',
			title:'GISAI Pharma Help'
		}],
	scrollable:true,
	}
});
/*
 * END OF FILE - /app/views/Popout.js
 */