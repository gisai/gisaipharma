
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	name: {type: String},
	email: {type: String},
	password:{type: String},
	wsClientId:{type: Object}
});

UserSchema.statics.authenticate = function authenticate (login, email, password, callback) {
		User.findOne({name: login, email: email, password: password}, function(err, docs){
		callback(docs);	
	});
}

UserSchema.statics.register= function register (login, email, password, callback) {
	User.findOne({name: login}, function(err, docs){
		if (!docs) {
			var t=new User({name:login, email:email, password:password});
			t.save();
			callback(t);
		} else {
			callback(null);
		}
	});
}

var User=mongoose.model('User', UserSchema);
