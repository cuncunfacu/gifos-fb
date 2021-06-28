import {trendingGifsComponent} from './trending-gifs-component.js';
import {navBarComponent} from './nav-bar-component.js';
import {miniCardsComponent} from './mini-cards-component.js';
import {getFavs} from './api-calls.js';

let trendingGifsComponentDiv = document.getElementById('trending-gifs-component');
let navBarComponentDiv = document.getElementById('nav-bar-component');
let favoritesMiniCards = document.getElementById('favorites-mini-cards');


navBarComponent(navBarComponentDiv);
trendingGifsComponent(trendingGifsComponentDiv);

let favsIds = getFavs()
if (favsIds.length != 0) {
    miniCardsComponent(favoritesMiniCards, favsIds, null, true);
}else {
    // todo render no favss view
    let p = document.createElement('p');
    p.innerText = 'No FAVS'
    favoritesMiniCards.appendChild(p)
}