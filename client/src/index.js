import io from 'socket.io-client';
import * as helper from './pdfjs-helper';
import config from './config.json';

import './index.css';

const PAGE_NUMBER_MSG = 'page_number';
const INIT_MSG = 'init';

const ip = config.adress;
const port = config.port;
const docName = config.document;
const socket = io(ip + ':' + port);

socket.on('connect', () => {
  console.log('Connected to the server!');
  socket.emit(INIT_MSG, "");
}); 

socket.on(INIT_MSG, message => {
  console.log('Initial page number is ' + message);
  helper.setPageNumber(+message);
  helper.setScale(3);  
  helper.init(ip, port, docName);
});

socket.on(PAGE_NUMBER_MSG, message => {
  if (helper.getPageNumber() != message) {
    helper.queueRenderPage(+message);
  }
})


