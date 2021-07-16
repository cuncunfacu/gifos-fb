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

let oval1Src = './static/images/paso-a-paso1.svg';
let oval1HoverSrc = './static/images/paso-a-paso-hover1.svg';
let oval2Src = './static/images/paso-a-paso2.svg';
let oval2HoverSrc = './static/images/paso-a-paso-hover2.svg';
let oval3Src = './static/images/paso-a-paso3.svg';
let oval3HoverSrc = './static/images/paso-a-paso-hover3.svg';

if (isDarkMode()) {
    oval1Src = './static/images/paso-a-paso-mod-noc1.svg';
    oval1HoverSrc = './static/images/paso-a-paso-hover-mod-noc1.svg'
    oval2Src = './static/images/paso-a-paso-mod-noc2.svg';
    oval2HoverSrc = './static/images/paso-a-paso-hover-mod-noc2.svg'
    oval3Src = './static/images/paso-a-paso-mod-noc3.svg';
    oval3HoverSrc = './static/images/paso-a-paso-hover-mod-noc3.svg'

    document.getElementById('camara-img').src = './static/images/camara-modo-noc.svg';
    document.getElementById('cinta-img').src = './static/images/element_cinta1-modo-noc.svg';
    oval1.src = oval1Src;
    oval2.src = oval2Src;
    oval3.src = oval3Src;
}

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
            uploadBtn.remove()
            let purpleHover = document.getElementById('purple-hover');
            let statusImg = document.getElementById('gif-upload-status-svg');
            let statusMessage = document.getElementById('gif-upload-status-message');
            purpleHover.classList.remove('hide');
            let uploaded = await uploadGif(blob)
            if (uploaded) {
                statusImg.classList.remove('spinning-loader');
                statusImg.src = './static/images/ok.svg'
                statusMessage.innerText = 'GIFO subido con éxito';
                oval2.src = oval2Src;
                oval3.src = oval3HoverSrc;
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
    oval1.src = oval1Src;
    oval2.src = oval2HoverSrc;
    recordBtn.addEventListener('click', () => {
        startNStopRecord(stream)
    })

    main.appendChild(recordBtn);
}


const handleBeggin = async () => {
    document.getElementById('content-h1').innerText = '¿Nos das acceso a tu cámara?';
    document.getElementById('content-p').innerText = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.'
    oval1.src = oval1HoverSrc;
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

