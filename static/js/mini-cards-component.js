import {getGif} from './api-calls.js';
import {cardMaxComponent} from './card-max-component.js';
import {apiKey, baseUrl} from './settings.js';
const renderMinicard = (element, miniCardDiv, reloadOnMiniCardClose) => {
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('mini-card');
        imgDiv.id = 'mini-card-'+element.id
        let img = document.createElement('img');
        img.src = element.images.downsized.url;
        imgDiv.appendChild(img);
        
        let hoverDiv = document.createElement('div');
        hoverDiv.id = 'hover-div-'+element.id
        hoverDiv.classList.add('container','hover-div')
        imgDiv.appendChild(hoverDiv)

        //todo event listener for maxcard and hoover
        img.addEventListener('click', () => {
            if (screen.width < 1000){
                cardMaxComponent(element.id, reloadOnMiniCardClose)
                console.log('clickk')
            }
        })

        miniCardDiv.appendChild(imgDiv);
}

const miniCardsComponent = async (miniCardDiv, ids=null, gifsArr = null, reloadOnMiniCardClose = false) => {
    // if we pass an array already with gifs imgs url
    if (gifsArr) {
        gifsArr.forEach(async element => renderMinicard(element, miniCardDiv, reloadOnMiniCardClose));
    }

    // if we need to get the img url from the api providing the id
    if (ids){
        ids.forEach(async id => {
            let element = await getGif(id);
            renderMinicard(element, miniCardDiv, reloadOnMiniCardClose)
        });
    }

    return miniCardDiv;
}

export {miniCardsComponent}