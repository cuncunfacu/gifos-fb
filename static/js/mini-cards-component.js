import {getGif} from './api-calls.js';
import {cardMaxComponent} from './card-max-component.js';
import {apiKey, baseUrl} from './settings.js'
const miniCardsComponent = async (miniCardDiv, ids) => {

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
            cardMaxComponent(id)
        })
        //todo ver mas

        miniCardDiv.appendChild(imgDiv);
    });

    return miniCardDiv;
}

export {miniCardsComponent}