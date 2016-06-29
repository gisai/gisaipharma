/*
 * START OF FILE - /app/view/Info.js
 */		
Ext.define('GisaiPharma.view.Info', {
	extend : 'Ext.Panel',
	alias : 'widget.info',
	config : {
		title : 'Home',
		iconCls : 'home',
		cls : 'info',
		displayField : 'title',
		scroll : 'both',
		html:	'<span class="logstate"><p>Ha iniciado sesion como: '+username+'</p><br><a href="/logout">Logout</a></span><br><a href="http://gisai.dit.upm.es" target="new"><img border="0" src="img/GISAI2012small.png" width="200"><br/>http://gisai.dit.upm.es</a><br>version 1.1</span>'+			
					'<img class="cruz" src="img/GreenCross.GIF">'
	}			
});
/*
 * START OF FILE - /app/view/Info.js
 */		