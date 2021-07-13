import {navBarComponent} from './nav-bar-component.js';
import {isDarkMode, renderDarkMode} from './api-calls.js';

let video = document.createElement('video');
video.id = 'gif-vid';
let navBarComponentDiv = document.getElementById('nav-bar-component');
let beginButton = document.getElementById('btn-comenzar');
let contentBox = document.getElementById('content-box');
let content = document.getElementById('content');
let oval1 = document.getElementById('oval1');
let oval2 = document.getElementById('oval2');
let oval3 = document.getElementById('oval3');

const record = (stream) => {
    let videoEl = document.getElementById('gif-vid');
    //connect the media stream to the first video element
    if ("srcObject" in videoEl) {
        videoEl.srcObject = stream;
    } else {
        //old version
        videoEl.src = window.URL.createObjectURL(mediaStreamObj);
    }
    videoEl.onloadedmetadata = () => {
        video.play();
    };
}
const handleBeggin = async () => {
    document.getElementById('content-h1').innerText = '¿Nos das acceso a tu cámara?';
    document.getElementById('content-p').innerText = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.'
    oval1.src = 'static/images/paso-a-paso-hover1.svg';
    beginButton.remove()
    let stream = null;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { height: { max: 200 } } });
        /* use the stream */
        content.appendChild(video);
        record(stream)
    } catch (err) {
        /* handle the error */
    }
}

beginButton.addEventListener('click', async () => {
    handleBeggin();
})
navBarComponent(navBarComponentDiv);
renderDarkMode(isDarkMode());

