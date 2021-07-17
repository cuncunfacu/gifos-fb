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
    localStorage.setItem('favoriteGifsIds', JSON.stringify((ids)));
}

const removeFav = (id) => {
    let ids = getFavs()
    const index = ids.indexOf(id);
    if (index > -1) {
        ids.splice(index, 1);
    }
    localStorage.setItem('favoriteGifsIds', JSON.stringify((ids)));
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
        let favoriteIds = JSON.parse(localStorage.favoriteGifsIds);
        if (favoriteIds !== undefined){
            return favoriteIds;
        } else{
            return []
        }
    } catch {
        return [];
    }
}
const getMyGifs = () => {
    try {
        let myGifs = JSON.parse(localStorage.getItem('myGifs'));
        if (myGifs !== undefined && myGifs !== null){
            return myGifs;
        } else{
            return []
        }
    } catch (err) {
        console.log(err)
        return [];
    }
}

const saveMyGif = (data) => {
    let myGifs = getMyGifs();
    myGifs.push(data)
    localStorage.setItem('myGifs', JSON.stringify(myGifs));
}
const uploadGif = async (blob) =>  {
    const uploadUrl = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`;
    let form = new FormData();
    console.log(blob)
    form.append('file', blob, 'myGif.gif');
    let response = await fetch(uploadUrl, {
        body: form,
        method: "post"
    })
    let data = await response.json();
    if (response.status == 200) {
        saveMyGif(data.data.id)
        return true
    } else {
        console.log('Hubo un error: '+ response.status)
        return false
    }
}

const downloadGif = async (gifId) => {
    let response = await fetch(`https://media2.giphy.com/media/${gifId}/giphy.gif?${apiKey}&rid=giphy.gif`);
    let file = await response.blob();
    let a = document.createElement('a')
    a.download = 'GIFOS_download';
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

export {getGif, addFav, removeFav, getFavs, searchGifs, toggleDarkMode, isDarkMode, renderDarkMode, uploadGif, getMyGifs, downloadGif};

