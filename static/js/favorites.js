import {apiKey, baseUrl} from './settings.js';
import {trendingGifsComponent} from './trending-gifs-component.js';
import {navBarComponent} from './nav-bar-component.js';
import {miniCardsComponent} from './mini-cards-component.js';

let trendingGifsComponentDiv = document.getElementById('trending-gifs-component');
let navBarComponentDiv = document.getElementById('nav-bar-component');
let favoritesMiniCards = document.getElementById('favorites-mini-cards');

let favoriteGifsIds = [];
favoriteGifsIds.push(['9lEGNc2hPkmevAciHq', 'l2olcETxXQjImhNcm2', '3oxQNhG6QjONT91Ga4', 'TSIsZjiAPbFBFNNaJj'])
localStorage.clear()
localStorage.setItem('favoriteGifsIds', JSON.stringify(favoriteGifsIds))

trendingGifsComponent(trendingGifsComponentDiv);
navBarComponent(navBarComponentDiv);


const getFavsIds = () => {
    try {
        let favoriteIds = JSON.parse(localStorage.favoriteGifsIds)[0];
        return favoriteIds;
    } catch {
        console.log('No Favorites');
        return [];
    }
}

miniCardsComponent(favoritesMiniCards, getFavsIds());