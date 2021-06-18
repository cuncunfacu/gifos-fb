import {getGif} from './api-calls.js';
import {getFavs, removeFav, addFav} from './api-calls.js'
const cardMaxComponent = async (id, reloadOnClose) => {
    let body = document.getElementById('body');
    let gifData = await getGif(id);

    // render gif div with image and buttons

    let cardGifMaxDiv = document.createElement('div');
    cardGifMaxDiv.classList.add('card-gif-max', 'container');
    cardGifMaxDiv.id = 'card-max';

    let cardDivMaxMain = document.createElement('div');
    cardDivMaxMain.classList.add('card-div-max-main');

    let cardDivMaxImg = document.createElement('img');
    cardDivMaxImg.src = gifData.images.original.url;
    
    let cardDivMaxFooter = document.createElement('div');
    cardDivMaxFooter.classList.add('card-div-max-footer', 'container');

    let cardDivMaxLeftTxt = document.createElement('div');
    cardDivMaxLeftTxt.classList.add('card-div-max-left-txt');

    let userTxt = document.createElement('h6');
    userTxt.innerText = gifData.username;

    let gifTitle = document.createElement('h5');
    gifTitle.innerText = gifData.title;

    let favSvg = document.createElement('img');
    favSvg.classList.add('fav-svg');

    // todo render fav o no fav
    
    let favIds = getFavs();
    if (favIds.indexOf(id) > -1) {
        favSvg.src = './static/images/icon-fav-active.svg';
    } else {
        favSvg.src = './static/images/icon-fav-same-size.svg';
    }

    favSvg.addEventListener('click', () => {
        let favIds = getFavs();
        if (favIds.indexOf(id) > -1) {
            removeFav(id);
            favSvg.src = './static/images/icon-fav-same-size.svg';
        } else {
            addFav(id);
            favSvg.src = './static/images/icon-fav-active.svg';
        }
    })
    
    let downloadSvg = document.createElement('img');
    downloadSvg.src = './static/images/icon-download.svg';
    downloadSvg.classList.add('download-svg');

    cardDivMaxLeftTxt.appendChild(userTxt);
    cardDivMaxLeftTxt.appendChild(gifTitle);
    cardDivMaxFooter.appendChild(cardDivMaxLeftTxt);
    cardDivMaxFooter.appendChild(favSvg);
    cardDivMaxFooter.appendChild(downloadSvg);

    cardDivMaxMain.appendChild(cardDivMaxImg);
    cardDivMaxMain.appendChild(cardDivMaxFooter);

    let cross = document.createElement('div');
    cross.classList.add('cross', 'container')
    cross.addEventListener('click', () => {
        if (reloadOnClose) {
            location.reload();
        } else {
            cardGifMaxDiv.remove()
        }
    } )

    let crossDiv1 = document.createElement('div');
    crossDiv1.classList.add('cross-div-1');
    let crossDiv2 = document.createElement('div');
    crossDiv2.classList.add('cross-div-2');
    cross.appendChild(crossDiv1);
    cross.appendChild(crossDiv2);
    cardGifMaxDiv.appendChild(cross);

    cardGifMaxDiv.appendChild(cardDivMaxMain);
    body.appendChild(cardGifMaxDiv);
}

export {cardMaxComponent}