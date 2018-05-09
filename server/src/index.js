const app = require('express')();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');

const CONNECTION_MSG = 'connect'
const PAGE_NUMBER_MSG = 'page_number';
const INIT_MSG = 'init';

let currentPageNumber = 1;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/getSlides/:name', cors(), (req, res) => {
  let docName = req.params.name || 'default';
  res.sendFile(path.join(__dirname, '../shared/' + docName + '.pdf'));
});

io.on(CONNECTION_MSG, socket => {
  console.log('Client connected!', socket.id);
  
  socket.on(INIT_MSG, message => {
    socket.emit(INIT_MSG, currentPageNumber);
  })

  socket.on(PAGE_NUMBER_MSG, message => {
    currentPageNumber = message;
    socket.broadcast.emit(PAGE_NUMBER_MSG, currentPageNumber);
  });  
});

http.listen(3000, () => {
  console.log('App is running on port 3000...');
});