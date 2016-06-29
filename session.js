exports.checkAuth= function(req, res, next) {
	if (!req.session.user) {
		res.redirect('/login.html');
	} else {
		next();
	}
}

exports.secretString=function () {//para computar el hash de manera diferente con cada inicio del servidor (soluciona posibles caidas del mismo)
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomString = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomString += chars.substring(rnum,rnum+1);
	}
	return randomString;
}