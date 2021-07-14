import {navBarComponent} from './nav-bar-component.js';
import {isDarkMode, renderDarkMode, uploadGif} from './api-calls.js';

let main = document.getElementById('main');
let video = document.createElement('video');
video.id = 'gif-vid';
video.classList.add('content')
let navBarComponentDiv = document.getElementById('nav-bar-component');
let beginButton = document.getElementById('btn-comenzar');
let recordBtn = document.createElement('button');
recordBtn.classList.add('btn-action');
recordBtn.innerText = 'GRABAR';

let stopRecordingBtn = document.createElement('button');
stopRecordingBtn.classList.add('btn-action');
stopRecordingBtn.innerText = 'FINALIZAR';

let uploadBtn = document.createElement('button');
uploadBtn.classList.add('btn-action');
uploadBtn.innerText = 'SUBIR GIFO';

let contentBox = document.getElementById('content-box');
let content = document.getElementById('content');
let oval1 = document.getElementById('oval1');
let oval2 = document.getElementById('oval2');
let oval3 = document.getElementById('oval3');

const startNStopRecord = async (stream) => {
    recordBtn.remove()
    let recorder = new RecordRTCPromisesHandler(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifPreview: function(gifURL) {
            let videoEl = document.getElementById('gif-vid');
            videoEl.src = gifURL;
        }
    });
    recorder.startRecording();

    stopRecordingBtn.addEventListener('click', async () => {
        await recorder.stopRecording();

        let blob = await recorder.getBlob();

        recorder = null;
        
        let videoEl = document.getElementById('gif-vid');
        videoEl.srcObject = null;
        videoEl.remove()
    
        let playBackGif = document.createElement('img');
        playBackGif.classList.add('content')
        playBackGif.src = URL.createObjectURL(blob);
        contentBox.appendChild(playBackGif)
        stopRecordingBtn.remove();
        
        uploadBtn.addEventListener('click', async () => {
            let purpleHover = document.getElementById('purple-hover');
            let statusImg = document.getElementById('gif-upload-status-svg');
            let statusMessage = document.getElementById('gif-upload-status-message');
            purpleHover.classList.remove('hide');
            let uploaded = await uploadGif(blob)
            if (uploaded) {
                statusImg.classList.remove('spinning-loader');
                statusImg.src = './static/images/ok.svg'
                statusMessage.innerText = 'GIFO subido con éxito';
            } else {
                statusMessage.innerText = 'No pudimos subir tu GIFO. Porfavor intentalo más tarde'
            }
        })

        stream.getTracks()[0].stop();
        main.appendChild(uploadBtn);
    })
    main.appendChild(stopRecordingBtn)
}

const record = (stream) => {
    let videoEl = document.getElementById('gif-vid');
    if ("srcObject" in videoEl) {
        videoEl.srcObject = stream;
    } else {
        videoEl.src = window.URL.createObjectURL(mediaStreamObj);
    }
    videoEl.onloadedmetadata = () => {
        video.play();
    };
    oval1.src = './static/images/paso-a-paso1.svg';
    oval2.src = './static/images/paso-a-paso-hover2.svg';
    recordBtn.addEventListener('click', () => {
        startNStopRecord(stream)
    })

    main.appendChild(recordBtn);
}


const handleBeggin = async () => {
    document.getElementById('content-h1').innerText = '¿Nos das acceso a tu cámara?';
    document.getElementById('content-p').innerText = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.'
    oval1.src = 'static/images/paso-a-paso-hover1.svg';
    beginButton.remove()
    let stream = null;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { height: { max: 200 } } });
        content.remove()
        contentBox.appendChild(video);
        record(stream)
    } catch (err) {
        console.log(err)
    }
}

beginButton.addEventListener('click', async () => {
    handleBeggin();
})
navBarComponent(navBarComponentDiv);
renderDarkMode(isDarkMode());

