/*
 * START OF FILE - /app/view/playground/ConditionSelection.js
 */
Ext.define('GisaiPharma.view.playground.ConditionSelection', {
	extend : 'Ext.Container',
	xtype:'conditionselection',
	config : {
		title : 'Select Condition',
		layout:'vbox',
		items:[
			{
				xtype:'list',
				flex:5,
				store:{  
					fields: ['name', 'url', 'type'],
					data: [
					   { name: 'Time condition', url:'/img/stopwatch.gif', type:"timeCondition"},
					   { name: 'Position condition (inactiva)',   url: '/img/globe.png', type:"positionCondition" },
					   { name: 'Count condition',   url: '/img/contador.png', type:"countCondition" },
					   { name: 'No condition',   url: '/img/tick.jpg', type:"noCondition" }	   
					]
				},
				itemTpl:'<div><img src={url} style="vertical-align: middle;"  height=50 width=60>  {name}</div>',
			}
		]
	}
});
/*
 * END OF FILE - /app/view/playground/ConditionSelection.js
 */			
			