//Required files
const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  mysql = require('mysql'),
  myConnection = require('express-myconnection');

  // Variables
var fs = require('fs');
var http = require('http');
var https = require('https');

//HTTPS options
var privateKey = fs.readFileSync(path.join(__dirname, 'sslcert/privkey.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, 'sslcert/cert.pem'), 'utf8');
var credentials = {key: privateKey, cert: certificate};

//HTTP options
const httpApp = express();
httpApp.set('port', process.env.PORT || 80);
httpApp.get("*", function (req, res, next) {
    res.redirect("https://" + req.headers.host + req.path);
});


//HTTPS initialice
const httpsApp = express();

// importing routes
const cabinetsRoutes = require('./routes/cabinetsRoutes');
const devicesRoutes = require('./routes/devicesRoutes');

// settings
httpsApp.set('port', process.env.PORT || 443);
httpsApp.set('views', path.join(__dirname, 'views'));
httpsApp.set('view engine', 'ejs');


// middlewares
//httpsApp.use(morgan('dev'));
httpsApp.use(myConnection(mysql, {
  host: '192.168.1.100',
  user: 'desarrollador',
  password: 'mariobross5625',
  port: 3306,
  database: 'cctv'
}, 'single'));
httpsApp.use(express.urlencoded({ extended: false }));


// static files
httpsApp.use(express.static(path.join(__dirname, 'public')));

// routes
httpsApp.use('/', cabinetsRoutes);
httpsApp.use('/', devicesRoutes);


var httpsServer = https.createServer(credentials, httpsApp);


http.createServer(httpApp).listen(httpApp.get('port'), function() {
  console.log('Express HTTP server listening on port ' + httpApp.get('port'));
});


const server = httpsServer.listen(httpsApp.get('port'), () => {
  console.log(`HTTPS server on port ${httpsApp.get('port')}`);
});



//WebSockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {

  //console.log('new connection'); 

  socket.on('notify:cabinetInsert', (data) => {

    console.log('Se inserto un gabinete');

    io.sockets.emit('notify:cabinetInsert');

  });


  socket.on('notify:cabinetDelete', (data) => {

    console.log('Se borro un gabinete');

    io.sockets.emit('notify:cabinetDelete');

  });

  socket.on('notify:cabinetUpdate', (data) => {

    console.log('Se actualizo un gabinete');

    io.sockets.emit('notify:cabinetUpdate');

  });

  socket.on('notify:cabinetStateUpdate', (data) => {

    console.log('Se cambio el estado de un gabinete');

    io.sockets.emit('notify:cabinetStateUpdate');

  });


  socket.on('notify:deviceInsert', (data) => {

    console.log('Se ingreso un nuevo dispositivo');

    io.sockets.emit('notify:deviceInsert');

  });

});