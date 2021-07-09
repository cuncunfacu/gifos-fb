import {apiKey, baseUrl} from './settings.js';
import {trendingGifsComponent} from './trending-gifs-component.js';
import {navBarComponent} from './nav-bar-component.js';
import {miniCardsComponent} from './mini-cards-component.js';
import {getFavs, isDarkMode, renderDarkMode} from './api-calls.js';

let trendingGifsComponentDiv = document.getElementById('trending-gifs-component');
let navBarComponentDiv = document.getElementById('nav-bar-component');
let myFifsMiniCards = document.getElementById('mygifs-mini-cards');

let favoriteGifsIds = [];
favoriteGifsIds.push(['9lEGNc2hPkmevAciHq', 'l2olcETxXQjImhNcm2', '3oxQNhG6QjONT91Ga4', 'TSIsZjiAPbFBFNNaJj'])
localStorage.setItem('favoriteGifsIds', JSON.stringify(favoriteGifsIds))


navBarComponent(navBarComponentDiv);
renderDarkMode(isDarkMode());
trendingGifsComponent(trendingGifsComponentDiv);

let favsIds = getFavs()
if (favsIds.length != 0) {
    miniCardsComponent(myFifsMiniCards, favsIds);
    let viewMoreBtn = document.createElement('button');
    let viewMoreDiv = document.getElementById('view-more-div');
    viewMoreBtn.innerText = 'Ver mas';
    viewMoreBtn.classList.add('view-more-btn');
    viewMoreBtn.addEventListener('click', () => {
        miniCardsComponent(favoritesMiniCards, favsIds.slice(12), null, true);
        viewMoreBtn.classList.add('hide')
    })

    if (favsIds.length > 12) {
        viewMoreDiv.appendChild(viewMoreBtn)
    }
}else {
    // todo render no favss view
    let p = document.createElement('p');
    p.innerText = 'No FAVS'
    favoritesMiniCards.appendChild(p)
}