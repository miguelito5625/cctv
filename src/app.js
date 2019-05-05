const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  mysql = require('mysql'),
  myConnection = require('express-myconnection');

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync(path.join(__dirname, 'sslcert/privkey.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, 'sslcert/cert.pem'), 'utf8');

var credentials = {key: privateKey, cert: certificate};

 
const app = express();

// importing routes
const cabinetsRoutes = require('./routes/cabinetsRoutes');
const camsRoutes = require('./routes/camsRoutes');

// settings
app.set('port', process.env.PORT || 443);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
//app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: '35.185.125.18',
  user: 'desarrollador',
  password: 'mariobross5625',
  port: 3306,
  database: 'cctv'
}, 'single'));
app.use(express.urlencoded({ extended: false }));


// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', cabinetsRoutes);
app.use('/', camsRoutes);
// app.use(function(req, res, next) {
//   res.status(404).render('404/index');
// });


// starting the server
// const server = app.listen(app.get('port'), () => {
//   console.log(`server on port ${app.get('port')}`);
// });

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
const server = httpsServer.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});



//WebSockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {

  //console.log('new connection');

  socket.on('notify:insert', (data) => {

    //console.log('Se inserto algo');

    io.sockets.emit('notify:insert');

  });


  socket.on('notify:delete', (data) => {

    console.log('Se borro algo');

    io.sockets.emit('notify:delete');

  });

  socket.on('notify:update', (data) => {

    console.log('Se actualizo algo');

    io.sockets.emit('notify:update');

  });


});