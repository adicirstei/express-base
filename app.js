var express = require('express');
var http = require('http');

var db = require('database');

var app = express();
db.setup({dburl: 'mongo'});


app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/app'));
app.use(app.router);


app.get('/db/get/:uid/:col/:id?', loadUser, db.get);
app.post('/db/set/:uid/:col/:id?', loadUser, db.set);
app.del('/db/del/:uid/:col/:id?', loadUser, db.del);

function loadUser(req, res, next) {
    req.dboptions = {filter: {or:[{sid: '19'}, {sid:''}]}};
    next();
}




http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
