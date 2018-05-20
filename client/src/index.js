import io from 'socket.io-client';
import * as helper from './pdfjs-helper';
import './index.css';

const PAGE_NUMBER_MSG = 'page_number';
const INIT_MSG = 'init';
const ip = 'localhost';

const socket = io(ip + ':3000');

socket.on('connect', () => {
  console.log('Connected to the server!');
  socket.emit(INIT_MSG, "");
}); 

socket.on(INIT_MSG, message => {
  console.log('Initial page number is ' + message);
  helper.setPageNumber(+message);
  helper.setScale(3);  
  helper.init(ip);
});

socket.on(PAGE_NUMBER_MSG, message => {
  if (helper.getPageNumber() != message) {
    helper.queueRenderPage(+message);
  }
})


