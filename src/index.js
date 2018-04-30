import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import SVG from 'svg.js';
//
// let width = window.innerWidth;
// let height = window.innerHeight;
// const draw = SVG('drawing').size(width, height);
//
// const blockLength = 20;
// const blockMargin = 2;
// const blockTotalLength = blockLength + blockMargin;
//
// const fullHeight = parseInt(width / 1.5 / blockTotalLength);
// const fullWidth = parseInt(width / blockTotalLength);
// window.draw = draw;
//
// const bloxLandscape = [
//   90,
//   90,
//   90,
//   50,
//   50,
//   80,
//   80,
//   80,
//   60,
//   60,
//   100,
//   100,
//   100,
//   100,
//   60,
//   60,
//   60,
//   50,
//   50,
//   50,
//   90,
//   90,
//   90
// ];
//
// let xPos = blockMargin;
// let yPos = 0;
// let rects = [];
// for (var i = 0; i < fullWidth + 1; i++) {
//   let bloxInCol = parseInt(fullHeight / 100 * bloxLandscape[i]);
//   for (var j = 0; j < bloxInCol; j++) {
//     const rect = window.draw
//       .rect(blockLength, blockLength)
//       .attr({ fill: '#04538e', opacity: 0.05 });
//     rect.attr({ x: xPos, y: 0 });
//     const rapper = {
//       rect: rect,
//       xPos: xPos,
//       yPos: yPos
//     };
//     rects.push(rapper);
//     yPos = yPos + blockTotalLength;
//   }
//
//   xPos = xPos + blockTotalLength;
//   yPos = 0;
// }
//
// for (var k = 0; k < rects.length; k++) {
//   const rect = rects[k].rect;
//   const xPos = rects[k].xPos;
//   const yPos = rects[k].yPos;
//   rect.animate(1000, '<', 0).attr({ x: xPos, y: height - yPos });
// }

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
