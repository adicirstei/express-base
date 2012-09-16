var express = require('express');
var http = require('http');

var db = require('./database.js');

var app = express();
db.setup({dburl: 'mongo'})

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/app'));
app.use(app.router);


app.get('/db/get/:uid/:col/:id?', db.get);
app.post('/db/set/:uid/:col/:id?', db.set);
app.del('/db/del/:uid/:col/:id?', db.del);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
