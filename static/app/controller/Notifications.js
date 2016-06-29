/*
 * START OF FILE - /app/controller/Notifications.js
 */
Ext.define('GisaiPharma.controller.Notifications', {
    extend: 'Ext.app.Controller',
    config: {
		control: {
			listaNotificaciones:{
				addrecords: 'listaNotificacionesAddRecord',
			}
		},
		refs: {
			listaNotificaciones:'list #listaNotificaciones'
		}
	},
	listaNotificacionesAddRecord:function(){
		Ext.defer(function() {
			Ext.getCmp('listaNotificaciones').getScrollable().getScroller().scrollToEnd();
		},100);
		
	}
});
/*
 * END OF FILE - /app/controller/Notifications.js
 */			
			