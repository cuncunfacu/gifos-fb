import {apiKey, baseUrl} from './settings.js';
import {trendingGifsComponent} from './trending-gifs-component.js';
import {navBarComponent} from './nav-bar-component.js';
import {miniCardsComponent} from './mini-cards-component.js';
import {getFavs, isDarkMode, renderDarkMode, getMyGifs} from './api-calls.js';

let trendingGifsComponentDiv = document.getElementById('trending-gifs-component');
let navBarComponentDiv = document.getElementById('nav-bar-component');
let myGifsMiniCards = document.getElementById('mygifs-mini-cards');

let favoriteGifsIds = [];
favoriteGifsIds.push(['9lEGNc2hPkmevAciHq', 'l2olcETxXQjImhNcm2', '3oxQNhG6QjONT91Ga4', 'TSIsZjiAPbFBFNNaJj'])
localStorage.setItem('favoriteGifsIds', JSON.stringify(favoriteGifsIds))


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
    // todo render no favss view
    let p = document.createElement('p');
    p.innerText = 'No GIFS'
    myGifsMiniCards.appendChild(p)
}