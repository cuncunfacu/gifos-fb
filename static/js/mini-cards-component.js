import {getGif} from './api-calls.js'
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
        miniCardDiv.appendChild(imgDiv);

        //todo event listener for maxcard and hoover

        //todo ver mas
    });

    return miniCardDiv;
}

export {miniCardsComponent}