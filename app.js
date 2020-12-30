var createError = require('http-errors'); 
var express = require('express'); 
var path = require('path'); 
var cookieParser = require('cookie-parser'); 
var logger = require('morgan'); 
var http = require("http"); 
var socketio = require("socket.io"); 
var app = express();
var btnvalue = 0; //static variable for current status

var indexRouter = require('./routes/index'); 
var usersRouter = require('./routes/users'); 

// Create the http server 
const server = require('http').createServer(app); 

// Create the Socket IO server on 
// the top of http server 
const io = socketio(server); 

// View engine setup 
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'jade'); 

app.use(logger('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/', indexRouter); 
app.use('/users', usersRouter); 

// Catch 404 and forward to error handler 
app.use(function (req, res, next) { 
	next(createError(404)); 
}); 

// Error handler 
app.use(function (err, req, res, next) { 

	// Set locals, only providing error 
	// in development 
	res.locals.message = err.message; 
	res.locals.error = req.app.get('env') 
			=== 'development' ? err : {}; 

	// render the error page 
	res.status(err.status || 500); 
	res.render('error'); 
}); 

module.exports = { app: app, server: server }; 

const { exec } = require("child_process");

io.sockets.on('connection', function (socket) {// WebSocket Connection
	io.emit('joined', btnvalue);

	socket.on('steambtn', function(data) { //get light switch status from client
		btnvalue = data;
		io.emit('steambtn', btnvalue);
		if(data == 1){
		exec("steamlink", (error, stdout, stderr) => {
    		if (error) {
        		console.log(`error: ${error.message}`);
				btnvalue = 0;
				io.emit('steambtn', btnvalue);
        		return;
   			}
    		if (stderr) {
        		console.log(`stderdr: ${stderr}`);
				btnvalue = 0;
				io.emit('steambtn', btnvalue);
        		return;
    		}
			console.log(`stdout: ${stdout}`);
			btnvalue = 0;
			io.emit('steambtn', btnvalue);
		});
		}
		
	});
  });