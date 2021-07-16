import {trendingGifsComponent} from './trending-gifs-component.js';
import {navBarComponent} from './nav-bar-component.js';
import {miniCardsComponent} from './mini-cards-component.js';
import {getFavs, isDarkMode, renderDarkMode} from './api-calls.js';

let trendingGifsComponentDiv = document.getElementById('trending-gifs-component');
let navBarComponentDiv = document.getElementById('nav-bar-component');
let favoritesMiniCards = document.getElementById('favorites-mini-cards');

navBarComponent(navBarComponentDiv);
renderDarkMode(isDarkMode());
trendingGifsComponent(trendingGifsComponentDiv);

let favsIds = getFavs()
if (favsIds.length != 0) {
    miniCardsComponent(favoritesMiniCards, favsIds.slice(0,12), null, true);
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
    let noContentDiv = document.createElement('div');
    noContentDiv.classList.add('no-content', 'container');

    let noFavsImg = document.createElement('img');
    let noFavsP = document.createElement('p');
    noFavsP.innerText = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!";
    noFavsImg.src = './static/images/icon-fav-sin-contenido.svg';

    noContentDiv.appendChild(noFavsImg);
    noContentDiv.appendChild(noFavsP);
    favoritesMiniCards.appendChild(noContentDiv)
}
