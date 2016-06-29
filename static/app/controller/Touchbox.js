/**
 * START OF FILE - /app/controller/Touchbox.js
 * 
 *
 *En este controlador, se manejan los eventos que se producen al manipular los botones de configuración de un touchbox.
 */
 var touchboxOnConf;		//variable que apunta al touchbox component que está siendo configurado.
 
 Ext.define('GisaiPharma.controller.Touchbox', {
	 extend: 'Ext.app.Controller',
	 config: {
		control: {
			touchboxConf: {
				tap: 'touchboxConfSelection',
			},
			touchboxConnection: {
				tap:'touchboxConnectionSelection'
				
			},
			touchboxDataConfDone:{
				tap:'touchboxDataConfDone'
			}
		},
		refs: {
				touchboxConf: 'touchbox #touchboxConf',
				touchboxConnection:'touchbox #touchboxConnection',
				touchboxDataConfDone:'toolbar #done'
		},
	},
/**
* Maneja la pulsación del botón de configuración de un touchbox. Añade los datos de configuración del componente (si existen) 
* y añade la vista de configuración correspondiente.
*
* @param {object} botonCmp
*/

	touchboxConfSelection: function(botonCmp) {
		outPlaygroundView();
		touchboxOnConf=botonCmp.getParent().getParent();
		var cls=touchboxOnConf.getCls()[0];
		var datos;
		if(touchboxOnConf.data){	
			datos=touchboxOnConf.data.data;
		}		
		switch(cls) {
			case "epcisEvent":
				Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.touchbox.EpcisEventConfiguration',datos));
				break;
			case "epcisQuantityEvent":
				Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.touchbox.EpcisQuantityEventConfiguration',datos));
				break;
			case "databaseEvent":
				Ext.Viewport.add({
					xtype:'popout',
					html:'<p style="text-align:center">Sorry, but  this has no configuration</p>',
				}); 	
				break;

			case "noCondition":
				inPlaygroundView();
				touchboxOnConf.data={data:{data:'nodata'},configured:true};
				createECAModel(touchboxOnConf);
				touchboxOnConf.setStyle(GREENSHADOW);
				break;
			case "positionCondition":
				Ext.Viewport.add({
					xtype:'popout',
					html:'<p style="text-align:center">Sorry, but  this has no configuration</p>',
				}); 	
				break;
			case "timeCondition": 
				if (datos){
				datos.timeTo=new Date(Ext.util.Format.date(datos.timeTo,"m/d/y h:m:s"));
				datos.timeFrom=new Date(Ext.util.Format.date(datos.timeFrom,"m/d/y h:m:s"));}
				console.log(datos);
				Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.touchbox.TimeConditionConfiguration',datos));
				break;
			case "countCondition":
				Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.touchbox.CountConditionConfiguration',datos));
				break;
			case "smsAction":
				Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.touchbox.SmsActionConfiguration',datos));
				break;
			case "emailAction":
				Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.touchbox.EmailActionConfiguration',datos));
				break;
			case "reportAction":
				Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.touchbox.ReportActionConfiguration',datos));
				break;
			case "ActionFireEvent":
				inPlaygroundView();
				touchboxOnConf.data={data:{id:Math.random().toString(36).substring(7)},configured:true};
				createECAModel(touchboxOnConf);
				touchboxOnConf.setStyle(GREENSHADOW);
				break;
		}
	},
	
/**
* Maneja la pulsación del botón de conexión de un touchbox. Elimina el modelo de touchbox existente y añade uno nuevo con los datos de posición, etc. actualizados.
* Crea un ECAModel que almacena en el interior del touchbox model. Añade un conector, y conecta ( si es posible). 
*
* @param {object} botonCmp
*/
	touchboxConnectionSelection: function(botonCmp){
		var touchboxCmp=botonCmp.getParent().getParent();
		setFijo(touchboxCmp.id);
		addConnector(touchboxCmp);
		connect();
		if(!touchboxCmp.data)
			touchboxCmp.data=findTouchBoxData(touchboxCmp);
		removeTouchboxModel(touchboxCmp);
		addTouchboxModel(touchboxCmp);
		createECAModel(touchboxCmp);

	},
	
/**
* Maneja la pulsación del botón "done" que aparece en la pantalla de configuración de un touchbox. Añade un sombreado verde. Marca los datos con "configured":true. Crea el ECA model
* que almacena en el touchbox model.
*
* @param {object} botonCmp
*/
	touchboxDataConfDone: function(botonCmp){
			backButtonSelection();
		touchboxOnConf.setStyle(GREENSHADOW);
		touchboxOnConf.data=jQuery.extend({data:botonCmp.getParent().getParent().getParent().getValues()},{configured:true});
		console.log(touchboxOnConf);
		createECAModel(touchboxOnConf);
	}
});

/**
* Crea un nuevo modelo de Evento, Condición o Acción a partir del class HTML del componente y de los datos que estan dentro del touchbox component
* @param {object} touchboxCmp 
* 
*/
function createECAModel (touchboxCmp){
	var cls=touchboxCmp.getCls()[0];
	var index=myService.touchboxes().find('identificator',touchboxCmp.id);
	var touchboxInstance=myService.touchboxes().getAt(index);
	console.log(touchboxCmp.data);
	switch (cls){
		case 'epcisEvent':
			touchboxCmp.data=jQuery.extend(touchboxCmp.data,{type:'epcisEvent'});
			var ecaModel=Ext.create('GisaiPharma.model.Event', touchboxCmp.data);
			break;
		case 'epcisQuantityEvent':
			touchboxCmp.data=jQuery.extend(touchboxCmp.data,{type:'epcisQuantityEvent'});
			var ecaModel=Ext.create('GisaiPharma.model.Event', touchboxCmp.data);
			break;
		case 'noCondition':
			touchboxCmp.data=jQuery.extend(touchboxCmp.data,{type:'noCondition'});
			var ecaModel=Ext.create('GisaiPharma.model.Condition', touchboxCmp.data);
			break;
		case 'timeCondition':
			touchboxCmp.data=jQuery.extend(touchboxCmp.data,{type:'timeCondition'});
			var ecaModel=Ext.create('GisaiPharma.model.Condition', touchboxCmp.data);
			break;
		case 'countCondition':
			touchboxCmp.data=jQuery.extend(touchboxCmp.data,{type:'countCondition'});
			var ecaModel=Ext.create('GisaiPharma.model.Condition',touchboxCmp.data);
			break;
		case 'smsAction':
			touchboxCmp.data=jQuery.extend(touchboxCmp.data,{type:'smsAction'});
			var ecaModel=Ext.create('GisaiPharma.model.Action', touchboxCmp.data);
			break;
		case 'reportAction':
			touchboxCmp.data=jQuery.extend(touchboxCmp.data,{type:'reportAction'});
			var ecaModel=Ext.create('GisaiPharma.model.Action', touchboxCmp.data);
			break;
		case 'emailAction':
			touchboxCmp.data=jQuery.extend(touchboxCmp.data,{type:'emailAction'});
			var ecaModel=Ext.create('GisaiPharma.model.Action', touchboxCmp.data);
			break;
		case 'ActionFireEvent':
			touchboxCmp.data=jQuery.extend(touchboxCmp.data,{type:'ActionFireEvent'});
			var ecaModel=Ext.create('GisaiPharma.model.Action', touchboxCmp.data);
			var ecaModel2=Ext.create('GisaiPharma.model.Event', touchboxCmp.data);
			break;


	}
	ecaModel.setTouchbox(touchboxInstance);
	ecaModel.setService(touchboxInstance.data.service_id);
	if(ecaModel2){
	ecaModel2.setTouchbox(touchboxInstance);
	ecaModel2.setService(touchboxInstance.data.service_id);
	}
	console.log(touchboxInstance);
};
/**
* Carga un modelo de Evento, Condición o Acción contenido en un touchbox model (se usa para cargar modelos de evento, condición accion ya existentes)
* @param {object} touchboxModel modelo de touchbox 
* 
*/
function loadECAModel (touchboxModel){
	touchboxCmpId=traduccion[touchboxModel.identificator];
	var index=myService.touchboxes().find('identificator',touchboxCmpId);
	var touchboxInstance=myService.touchboxes().getAt(index);
	if(/Event/.test(touchboxModel.type)){
		var ecaModel=Ext.create('GisaiPharma.model.Event', touchboxModel.event[0]);
		ecaModel.setTouchbox(touchboxInstance);
		ecaModel.setService(touchboxInstance.data.service_id);
	} else if(/Condition/.test(touchboxModel.type)){
		var ecaModel=Ext.create('GisaiPharma.model.Condition', touchboxModel.condition[0]);
		ecaModel.setTouchbox(touchboxInstance);
		ecaModel.setService(touchboxInstance.data.service_id);
	}  if (/Action/.test(touchboxModel.type)){
		var ecaModel=Ext.create('GisaiPharma.model.Action', touchboxModel.action[0]);
		ecaModel.setTouchbox(touchboxInstance);
		ecaModel.setService(touchboxInstance.data.service_id);
	}

};

/**
* Extrae los datos contenidos en un ECA model.
*
* @param {object} touchboxCmp
*/
function findTouchBoxData (touchboxCmp){
	var index=myService.touchboxes().find('identificator',touchboxCmp.id)
	var caja=myService.touchboxes().getAt(index);
	console.log(caja);
	if(caja){
		if(caja.EventBelongsToInstance)
			return caja.EventBelongsToInstance.data;
		if(caja.ConditionBelongsToInstance)
			return caja.ConditionBelongsToInstance.data;
		if(caja.ActionBelongsToInstance)
			return caja.ActionBelongsToInstance.data;
	}
}
/*
 * END OF FILE - /app/controller/Touchbox.js
 */