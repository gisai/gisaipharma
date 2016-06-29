/*
 * START OF FILE - /app/controller/Playground.js
 *
 * En este controlador, se manejan los eventos producidos en la vista de playground que es el lienzo de creación de servicios.
 */
 
 /*
 * Constantes para sombreado de touchbox
 */
var REDSHADOW={"-webkit-box-shadow":"0 0 15px #ff0000", "-moz-box-shadow":"0 0 15px #ff0000","box-shadow":"0 0 15px #ff0000"};
var GREENSHADOW={"-webkit-box-shadow":"0 0 15px #00ff00", "-moz-box-shadow":"0 0 15px #00ff00","box-shadow":"0 0 15px #00ff00"};
var NOSHADOW={"-webkit-box-shadow":"", "-moz-box-shadow":"","box-shadow":""};
 /*
 * Variables auxiliares
 */
var type=null;									// HTML class que se utiliza para saber el tipo evento, condición o acción que contiene un touchbox.
var e0,e1,origin, destination=null;	// e0 y e1 son los "endPoints" de origen y destino respectivamente que utiliza la librería jsPlumb para el enlazado de cajas. Ver http://www.jsplumb.org/doc/usage.html. origin y destination sirven para referenciar a la caja origen y destino respectivamente cuando se realiza una conexión.
var traduccion=[];							//Debido a que Sencha Touch maneja automáticamente el "id" de cada touchbox, este varía cuando cargamos un servicio previamente creado. Este array asociativo, ayuda a mapear el "id" con el que se guardo un touchbox con el nuevo "id" asignado por la librería.


Ext.define('GisaiPharma.controller.Playground', {
    extend: 'Ext.app.Controller',
    config: {
       control: {
		eventButton: {
			tap: 'eventSelection'
		},
        
        conditionButton: {
            tap: 'conditionSelection'
        },
        actionButton: {
            tap: 'actionSelection'
        },
        ayudaButton: {
            tap: 'ayudaSelection'
        },
		eventList:{
			select:'componentSelected'
		},
		conditionList:{
			select:'componentSelected'
		},
		actionList:{
			select:'componentSelected'
		},
        whiteboard: {
        	initialize:'whiteboardInitialization',
        },   
        },
        refs: {
            eventButton: 'toolbar #eventButton',
            conditionButton:'playground #conditionButton',
            actionButton:'playground #actionButton',
			eventList:'eventselection list',
			conditionList:'conditionselection list',
			actionList:'actionselection list',
            ayudaButton:'playground #ayudaButton',
            whiteboard:'playground',
        },
    }, 
	eventSelection: function() {
		outPlaygroundView();
		Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.playground.EventSelection'));
    }, 
	conditionSelection: function() {
		outPlaygroundView();
		Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.playground.ConditionSelection'));
    },  
	actionSelection: function() {
		outPlaygroundView();
		Ext.getCmp('serviceCreationMenu').push(Ext.create('GisaiPharma.view.playground.ActionSelection'));
    },  
	componentSelected: function(view, record){
		type=record.data.type;
		view.deselect(record);
		inPlaygroundView();
		Ext.getCmp('serviceCreationMenu').pop();
	},	
	ayudaSelection: function() {
    	Ext.Viewport.add({//shows 'help' panel
    		xtype:'popout',
			html:'<p style="text-align:center">Seleccione un componente y pinche sobre la pizarra</p>',
		}); 		
	},	
	whiteboardInitialization : function() {
		var id=Ext.ComponentQuery.query('playground #whiteboard')[0].id;
		jsPlumb.Defaults.Container = id;
			Ext.get(id).on('tap', function(event) {
				if (type != null)
					addTouchbox(event);
			});
	}
});

/**
 * Añade al lienzo un touchbox en funcion de las coordenadas de un evento que se pasa como parametro.
 * @param {object} El evento "tap" 
 */
function addTouchbox (event) {//adds a new Element to "pizarra"
	loadTouchBox(event.pageX-75, event.pageY-130, type);
	type=null;
};
/**
 * Añade al lienzo un touchbox en funcion de coordenadas y tipo de touchbox. Además realiza la inicialización de sus listeners.
 * @param {number} coordinateX
 *	@param {number} coordinateY
 * @param {string} tipo
 * @param {string} identificador anterior (opcional): identificador que tenia el touchbox cuando fue guardado.
 */
function loadTouchBox (coordinateX, coordinateY, tipo, identificadoranterior){
	Ext.ComponentQuery.query('playground #whiteboard')[0].add(Ext.create('GisaiPharma.view.touchbox.Touchbox',{
		cls : tipo,
		draggable : {
			directions : 'both',
			initialOffset : {
				x : coordinateX,
				y : coordinateY,
			}
		 },
		listeners:{
	    	initialize:function() {
				initTouchBox(this, coordinateX, coordinateY, tipo, identificadoranterior);
	    		Ext.get(this.id).on({
					doubletap : function() {// Destruction
						removeConnection(this.id);
						removeConnectionModel(this);
						removeTouchbox(this.id);
						removeTouchboxModel(this);
					},
					swipez:function () {
						removeConnection(this.id);
						removeConnectionModel(this);
						setMovil(this.id);
					},
				});
			},
		}
	}));
};
/**
 * Inicializa un touchbox. A nivel de datos carga el modelo Touchbox. A nivel de vista "mapea" o "traduce" el identificador con el que fue guardado por el nuevo que asigna Sencha de manera automática.
 *	@param {object} touchbox component
 * @param {number} coordinateX
 *	@param {number} coordinateY
 * @param {string} type html class que define el tipo de touchbox
 * @param {string} identificadoranterior (opcional): identificador que tenia el touchbox cuando fue guardado.
 */
function initTouchBox (touchbox, coordinateX,coordinateY,type, identificadoranterior){
	loadTouchboxModel(touchbox.id, coordinateX, coordinateY, type);
	traduccion[identificadoranterior]=touchbox.id; //crea una relación key value entre el valor original ext-touchbox-* y el nuevo valor de ext-touchbox-*
};


/*METODOS PARA GESTION DE COMPONENTES*/


/**
*Destruye un touchbox 
*
* @param {string} touchboxElemId
*/
function removeTouchbox(touchboxElemId){
	Ext.getCmp(touchboxElemId).destroy();	
};

/**
*Destruye todas las conexiones asociadas a un touchbox
*
* @param {string} touchboxElemId
*/
function removeConnection (touchboxElemId) {
	e0=null;
	e1=null;
	jsPlumb.removeAllEndpoints(touchboxElemId);
}
/**
*Fija un touchbox a partir de su element id
*
* @param {string}  touchboxElemId 
*/
function setFijo (touchboxElemId){
		Ext.getCmp(touchboxElemId).getDraggable().disable();
};

/**
* Convierte en móvil un touchbox a partir de su element id
*
* @param {string} touchboxElemId touchbox element "id"
*/
function setMovil (touchboxElemId){
	Ext.getCmp(touchboxElemId).getDraggable().enable()
};

/**
* Añade un "endpoint" a un componente touchbox que se le pasa como parametro. Si es el primero se añadirá un endpoint a la derecha y se marcara
* el compoente como "origen" , si es el segundo se añadirá "endpoint" a la izquierda y se marcara el compoente tuchbox como "destino".
*
* @param {object} touchboxCmp touchbox component
*/
function addConnector (touchboxCmp){
	if(e0==null){
		Ext.get(touchboxCmp.id).setStyle(REDSHADOW);
		e0 = jsPlumb.addEndpoint(touchboxCmp.id, {
			anchor : "RightMiddle"
		});
		origin=touchboxCmp.id;
	} else if (e1==null) {
		originBox=Ext.getCmp(origin);
		if(!originBox.data||!originBox.data.configured){
			Ext.get(origin).setStyle(NOSHADOW);
		}else{
			Ext.get(origin).setStyle(GREENSHADOW);
		}
		e1 = jsPlumb.addEndpoint(touchboxCmp.id, {
			anchor : "LeftMiddle"
		});
		destination=touchboxCmp.id;
	}
};
/**
*Cuando los "endpoints" e0 y e1 estás definidos, los conecta. Guarda el modelo de conexion. Despues resetea las variables auxiliares.
*
*/
function connect (){
	if (e1!=null) {
		jsPlumb.connect({
			source : e0,
			target : e1,
			anchors : "Continuous",
			paintStyle : {
				strokeStyle : "blue",
				lineWidth : 3
			},
			connector : [ "Flowchart", 10 ],
			overlays : [ "Arrow" ]
		});
		addConnectionModel(origin, destination);
		e0=e1=origin=destination=null;
	}
};
/**
*Crea una conexión verde que indica que la conexión pertenece a una ECA rule valida
*@param {string} touchBoxCmpId1 element id de origen
* @param {string} touchBoxCmpId2 element id de destino
*/
function connectRule (touchboxCmpId1, touchboxCmpId2){
	e0 = jsPlumb.addEndpoint(touchboxCmpId1, {
		anchor : "RightMiddle"
	});
	e1 = jsPlumb.addEndpoint(touchboxCmpId2, {
		anchor : "LeftMiddle"
	});
	jsPlumb.connect({
		source : e0,
		target : e1,
		anchors : "Continuous",
		paintStyle : {
			strokeStyle : "green",
			lineWidth : 3
		},
		connector : [ "Flowchart", 10 ],
		overlays : [ "Arrow" ]
	});
};

/**
*Crea una conexión roja que indica que la conexión pertenece a una conexión entre ECA rules validas
*@param {string} touchBoxCmpId1 element id de origen
* @param {string} touchBoxCmpId2 element id de destino
*/
function connectDifferentRules (touchBoxCmpId1, touchBoxCmpId2){
	e0 = jsPlumb.addEndpoint(touchBoxCmpId1, {
		anchor : "RightMiddle"
	});
	e1 = jsPlumb.addEndpoint(touchBoxCmpId2, {
		anchor : "LeftMiddle"
	});
	jsPlumb.connect({
		source : e0,
		target : e1,
		anchors : "Continuous",
		paintStyle : {
			strokeStyle : "red",
			lineWidth : 3
		},
		connector : [ "Flowchart", 10 ],
		overlays : [ "Arrow" ]
	});
};

/**
*Crea una conexión azul entre touchboxes. Se utiliza para la carga de servicios.
*@param {string} touchBoxCmpId1 element id de origen
* @param {string} touchBoxCmpId2 element id de destino
*/
function loadConnection (touchBoxCmpId1, touchBoxCmpId2){
e0 = jsPlumb.addEndpoint(touchBoxCmpId1, {
			anchor : "RightMiddle"
		});
e1 = jsPlumb.addEndpoint(touchBoxCmpId2, {
			anchor : "LeftMiddle"
		});
	jsPlumb.connect({
		source : e0,
		target : e1,
		anchors : "Continuous",
		paintStyle : {
			strokeStyle : "blue",
			lineWidth : 3
		},
		connector : [ "Flowchart", 10 ],
		overlays : [ "Arrow" ]
	});
};


/*METOODOS PARA GESTION DE MODELOS*/


/**
*Crea el modelo de un touchbox a partir de los datos de la vista y lo guarda en el modelo de servicio .
*@param {object} touchBoxCmp touchbox component
*
*/
function addTouchboxModel (touchboxCmp){
	myService.touchboxes().add(Ext.create('GisaiPharma.model.Touchbox',{
		identificator:touchboxCmp.id,
		type:touchboxCmp.getCls(),
		coordinateX:Ext.get(touchboxCmp.id).getX() - 75,
		coordinateY:Ext.get(touchboxCmp.id).getY()- 130,
	}));
};

/**
*Crea el modelo de un touchbox a partir de los datos proporcionados (se utiliza para cargar los touchboxes desde un servicio guardado)
*@param {string} identificator touchbox component id
*@param {number} coordinateX 
*@param {number} coordinateY
*@param {string} type HTML class que indica el tipo de componente
*/
function loadTouchboxModel (identificator, coordinateX, coordinateY, type){
	myService.touchboxes().add(Ext.create('GisaiPharma.model.Touchbox',{
		identificator:identificator,
		type:type,
		coordinateX: coordinateX,
		coordinateY: coordinateY,
	}));
};

/**
*Destruye el modelo de touchbox del modelo de servicio
* @param {object} touchBoxCmp touchbox component
*/
function removeTouchboxModel (touchboxCmp) {
	myService.touchboxes().removeAt(myService.touchboxes().find('identificator', touchboxCmp.id));
};

/**
* Crea modelo de conexión y lo introduce en el modelo de servicio. Utiliza id del componente touchbox de origen y id del componente touchbox de destino.
* @param {string} originCmpId origin touchbox component id
* @param {string} originCmpId origin touchbox component id
*/
function addConnectionModel (originCmpId, destinationCmpId) {
	var index=myService.touchboxes().find('identificator',originCmpId);
	var touchboxInstanceOrigin=myService.touchboxes().getAt(index);
	var index=myService.touchboxes().find('identificator',destinationCmpId);
	var touchboxInstanceDestination=myService.touchboxes().getAt(index);
	var connectiontype;
		if(/Event/.test(touchboxInstanceOrigin.data.type)){
			if(/Condition/.test(touchboxInstanceDestination.data.type)){
				connectiontype='EC'; 
			}
		} else if(/Condition/.test(touchboxInstanceOrigin.data.type)){
			if(/Action/.test(touchboxInstanceDestination.data.type)){
				connectiontype='CA'; 
			}
		} 
	myService.connections().add(Ext.create('GisaiPharma.model.Connection', {
		origin: originCmpId,
		destination: destinationCmpId,
		type:connectiontype,
	}));
};
/**
* Elimina todos los modelos de conexión en los que interviene un touchbox component determinado que se pasa como parametro
* @param {object} touchboxCmp 
* 
*/
function removeConnectionModel (touchboxCmp) {
	while(myService.connections().find('origin',touchboxCmp.id)!=-1){
		myService.connections().removeAt(myService.connections().find('origin', touchboxCmp.id));
	}
	while(myService.connections().find('destination',touchboxCmp.id)!=-1){
		myService.connections().removeAt(myService.connections().find('destination', touchboxCmp.id));
	}
	origin,destination=null;
};


/*
 * END OF FILE - /app/controller/Playground.js
 */


//mejorar tiempos y leer sobre las callback function!!
// var showTouchboxData= function(touchbox){    	
	// var index=myService.touchboxes().find('identificator',touchbox.id)
	// var info;
	// var caja=myService.touchboxes().getAt(index);
	// if(caja){
	// if(caja.EventBelongsToInstance)
		// info=JSON.stringify(caja.EventBelongsToInstance.data);
	// if(caja.ConditionBelongsToInstance)
		// info=JSON.stringify(caja.ConditionBelongsToInstance.data);
	// if(caja.ActionBelongsToInstance)
		// info=JSON.stringify(caja.ActionBelongsToInstance.data);
		// Ext.Viewport.add({//shows 'help' panel
			// xtype:'popout',
			// html:'<p style="text-align:center">'+info+ '</p>',
		// }); 	
	// }
// };

// socketsession.on('on', function (data) { //para encender las bombillas...
	// if(data.servicerule_id==actualservice){
		// var id=myService.connections().findRecord('origin',data.eventId).data.destination;
		// var cambiaCls =function(id){
			// Ext.get(id).toggleCls('triggeredEventOn');
			// Ext.defer(function(){Ext.get(id).toggleCls('triggeredEventOn');},2000);
		// };	
		// if(Ext.getCmp(id).getCls()==('triggeredEvent'))
			// cambiaCls(id);
	// }
// });


