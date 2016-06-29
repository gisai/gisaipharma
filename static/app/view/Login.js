/*
 * START OF FILE - /app/view/Login.js
 */		
var domains = ["laboratorio","logistica","farmacia"];
var port = 5000;
var domain_id = parseInt(window.location.port)-port;
var domain = domains[domain_id];

Ext.define('GisaiPharmaLogin.view.Login', {
	extend : 'Ext.form.Panel',
	xtype:'login',
	config : {
		layout:'vbox',
		
	}
});
	
var login=Ext.create('GisaiPharmaLogin.view.Login',{
	xtype: 'fieldset',
	items: [

		{
			xtype: 'textfield',
			name : 'name',
			label: 'Name',
			cls:'letrabotones',
		},
		{
			xtype: 'emailfield',
			name : 'email',
			label: 'Email',
			cls:'letrabotones',
		},
		{
			xtype: 'passwordfield',
			name : 'password',
			label: 'Password',
			cls:'letrabotones',
		},
		{
			xtype:'spacer',
		},
		{
			xtype: 'textfield',
			id:'seleccionentorno',
			label: 'Entorno: '+domain,
			cls:'letrabotones',
		},
		{
			xtype:'toolbar',
			docked:'bottom',
			layout:'hbox',
			items:[
				{
					xtype:'spacer',
					flex:1
				},
				{
					xtype:'button',
					text:'Login',
					ui:'confirm',
					cls:'letrabotones',
					flex:2,
					handler: function	(){
						console.log('envio');
						login.submit({
							url: '/login',
							method: 'POST',
							success: function(form,result) {
								//if(Ext.getCmp('seleccionentorno').getValue()=='Farmacia')
									document.location = "/index.html";
							},
							failure: function(response){
								Ext.Msg.alert('Alert',"Invalid Login and/or Password");
							}
						});
					}
				},
				{
					xtype:'spacer',
					flex:1
				},
				{
					xtype:'button',
					text:'Register',
					ui:'decline',
					cls:'letrabotones',
					flex:2,
					handler: function	(){
						login.submit({
							url: '/register',
							method: 'POST',
							success: function(response,result) {
								document.location = "/index.html";
							},
							failure: function(response){
								Ext.Msg.alert('Alert',"Invalid Login and/or Password");
							}
						});
					}
				},
				{
					xtype:'spacer',
					flex:1
				},
				
			]
		}
	]
});

login.setValues({
    name: 'Nombre',
    email: 'usuario@host.com',
    password: 'secret'
});

