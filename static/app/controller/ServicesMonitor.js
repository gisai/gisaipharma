/*
 * START OF FILE - /app/controller/ServicesMonitor.js
 */
 Ext.define('GisaiPharma.controller.ServicesMonitor', {
	 extend: 'Ext.app.Controller',
	 config: {
		control: {
			servicesMonitorList: {
				select:'monitorListSelection',
				show:'listRefresh'
			},
			desactivateServiceButton:{
				tap:'desactivateServiceButtonSelection',
			},
			activateServiceButton: {
				tap:'activateServiceButtonSelection'
			}
		},
		refs: {
			servicesMonitorList: 'servicesmonitor list',
			desactivateServiceButton:'activeservice #desactivateservicebutton',
			activateServiceButton:'unactiveservice #activateservicebutton'
		},
	},
	listRefresh:function(lista){
		Ext.getCmp(lista.id).getStore().load();
	},
	monitorListSelection:function (view, records){
		view.deselect(records);
		if(records.data.active){			
			Ext.getCmp('servicesmonitor').push(Ext.create('GisaiPharma.view.servicesmonitor.ActiveService',{records:records}));
			Ext.ComponentQuery.query('activeservice panel')[0].setHtml('<p><b>Nombre de servicio</b>: '+records.data.id+'</p></p></br><p><b>Esta funcionando:</b> '+ (records.data.active ? "Si" : "No")+'</p></br><p><b>Descripci&#243n</b>: '+records.data.description+'</p></p>');
		
		} else {
			Ext.getCmp('servicesmonitor').push(Ext.create('GisaiPharma.view.servicesmonitor.UnactiveService',{records:records}));
			Ext.ComponentQuery.query('unactiveservice panel')[0].setHtml('<p><b>Nombre de servicio</b>: '+records.data.id+'</p></p></br><p><b>Esta funcionando:</b> '+ (records.data.active ? "Si" : "No")+'</p></br><p><b>Descripci&#243n</b>: '+records.data.description+'</p></p>');
		}
	},
	desactivateServiceButtonSelection: function(boton){
		boton.getParent().submit({
			url: '/user/'+username+'/desactivateservicerule/'+boton.getParent().getParent().getRecords().data.id,
			method: 'POST',
			success: function(form,result) {
				Ext.ComponentQuery.query('servicesmonitor list')[0].getStore().load();
				Ext.getCmp('servicesmonitor').pop();
			},
			failure: function(response){
				console.log(response);	
			}
		});
	},
	activateServiceButtonSelection: function(boton){
		boton.getParent().submit({
			url: '/user/'+username+'/activateservicerule/'+boton.getParent().getParent().getRecords().data.id,
			method: 'POST',
			success: function(form,result) {
			
				Ext.ComponentQuery.query('servicesmonitor list')[0].getStore().load();
				Ext.getCmp('servicesmonitor').pop();
			},
			failure: function(response){
				console.log(response);	
			}
		});
	}
});
/*
 * END OF FILE - /app/controller/ServicesMonitor.js
 */