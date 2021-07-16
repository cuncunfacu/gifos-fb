import {apiKey, baseUrl} from './settings.js';
import {trendingGifsComponent} from './trending-gifs-component.js';
import {navBarComponent} from './nav-bar-component.js';
import {miniCardsComponent} from './mini-cards-component.js';
import {getFavs, isDarkMode, renderDarkMode, getMyGifs} from './api-calls.js';

let trendingGifsComponentDiv = document.getElementById('trending-gifs-component');
let navBarComponentDiv = document.getElementById('nav-bar-component');
let myGifsMiniCards = document.getElementById('mygifs-mini-cards');


navBarComponent(navBarComponentDiv);
renderDarkMode(isDarkMode());
trendingGifsComponent(trendingGifsComponentDiv);

let myGifs = getMyGifs()

if (myGifs.length != 0) {
    miniCardsComponent(myGifsMiniCards, myGifs);
    let viewMoreBtn = document.createElement('button');
    let viewMoreDiv = document.getElementById('view-more-div');
    viewMoreBtn.innerText = 'Ver mas';
    viewMoreBtn.classList.add('view-more-btn');
    viewMoreBtn.addEventListener('click', () => {
        miniCardsComponent(myGifsMiniCards, myGifs.slice(12), null, true);
        viewMoreBtn.classList.add('hide')
    })

    if (myGifs.length > 12) {
        viewMoreDiv.appendChild(viewMoreBtn)
    }
}else {
    let noContentDiv = document.createElement('div');
    noContentDiv.classList.add('no-content', 'container');

    let noMyImg = document.createElement('img');
    let noMyP = document.createElement('p');
    noMyP.innerText = "¡Anímate a crear tu primer GIFO!";
    noMyImg.src = './static/images/icon-mis-gifos-sin-contenido.svg';

    noContentDiv.appendChild(noMyImg);
    noContentDiv.appendChild(noMyP);
    myGifsMiniCards.appendChild(noContentDiv)
}