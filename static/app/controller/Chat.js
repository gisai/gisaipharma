/*
 * START OF FILE - /app/controller/Chat.js
 */
Ext.define('GisaiPharma.controller.Chat', {
    extend: 'Ext.app.Controller',
    config: {
		control: {
			sendChatButton:{
				tap: 'sendChatButtonSelection'
			},
			chatStore:{
				addrecords:'chatStoreAddRecord'
			}
		},
		refs: {
			sendChatButton:'#sendChatButton',
			chatStore:'chat store'
		}
	},
	sendChatButtonSelection: function(){
		Ext.data.StoreManager.lookup('MyChatStore').add({txt: 'Yo: '+ Ext.getCmp('textochat').getValue(), date:new Date()});
		socketsession.emit('chatmessage', Ext.getCmp('textochat').getValue());
		Ext.getCmp('textochat').setValue(null);
	},
	chatStoreAddRecord: function() {
		Ext.defer(function() {
			Ext.getCmp('listaChat').getScrollable().getScroller().scrollToEnd();
		},100);
	}
});
/*
 * END OF FILE - /app/controller/Chat.js
 */			
			