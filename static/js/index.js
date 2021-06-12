import {apiKey, baseUrl} from './settings.js'



let hamDiv = document.getElementById('hamburger-option');
let searchBar = document.getElementById('search-bar-div');
let searchGray = document.getElementById('search-gray');
let resultsDiv = document.getElementById('results-div');
let searchResultLine = document.getElementById('search-result-line');

searchGray.style.opacity = 0;
// aux functions 

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.innerHTML = "";
    }
}

// api calls

let getTrending = async (baseUrl, apiKey) => {
    const url = baseUrl + `/trending/searches?api_key=${apiKey}`;
    try {
            let resultsUl = document.getElementById('results-ul');
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


hamDiv.addEventListener('click', () => {
    let ham3 = document.getElementById('ham-span-3');
    
    const isToggled = hamDiv.classList.contains('ham-untoggled');

    if (isToggled) {
        ham3.classList.add('hide');
        hamDiv.classList.remove('ham-untoggled');
        hamDiv.classList.add('ham-toggled');
    } else {
        ham3.classList.remove('hide');
        hamDiv.classList.add('ham-untoggled');
        hamDiv.classList.remove('ham-toggled');
    }
})


// on page load
getTrending(baseUrl, apiKey)

let searchString = document.getElementById('search-input');
searchString.addEventListener('input', async (event) => {
    let searchString = event.target.value;
    if (searchString == '') {
        searchResultLine.classList.add('hide')
        searchGray.style.opacity = 0;
        resultsDiv.innerHTML = '';
    } else {
        searchGray.style.opacity = 1;
        let suggestionsArr = await getSearchSuggestions(searchString, baseUrl, apiKey);
        searchResultLine.classList.remove('hide')
        let resultsUl = document.createElement('ul')
        resultsUl.classList.add('suggested-results', 'container')
        for (let i = 0; i < suggestionsArr.length; i++) {
            console.log('for')
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
    }
})