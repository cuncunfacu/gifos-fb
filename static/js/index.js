import {apiKey, baseUrl} from './settings.js';
import {trendingGifsComponent} from './trending-gifs-component.js';
import {navBarComponent} from './nav-bar-component.js';
import {miniCardsComponent} from './mini-cards-component.js'
import { getGif, searchGifs } from './api-calls.js';

let searchGray = document.getElementById('search-gray');
let searchBlue = document.getElementById('search-blue');
let resultsDiv = document.getElementById('results-div');
let searchResultLine = document.getElementById('search-result-line');

let trendingGifsComponentDiv = document.getElementById('trending-gifs-component');
let navBarComponentDiv = document.getElementById('nav-bar-component');
let searchResultsTitle = document.getElementById('search-results-title');
let searchResultsMiniCards = document.getElementById('search-results-mini-cards');

// api calls

let getTrending = async (baseUrl, apiKey) => {
    const url = baseUrl + `/trending/searches?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        let data = await response.json()
        const trendingCatArr = data.data.slice(0,5)
        let trendingCat = trendingCatArr[0];
        for (let index = 1; index < trendingCatArr.length; index++) {
            const element = trendingCatArr[index];
            trendingCat = trendingCat + ', '+ element
        }
        // console.log(trendingCat)
        let trendingP = document.getElementById('trending-categories')
        trendingP.innerText = trendingCat
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
            searchImg.src = './static/images/icon-search-mod-gray.svg';
            
            let sugestedTextSpan = document.createElement('span');
            sugestedTextSpan.innerText = sugestedString;

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
    let resultsData = await searchGifs(searchString);
    miniCardsComponent(searchResultsMiniCards, null ,resultsData, false)
}
renderSearch('hola')