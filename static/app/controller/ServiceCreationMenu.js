/*
 * START OF FILE - /app/controller/ServiceCreationMenu.js
 *
 * En este controlador se manejan los eventos producidos en los menus de creación, carga y borrado de servicios.
 */
var myService,myServiceRule;			//variable donde almacenamos la instancia de el modelo Service y ServiceRules que estamos creando en un determinado momento.
Ext.define('GisaiPharma.controller.ServiceCreationMenu', {
    extend: 'Ext.app.Controller',
    config: {
		control: {
			serviceCreation: {
				tap: 'serviceCreationSelection'
			},
			serviceLoad: {
				tap:'serviceLoadSelection'
			},
			serviceTemplate: {
				tap:'serviceTemplateSelection'
			},
			deleteService: {
				tap:'deleteServiceSelection'
			},
			servListLoad : {
				select:'serviceListLoadSelection',
				show:'listStoreRefresh'
			},
			servListTemplate : {
				select:'serviceTemplateListSelection',
				show:'listStoreRefresh'
			},
			servListDelete: {
				select:'serviceListDeleteSelection'
			},
			serviceCreationMenu: {
				back:'backButtonSelection',
			},
			saveButton: {
				tap:'saveButtonSelection'
			}
		},
		refs: {
				serviceCreation: '#serviceCreation',
				serviceLoad: '#serviceLoad',
				serviceTemplate: '#serviceTemplate',
				deleteService:'#deleteService',
				backButton:'#backButton',
				servListLoad:'loadlist',
				servListTemplate:'templatelist',
				servListDelete:'deletelist',
				serviceCreationMenu:'servicecreationmenu',
				saveButton:'navigationview #saveButton'
		},
	}, 
/**
* Refresca los datos de las listas de cargar y borrar servicios
*
* @param {object} lista
*/
	listStoreRefresh:function(lista){
		Ext.getCmp(lista.id).getStore().load();
	},
/**
* Maneja la pulsación del boton "crear servicio"
*
*/
	serviceCreationSelection: function() {
		serviceInit();
		inPlaygroundView();
		Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.playground.Playground'));
    },
	
/**
* Maneja la pulsación del boton "cargar servicio"
*
*/	
	serviceLoadSelection: function() {
		Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.servicecreationmenu.LoadList'));
    },
	
/**
* Maneja la selección de un servicio de la lista de servicios creados por el usuario.
* @params {object} view
* @params {object} serviceModel
*
*/	
	serviceListLoadSelection: function(view, serviceModel) {
		inPlaygroundView();
		Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.playground.Playground'));
		serviceInit(serviceModel.internalId, function(){
			loadModels(serviceModel, true);
		});
	},
	
/**
* Maneja la pulsación del boton "crear servicio desde plantillas"
*
*/		
	serviceTemplateSelection: function() {
		Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.servicecreationmenu.TemplateList'));
    },
	
/**
* Maneja la selección de un servicio de la lista de servicios creados por el usuario.
* @params {object} view
* @params {object} serviceModel
*
*/	
	serviceTemplateListSelection: function(view, serviceModel) {	
		inPlaygroundView();
		Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.playground.Playground'));
		serviceInit(null, function(){
			loadModels(serviceModel, false);
		});
	},
	
/**
* Maneja la pulsación del boton "eliminar servicio"
*
*/		
	deleteServiceSelection: function() {
		Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.servicecreationmenu.DeleteList'));
	},
	
/**
* Maneja la selección de un servicio de la lista de servicios creados por el usuario.
* @params {object} view
* @params {object} serviceModel
*
*/		
	serviceListDeleteSelection: function(view, serviceModel) {
		myService=Ext.create('GisaiPharma.model.Service', {id:serviceModel.internalId ,owner:username});
		myServiceRules=Ext.create('GisaiPharma.model.ServiceRule', {id:serviceModel.internalId ,owner:username});
		Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function(buttonId){
			if(buttonId=='yes'){
				myService.erase({
					success: function(){

						myServiceRules.erase({
							success: function(){
								Ext.ComponentQuery.query('servicesmonitor list')[0].getStore().load();
							},
							failure: function(response){ 
								console.log(response);
							}
						});
						Ext.ComponentQuery.query('deletelist')[0].getStore().load();
						
					},
					failure: function(response){ 
						console.log(response);
					}
				});
			}
		});
	},

	
/**
* Maneja la pulsación del botos "guardar": Salva un servicio. Pide al usuario una descripción del mismo y que confirme si desea compartir el servicio como plantilla. 
* Posteriormente, evalua si existen reglas válidas, y de ser así también las guarda
*
*/		
	saveButtonSelection: function(){
		Ext.Msg.prompt('Opcional','Si lo desea, a&#241ada una descripci&#243n para el servicio: ',function(btn, text){
			Ext.Msg.confirm('Confirmaci&#243n', '&#191Quiere compartir este servicio como plantilla?', function(buttonId){
				if(buttonId=='yes')
					saveServiceModel(text, true);
				else
					saveServiceModel(text,false);
				evaluateRules();
				if(myServiceRule){
					saveServiceRulesModel(text);
				}
			});
		});
	}
});
/**
* Inicializa un servicio nuevo o crea uno a partir de uno ya existente (si se proporciona nombre)
* @params {object} name (opcional) nombre del servicio si éste existía.
* @params {object} callback funcion de retorno
*
*/		
function serviceInit(name, callback) {
	if(!name){
		Ext.Msg.prompt('Aviso','Introduzca un nombre para el servicio: ',function(btn,text){
			if(!text||btn=='cancel'){
				serviceInit();
			} else {
			myService=Ext.create('GisaiPharma.model.Service', {id:text ,owner:username,description:''});
			}
			if(callback)
				callback();
		});
	} else {
		myService=Ext.create('GisaiPharma.model.Service', {id:name,owner:username,description:''});
		callback();
	}
	e0=e1=origin=destination=null;
}

/**
* Carga los modelos de touchbox y conexiones así como los datos guardados en un componente (si existen).
* @params {object} serviceModel modelo de servicio.
* @params {boolean} "true" si se quiere cargar configurado o "false" para cargar la plantilla en blanco.
*
*/	
function loadModels (serviceModel, serviceConfigured) {
	Ext.Array.forEach(serviceModel.raw.touchboxes, function(touchboxModel){
		loadTouchBox(parseInt(touchboxModel.coordinateX),parseInt(touchboxModel.coordinateY), touchboxModel.type, touchboxModel.identificator);
		setFijo(traduccion[touchboxModel.identificator]);
		if(serviceConfigured)
		loadECAModel(touchboxModel);
	});
	Ext.Array.forEach(serviceModel.raw.connections, function(connectionModel){
		addConnectionModel(traduccion[connectionModel.origin], traduccion[connectionModel.destination])
		loadConnection(traduccion[connectionModel.origin], traduccion[connectionModel.destination]);
	});
	if(serviceConfigured){
		myService.touchboxes().each(function(touchboxModel){
		touchboxCmp=Ext.getCmp(touchboxModel.data.identificator);
		touchboxCmp.data=findTouchBoxData(touchboxCmp);
		console.log(touchboxCmp.data);
			if(touchboxCmp.data.configured)
				touchboxCmp.setStyle({"-webkit-box-shadow":"0 0 15px #00ff00", "-moz-box-shadow":"0 0 15px #00ff00","box-shadow":"0 0 15px #00ff00"});
		});
	}
}

/**
 * Configura la vista  cuando se sale de la vista de playground
 */
function outPlaygroundView() { 
botonSalvar=Ext.ComponentQuery.query('navigationview #saveButton')[0];
	if(botonSalvar)
		botonSalvar.destroy();
}
/**
 * Configura la vista cuando se entra en la vista de playground
 */
function inPlaygroundView() { 
	addSaveButton();
}
/**
 * Guarda un modelo de servicio y añade una descripción y la propiedad de utilizarse como plantilla
 * @params {string} description descripción del servicio (opcional)
 * @params {boolean} shared "true" si se utilizará como plantilla para crear otros servicios, "false" en caso contrario.
 */
function saveServiceModel(description, shared, callback){
	myService.data.shared=shared;
	myService.data.description=description;
	myService.save({
		success: function(){
			myService.touchboxes().each(function(touchbox){
				touchbox.save({success: function(touchbox){
					if(/Event/.test(touchbox.data.type)){
						if(touchbox.EventBelongsToInstance)
							touchbox.EventBelongsToInstance.save();
					} else if (/Condition/.test(touchbox.data.type)) {
						if(touchbox.ConditionBelongsToInstance)
							touchbox.ConditionBelongsToInstance.save();
					}	if(/Action/.test(touchbox.data.type)) {
							if(touchbox.ActionBelongsToInstance)
								touchbox.ActionBelongsToInstance.save();
					}}
				});
				Ext.Msg.alert('Informacion',"Guardado con &#233xito!");
			 });
			myService.connections().each(function(connection){
				connection.save();
			});
		}, 
		failure: function(){
				Ext.Msg.alert('Informacion',"INTERNAL SERVER ERROR");
		}
	});
};
/**
 * Guarda un modelo de reglas de servicio y añade una descripción (opcional)
 * @params {string} description descripción del servicio (opcional)
 *
 */
function saveServiceRulesModel(description){
	myServiceRule.data.description=description;
	myServiceRule.save({
		success: function(){
		myServiceRule.ecarules().each(function(rule){
			rule.save({success:function(rule){
				rule.EventRuleBelongsToInstance.save();
				rule.ConditionRuleBelongsToInstance.save();
				rule.ActionRuleBelongsToInstance.save();
				}
			});
		});
		Ext.ComponentQuery.query('servicesmonitor list')[0].getStore().load();
		}
	});
}		

/**
*Añade el botón "guardar"
 *
 */
function addSaveButton(){
	Ext.getCmp('serviceCreationMenu').getNavigationBar().add({
		xtype:'button',
		ui:'forward',
		text: 'Guardar',
		itemId:'saveButton',
	});
}

/**
* Evalua si las reglas creadas forman un conjunto Event-Condition-Action
 *
 */
function evaluateRules(){
	jsPlumb.reset();
	var validConnection=[];
	myServiceRule=Ext.create('GisaiPharma.model.ServiceRule',{id:myService.data.id});
	myService.connections().each(function(connectionEC){
		if(connectionEC.data.type=='EC'){
			myService.connections().each(function(connectionCA){
				if(connectionCA.data.type=='CA'){
					if(connectionCA.data.origin==connectionEC.data.destination){
						var event=myService.touchboxes().findRecord('identificator',connectionEC.data.origin).EventBelongsToInstance;
						var condition=myService.touchboxes().findRecord('identificator',connectionEC.data.destination).ConditionBelongsToInstance;
						var action=myService.touchboxes().findRecord('identificator',connectionCA.data.destination).ActionBelongsToInstance;
						if(event&&condition&&action){
							if(event.data.data&&condition.data.data&&action.data.data){
								connectRule(connectionEC.data.origin,connectionEC.data.destination);
								connectRule(connectionCA.data.origin,connectionCA.data.destination);
								validConnection.push(connectionEC,connectionCA);
								myServiceRule.ecarules().add(createEcaRule(event.data, condition.data,action.data));
							}
						}
					}
				}
			});
		}				
	});

	myService.connections().each(function(connection){
		if (validConnection.indexOf(connection)==-1){
		myService.connections().remove(connection);
		}
	});
	e0=e1=destination=origin=null;
};
/**
* A partir de los datos de evento, condición, acción crea los modelos de EventRule, ConditionRule, y ActionRule que almacena en un modelo EcaRule
 *
 */
function createEcaRule(event, condition, action){
	var ecarule=Ext.create('GisaiPharma.model.EcaRule');
	var eventrule=Ext.create('GisaiPharma.model.EventRule', event);
	var conditionrule=Ext.create('GisaiPharma.model.ConditionRule', condition);
	var actionrule=Ext.create('GisaiPharma.model.ActionRule', action);
	ecarule.setEventRule(eventrule);
	eventrule.setEcaRule(ecarule);
	ecarule.setServiceRule(myServiceRule.data.service_id);
	eventrule.setServiceRule(myServiceRule);
	ecarule.setConditionRule(conditionrule);
	conditionrule.setEcaRule(ecarule);
	conditionrule.setServiceRule(myServiceRule);
	ecarule.setActionRule(actionrule);
	actionrule.setEcaRule(ecarule);
	actionrule.setServiceRule(myServiceRule);
	return ecarule;
};
	
/**
* Maneja la pulsación del botón "back" 
*
*/			
function backButtonSelection() {
	if(/ext-playground-./.test(Ext.getCmp('serviceCreationMenu').getPreviousItem().id)){
		inPlaygroundView();
	}else {
		outPlaygroundView();
		 jsPlumb.reset();
		e0,e1,origin,destination=null;
		 traduccion=[];
	}
	Ext.getCmp('serviceCreationMenu').pop();
};




/*
 * END OF FILE - /app/controller/ServiceCreationMenu.js
 */
	