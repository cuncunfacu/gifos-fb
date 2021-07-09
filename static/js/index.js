import {apiKey, baseUrl} from './settings.js';
import {trendingGifsComponent} from './trending-gifs-component.js';
import {navBarComponent} from './nav-bar-component.js';
import {miniCardsComponent} from './mini-cards-component.js'
import { getGif, searchGifs, renderDarkMode, isDarkMode } from './api-calls.js';

let searchGray = document.getElementById('search-gray');

let searchBlue = document.getElementById('search-blue');
let resultsDiv = document.getElementById('results-div');
let searchResultLine = document.getElementById('search-result-line');

let trendingGifsComponentDiv = document.getElementById('trending-gifs-component');
let navBarComponentDiv = document.getElementById('nav-bar-component');
let searchResultsDiv = document.getElementById('search-results-div')

let darkMode = isDarkMode();
// api calls
if (darkMode){
    searchGray.src="./static/images/icon-search-modo-noct.svg";
    searchBlue.src="./static/images/icon-search-modo-noct.svg";
} else {
    searchGray.src="./static/images/icon-search-mod-gray.svg";
    searchBlue.src="./static/images/icon-search.svg";
}
let getTrending = async (baseUrl, apiKey) => {
    const url = baseUrl + `/trending/searches?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        let data = await response.json()
        const trendingCatArr = data.data.slice(0,5)
        let trendingP = document.getElementById('trending-categories')
        for (let index = 1; index < trendingCatArr.length; index++) {
            let span = document.createElement('span')
            span.id = trendingCatArr[index];
            if (index == 4) {
                span.innerText = trendingCatArr[index];
            } else {
                span.innerText = trendingCatArr[index] + ', ';
            }
            span.addEventListener('click', () => {
                renderSearch(trendingCatArr[index].replace(' ','+'))
            })
            trendingP.appendChild(span);
        }
        // trendingP.innerText = trendingP.innerText.slice(0,-1)
    } catch (error) {
        console.log(error)
    }
    
}


let getSearchSuggestions = async (searchString, baseUrl, apiKey) => {
    // parse search string to replace ' ' with '+'

    const searchStringNoSpace = searchString.replace(' ','+')

    const url = baseUrl + `/gifs/search/tags?api_key=${apiKey}&q=${searchStringNoSpace}`

    try {
        const response = await fetch(url);
        let data = await response.json()
        if (data.data.length == 0) {
            return [{name: searchString}]
        } else {
            return data.data
        }
    } catch (error) {
        console.log(error)
    }
    
}

// on page load
searchGray.style.opacity = 0;
renderDarkMode(darkMode);
getTrending(baseUrl, apiKey);

let searchInput = document.getElementById('search-input');


trendingGifsComponent(trendingGifsComponentDiv);
navBarComponent(navBarComponentDiv);


// Search Suggestions
searchInput.addEventListener('input', async (event) => {
    let searchString = event.target.value;
    if (searchString == '') {
        resultsDiv.innerHTML = '';
        searchResultLine.classList.add('hide')
        searchBlue.classList.remove('hide');
        searchGray.style.opacity = 0;
    } else {
        searchGray.style.opacity = 1;
        let suggestionsArr = await getSearchSuggestions(searchString, baseUrl, apiKey);
        let resultsUl = document.createElement('ul')
        resultsUl.classList.add('suggested-results', 'container')
        for (let i = 0; i < suggestionsArr.length; i++) {
            const sugestedString = suggestionsArr[i].name;            
            
            let li = document.createElement('li');
            li.classList.add('container');
            
            let searchImg = document.createElement('img');
            if (darkMode) {
                searchImg.src = './static/images/icon-search-modo-noct.svg';
            } else {
                searchImg.src = './static/images/icon-search-mod-gray.svg';
            }
            
            let sugestedTextSpan = document.createElement('span');
            sugestedTextSpan.innerText = sugestedString;

            li.addEventListener('click', () => {
                renderSearch(sugestedString.replace(' ','+'))
                resultsDiv.innerHTML = '';
                searchResultLine.classList.add('hide')
            })
            li.appendChild(searchImg);
            li.appendChild(sugestedTextSpan);
            resultsUl.appendChild(li)
        }
        resultsDiv.innerHTML = '';
        resultsDiv.appendChild(resultsUl);
        searchResultLine.classList.remove('hide')
        searchBlue.classList.add('hide');
    }
})

const renderSearch = async (searchString) => {
    let tc = document.getElementById('trending-container');
    tc.remove()
    if (darkMode) {
        searchBlue.src = './static/images/close-modo-noct.svg';
    } else {
        searchBlue.src = './static/images/close.svg';
    }
    searchBlue.classList.remove('hide');
    searchBlue.addEventListener('click', e => location.reload())
    searchInput.value = searchString.replace('+',' ');
    let rdiv = document.getElementById('removable-div-results');
    if (rdiv){
        rdiv.remove()
    }
    rdiv = document.createElement('div');
    rdiv.id = 'removable-div-results';

    let searchResultsTitle = document.createElement('div');
    searchResultsTitle.id = 'search-results-title';
    searchResultsTitle.classList.add('search-result-title', 'container');

    let searchResultsMiniCards = document.createElement('div');
    searchResultsMiniCards.id = 'search-results-mini-cards'
    searchResultsMiniCards.classList.add('mini-cards', 'container')

    let searchStringh2 = document.createElement('h2');
    searchStringh2.innerText = searchString.replace('+',' ');

    let sepDiv = document.createElement('div');
    
    searchResultsTitle.appendChild(sepDiv);
    searchResultsTitle.appendChild(searchStringh2);


    let resultsData = await searchGifs(searchString);
    miniCardsComponent(searchResultsMiniCards, null ,resultsData.slice(0,12), false)
    let viewMoreBtn = document.createElement('button');
    let viewMoreDiv = document.createElement('div');
    viewMoreDiv.classList.add('view-more-div', 'container');
    viewMoreBtn.innerText = 'Ver mas';
    viewMoreBtn.classList.add('view-more-btn');
    viewMoreBtn.addEventListener('click', () => {
        miniCardsComponent(searchResultsMiniCards, null ,resultsData.slice(12), false)
        viewMoreBtn.classList.add('hide')
    })
    viewMoreDiv.appendChild(viewMoreBtn)

    rdiv.appendChild(searchResultsTitle);
    rdiv.appendChild(searchResultsMiniCards);

    if (resultsData.length > 12){
        rdiv.appendChild(viewMoreDiv)
    }

    searchResultsDiv.appendChild(rdiv);
}
