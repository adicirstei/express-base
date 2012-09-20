var express = require('express');
var http = require('http');

var db = require('database');

var app = express();
db.setup({dburl: 'mongodb://localhost/database'});

var User = db.addSchema('user', new db.Schema({id:'String', username:'String', password:'String', sid:'String'}));


app.set('port', process.env.PORT || 3000);

app.use(express.bodyParser());
app.use(express.static(__dirname + '/app'));
app.use(app.router);

app.post('/login', logIn);
app.get('/db/get/:uid/:col/:id?', loadUser, db.get);
app.post('/db/set/:uid/:col/:id?', loadUser, db.set);
app.del('/db/del/:uid/:col/:id?', loadUser, db.del);


function loadUser(req, res, next) {
    req.dboptions = {filter: {or:[{sid: '19'}, {sid:''}]}};
    next();
}

function logIn(req, res, next) {
    var user, pass;
    user = req.body.username;
    pass = req.body.password;


    User.findOne({
            username: user,
            password: hash(pass)
        }, ['username', 'sid'], function(err, u) {
            if (err || !u) {
                res.send({success: false});
                return;
            }
            res.send({success: true, user: u});
        });
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

function hash(data) {
        var crypto = require('crypto');
        var shasum = crypto.createHash('sha1');
        shasum.update(data);
        var d = shasum.digest('hex');
        return d;
}