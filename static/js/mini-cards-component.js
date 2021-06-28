import {getGif, getFavs, removeFav, addFav} from './api-calls.js';
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


        let hoverDivButtonGrp = document.createElement('div');
        hoverDivButtonGrp.classList.add('btn-grp','container');

        let favSvg = document.createElement('img');
        let favIds = getFavs();
        if (favIds.indexOf(element.id) > -1) {
            favSvg.src = './static/images/icon-fav-active.svg';
        } else {
            favSvg.src = './static/images/icon-fav.svg';
        }

        favSvg.addEventListener('click', () => {
            let favIds = getFavs();
            if (favIds.indexOf(element.id) > -1) {
                removeFav(element.id);
                favSvg.src = './static/images/icon-fav.svg';
            } else {
                addFav(element.id);
                favSvg.src = './static/images/icon-fav-active.svg';
            }
        })
        hoverDivButtonGrp.appendChild(favSvg);

        let downloadSvg = document.createElement('img');
        downloadSvg.src = './static/images/icon-download-hover.svg';
        hoverDivButtonGrp.appendChild(downloadSvg);

        let iconMax = document.createElement('img');
        iconMax.src = './static/images/icon-max-hover.svg';
        hoverDivButtonGrp.appendChild(iconMax);
        
        iconMax.addEventListener('click', () => {
                cardMaxComponent(element.id, reloadOnMiniCardClose)
        })

        hoverDiv.appendChild(hoverDivButtonGrp);

        let hoverDivTextGrp = document.createElement('div');
        hoverDivTextGrp.classList.add('txt-grp', 'container');
        
        let userTxt = document.createElement('h6');
        userTxt.innerText = element.username;
        hoverDivTextGrp.appendChild(userTxt);
        
        let gifTitle = document.createElement('h5');    
        gifTitle.innerText = element.title;
        hoverDivTextGrp.appendChild(gifTitle);

        hoverDiv.append(hoverDivTextGrp);
        imgDiv.appendChild(hoverDiv)

        //todo event listener for maxcard and hoover
        img.addEventListener('click', () => {
            if (screen.width < 1000){
                cardMaxComponent(element.id, reloadOnMiniCardClose)
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