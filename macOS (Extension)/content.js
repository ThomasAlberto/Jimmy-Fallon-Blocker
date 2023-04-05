
import faceapi from './face-api.js';
import { annotations } from './process-images.js';
console.log(annotations); // prints the annotations array


<script src="face-api.js"></script>
<script src="process-images.js"></script>

const { annotations } = require('./process-images.js');
console.log(annotations); // prints the annotations array


document.addEventListener("DOMContentLoaded", function() {
  
    
    var video = document.getElementsByTagName("video")[0];
    if (video) {
      // Code to modify video player
    }

});

const video = document.getElementsByTagName("video")[0];
const canvas = faceapi.createCanvasFromMedia(video);
document.body.append(canvas);
const displaySize = { width: video.width, height: video.height };
faceapi.matchDimensions(canvas, displaySize);
setInterval(async () => {
  const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  const faceMatcher = new faceapi.FaceMatcher(annotations.map(a => a.descriptor), 0.6);
  const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
  results.forEach((result, i) => {
    const box = resizedDetections[i].detection.box;
    const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
    drawBox.draw(canvas);
    if (result.label === '<jimmy fallon>') {
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = `${box.y}px`;
      overlay.style.left = `${box.x}px`;
      overlay.style.width = `${box.width}px`;
      overlay.style.height = `${box.height}px`;
      overlay.style.background = 'black';
      overlay.style.opacity = '0.7';
      document.body.append(overlay);
    }
  });
}, 100);
