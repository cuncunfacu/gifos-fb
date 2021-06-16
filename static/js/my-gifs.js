import {apiKey, baseUrl} from './settings.js';
import {trendingGifsComponent} from './trending-gifs-component.js';
import {navBarComponent} from './nav-bar-component.js';
import {miniCardsComponent} from './mini-cards-component.js';
import {getFavs} from './api-calls.js';

let trendingGifsComponentDiv = document.getElementById('trending-gifs-component');
let navBarComponentDiv = document.getElementById('nav-bar-component');
let favoritesMiniCards = document.getElementById('mygifs-mini-cards');

let favoriteGifsIds = [];
favoriteGifsIds.push(['9lEGNc2hPkmevAciHq', 'l2olcETxXQjImhNcm2', '3oxQNhG6QjONT91Ga4', 'TSIsZjiAPbFBFNNaJj'])
localStorage.clear()
localStorage.setItem('favoriteGifsIds', JSON.stringify(favoriteGifsIds))


navBarComponent(navBarComponentDiv);
trendingGifsComponent(trendingGifsComponentDiv);

let favsIds = getFavs()
console.log(favsIds)
if (favsIds.length != 0) {
    miniCardsComponent(favoritesMiniCards, favsIds);
}else {
    // todo render no favss view
    let p = document.createElement('p');
    p.innerText = 'No FAVS'
    favoritesMiniCards.appendChild(p)
}