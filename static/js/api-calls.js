import {apiKey, baseUrl} from './settings.js';

const getGif = async (gifId) => {
    console.log('get GIF');
    const url = baseUrl + `/gifs/${gifId}?api_key=${apiKey}`;
    let response = await fetch(url)
    let data = await response.json();
    console.log(data)
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
        console.log('splicing')
        ids.splice(index, 1);
    }
    let favoriteIds = [];
    favoriteIds.push(ids);
    localStorage.setItem('favoriteGifsIds', JSON.stringify((favoriteIds)));
}

const getFavs = () => {
    console.log('fetching favs')
    try {
        let favoriteIds = JSON.parse(localStorage.favoriteGifsIds)[0];
        if (favoriteIds !== undefined){
            console.log(favoriteIds)
            return favoriteIds;
        } else{
            console.log([])
            return []
        }
    } catch {
        console.log('No Favorites');
        return [];
    }
}
export {getGif, addFav, removeFav, getFavs};