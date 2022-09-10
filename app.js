const express = require('express');
const server = express();
const mainRouter = require('./routes/main');

server.set('view engine', 'ejs');
server.set('views', './views');

server.use('/', mainRouter);

// server.use((req, res, next) => {
//     res.statusCode = 404;
//     res.render('404');
//  })
 
server.listen(3000);