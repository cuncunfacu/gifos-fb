import {apiKey, baseUrl} from './settings.js';

const getGif = async (gifId) => {
    const url = baseUrl + `/gifs/${gifId}?api_key=${apiKey}`;
    let response = await fetch(url)
    let data = await response.json();
    return data.data
}

const searchGifs = async (searchString, offset=12) => {
    const url = baseUrl + `/gifs/search?api_key=${apiKey}&q=${searchString}&offset=${offset}`;
    let response = await fetch(url);
    let data = await response.json();
    return data.data
}
const addFav = (id) => {
    let ids = getFavs()
    ids.push(id);
    
    let favoriteIds = [];
    favoriteIds.push(ids);
    localStorage.setItem('favoriteGifsIds', JSON.stringify((favoriteIds)));
}

const removeFav = (id) => {
    let ids = getFavs()
    const index = ids.indexOf(id);
    if (index > -1) {
        ids.splice(index, 1);
    }
    let favoriteIds = [];
    favoriteIds.push(ids);
    localStorage.setItem('favoriteGifsIds', JSON.stringify((favoriteIds)));
}

const isDarkMode = () => {
    let darkMode;
    try {
        darkMode = JSON.parse(localStorage.getItem('isDarkMode'))
        if (darkMode === null) {
            return false
        }
    } catch {
        return false
    }
    return darkMode;
}

const renderDarkMode = (mode) => {
    let body = document.getElementById('body');
    if (mode == true) {
        body.classList.add('body-night-mode');
    } else {
        body.classList.remove('body-night-mode');
    }
}

const toggleDarkMode = () => {
    let mode = isDarkMode();
    let darkModeLi = document.getElementById('dark-mode-li');

    localStorage.setItem('isDarkMode', JSON.stringify(!mode));
    location.reload();
}
const getFavs = () => {
    try {
        let favoriteIds = JSON.parse(localStorage.favoriteGifsIds)[0];
        if (favoriteIds !== undefined){
            return favoriteIds;
        } else{
            return []
        }
    } catch {
        return [];
    }
}
export {getGif, addFav, removeFav, getFavs, searchGifs, toggleDarkMode, isDarkMode, renderDarkMode};


