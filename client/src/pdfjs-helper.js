import pdfjs from 'pdfjs-dist';
import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from 'constants';
require('pdfjs-dist/build/pdf.worker.entry.js');
pdfjs.GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.entry.js';

const canvas = document.querySelector('#pdf-canvas');
const context = canvas.getContext('2d');
const url = '//localhost:3000/getSlides/';
const docName = 'slides'

let pdfDocument = null;
let pageNumber = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1;


export function setScale(scale_) {
  scale = scale_;
}

export function getScale() {
  return scale;
}


export function getPageNumber() {
  return pageNumber;
}

export function setPageNumber(num) {
  pageNumber = num;
}


export function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}


export function onPrevPage() {
  if (pageNumber <= 1) {
    return;
  }
  pageNumber--;
  queueRenderPage(pageNumber);
}

export function onNextPage() {
  if (pageNumber >= pdfDocument.numPages) {
    return;
  }
  pageNumber++;
  queueRenderPage(pageNumber);
}


function renderPage(num) {
  pageRendering = true;
  pageNumber = num;

  pdfDocument.getPage(pageNumber).then(page => {
    const viewport = page.getViewport(scale);

    // Prepare canvas using PDF page dimensions
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    const renderTask = page.render(renderContext);
    renderTask.then(() => {
      console.log('Page rendered', pageNumber);
      pageRendering = false;
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });
}


pdfjs.getDocument(url + docName).promise.then(pdf => {
  console.log('Loaded!');
  pdfDocument = pdf;
  renderPage(pageNumber);

}, reason => console.error(reason));