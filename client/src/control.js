import io from 'socket.io-client';
import {onNextPage, onPrevPage, setPageNumber, getPageNumber, setScale} from './pdfjs-helper';

const url = '//localhost:3000/pdf';
const socket = io('http://localhost:3000');

const PAGE_NUMBER_MSG = 'page_number';
const INIT_MSG = 'init';

socket.on('connect', () => {
  console.log('Connected to the server!');
  socket.emit(INIT_MSG, "");
}); 

socket.on(INIT_MSG, message => {
  console.log('Page number is ' + message);
  setPageNumber(+message);
  setScale(0.8);
});

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

prevBtn.addEventListener('click', e => {
  onPrevPage();
  socket.emit(PAGE_NUMBER_MSG, getPageNumber());
})

nextBtn.addEventListener('click', e => {
  onNextPage();
  socket.emit(PAGE_NUMBER_MSG, getPageNumber());
})