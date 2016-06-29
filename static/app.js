 /*
 * START OF FILE - /app.js
 */

Ext.Loader.setPath({'Ext':'sdk/src'});
Ext.application({
	name : 'GisaiPharma',
	requires:['GisaiPharma.model.ServiceRule', 'Ext.field.Hidden','GisaiPharma.model.Service','Ext.dataview.List','Ext.data.Store','Ext.field.Toggle','Ext.form.FieldSet','Ext.field.DatePicker','Ext.field.Select'],
	controllers : [ 'ServiceCreationMenu','Playground','Touchbox', 'Chat', 'Notifications','ServicesMonitor'],
	views : [ 'Main','Popout', 'playground.Playground', 'Info','Notifications', 'Chat', 'touchbox.Touchbox','servicecreationmenu.ServiceCreationMenu','servicesmonitor.ServicesMonitor','servicesmonitor.ActiveService','servicesmonitor.UnactiveService', 'playground.EventSelection', 'playground.ConditionSelection', 'playground.ActionSelection','touchbox.EpcisQuantityEventConfiguration','touchbox.EpcisEventConfiguration','touchbox.TimeConditionConfiguration','touchbox.SmsActionConfiguration', 'touchbox.EmailActionConfiguration','touchbox.ReportActionConfiguration','touchbox.CountConditionConfiguration','servicecreationmenu.LoadList','servicecreationmenu.DeleteList','servicecreationmenu.TemplateList'],
	models:['Touchbox', 'Service', 'Connection','Event', 'Condition', 'Action','ServiceRule','EcaRule','EventRule', 'ConditionRule', 'ActionRule'],
	launch : function() {
		jsPlumb.setRenderMode(jsPlumb.CANVAS);
		Ext.Viewport.add({
			xtype:'main',
			items : [ 
			{
				xtype : 'info',
			},
			{
				xtype:'servicecreationmenu'
			},
			{
				xtype:'servicesmonitor'
			},
			{
				xtype:'notifications'
			},
			{
				xtype:'chat'
			},	
			]
		});
		Ext.defer(function(){
		socketsession.on('alarm', function (data) {
			Ext.data.StoreManager.lookup('MyNotificationStore').add({txt: data, date:new Date()});
			var boton=Ext.ComponentQuery.query('main button')[3]
			boton.setBadgeText(boton.getBadgeText()+1);
			boton.on('tap', function(){
				this.setBadgeText(null);
			});
		});
			
		socketsession.on('chatmessage', function (data) {
			Ext.data.StoreManager.lookup('MyChatStore').add({txt: data, date:new Date()});
			var boton=Ext.ComponentQuery.query('main button')[4]
			boton.setBadgeText(boton.getBadgeText()+1);
			boton.on('tap', function(){
				this.setBadgeText(null);
			});
		});},5000);
	},
	//TODO
	logger: {
        enabled: true,
        xclass: 'Ext.log.Logger',
        minPriority: 'verbose',
        writers: {
            console: {
                xclass: 'Ext.log.writer.Console',
                throwOnErrors: true,
                formatter: {
                    xclass: 'Ext.log.formatter.Default'
                }
            }
        }
    }
});

/*
 * END OF FILE - /app.js
 */