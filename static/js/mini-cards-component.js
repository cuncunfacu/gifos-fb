import {getGif} from './api-calls.js';
import {cardMaxComponent} from './card-max-component.js';
import {apiKey, baseUrl} from './settings.js'
const miniCardsComponent = async (miniCardDiv, ids=null, gifsArr = null, reloadOnMiniCardClose = false) => {
    // if we pass an array already with gifs imgs url
    if (gifsArr) {
        gifsArr.forEach(async element => {
            let imgDiv = document.createElement('div');
            imgDiv.classList.add('mini-card');
            imgDiv.id = 'mini-card-'+element.id
            let img = document.createElement('img');
            img.src = element.images.downsized.url;
            imgDiv.appendChild(img);
    
            //todo event listener for maxcard and hoover
            imgDiv.addEventListener('click', () => {
                cardMaxComponent(element.id, reloadOnMiniCardClose)
            })
            //todo ver mas
    
            miniCardDiv.appendChild(imgDiv);
        });
    }

    // if we need to get the img url from the api providing the id
    if (ids){
        ids.forEach(async id => {
            let gifData = await getGif(id);
            let imgDiv = document.createElement('div');
            imgDiv.classList.add('mini-card');
            imgDiv.id = 'mini-card-'+id
            let img = document.createElement('img');
            img.src = gifData.images.downsized.url;
            imgDiv.appendChild(img);
    
            //todo event listener for maxcard and hoover
            imgDiv.addEventListener('click', () => {
                cardMaxComponent(id, reloadOnMiniCardClose)
            })
            //todo ver mas
    
            miniCardDiv.appendChild(imgDiv);
        });
    }

    return miniCardDiv;
}

export {miniCardsComponent}