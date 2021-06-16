import {apiKey, baseUrl} from './settings.js';

const getGif = async (gifId) => {
    console.log('get GIF');
    const url = baseUrl + `/gifs/${gifId}?api_key=${apiKey}`;
    let response = await fetch(url)
    let data = await response.json();
    return data.data
}

const addFav = (id) => {
    let favoriteIds = JSON.parse(localStorage.favoriteGifsIds)[0];
    favoriteIds.push(id);
    localStorage.setItem('favoriteGifsIds', JSON.stringify(favoriteIds));
    console.log('Saved to Favorites - ' + id);
}

const removeFav = (id) => {
    let favoriteIds = JSON.parse(localStorage.favoriteGifsIds)[0];
    favoriteIds = favoriteIds.filter(item => item !== id)

    localStorage.setItem('favoriteGifsIds', JSON.stringify(favoriteIds));
    console.log('Saved to Favorites - ' + id);
}

const getFavs = () => {
    console.log('fetching favs')
    try {
        let favoriteIds = JSON.parse(localStorage.favoriteGifsIds)[0];
        if (favoriteIds !== undefined){
            return favoriteIds;
        } else{
            return []
        }
    } catch {
        console.log('No Favorites');
        return [];
    }
}
export {getGif, addFav, removeFav, getFavs};