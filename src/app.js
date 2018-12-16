const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

const app = express();

// importing routes
const userRoutes = require('./routes/user');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: '35.237.171.241',
  user: 'administrador',
  password: 'moralesizabal',
  port: 3306,
  database: 'crudnodejsmysql'
}, 'single'));
app.use(express.urlencoded({extended: false}));


// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', userRoutes);
// app.use(function(req, res, next) {
//   res.status(404).render('404/index');
// });


// starting the server
const server = app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});




//WebSockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) =>{

  //console.log('new connection');

  socket.on('notify:insert', (data) => {

    console.log('Se inserto algo');

    io.sockets.emit('notify:insert');

  });


  socket.on('notify:delete', (data) => {

    console.log('Se borro algo');

    io.sockets.emit('notify:delete');

  });


} );