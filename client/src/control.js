import io from 'socket.io-client';
import * as helper from './pdfjs-helper';
import config from './config.json';

import './control.css';

const PAGE_NUMBER_MSG = 'page_number';
const INIT_MSG = 'init';
const PASSWORD_MSG = 'password'
const ip = config.adress;
const port = config.port;
const docName = config.document;

const storage = window.localStorage;

let userPassword = storage.getItem('pass');
if (userPassword === null) {
  userPassword = prompt('Enter the password: ');
}

const socket = io(ip + ':' + port);
const url = `//${ip}:${port}/pdf`;

socket.on('connect', () => {
  console.log('Connected to the server!');
  socket.emit(PASSWORD_MSG, userPassword);
}); 

socket.on(PASSWORD_MSG, message => {
  if (!message) {
    storage.removeItem('pass');
    alert('Wrong password!');
    location.reload();
  } else {
    storage.setItem('pass', userPassword);
    socket.emit(INIT_MSG, "");  
  }
});

socket.on(INIT_MSG, message => {
  console.log('Page number is ' + message);
  helper.setPageNumber(+message);
  helper.setScale(3);
  helper.init(ip, port, docName);
});


const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

prevBtn.addEventListener('click', e => {
  helper.onPrevPage();
  socket.emit(PAGE_NUMBER_MSG, helper.getPageNumber());
});
nextBtn.addEventListener('click', e => {
  helper.onNextPage();
  socket.emit(PAGE_NUMBER_MSG, helper.getPageNumber());
});

document.addEventListener('keydown', e => {
  if (e.keyCode === 37) {
    helper.onPrevPage();
    socket.emit(PAGE_NUMBER_MSG, helper.getPageNumber());
  } else if (e.keyCode === 39) {
    helper.onNextPage();
    socket.emit(PAGE_NUMBER_MSG, helper.getPageNumber());
  }
});
