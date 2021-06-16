import {apiKey, baseUrl} from './settings.js';

const getGif = async (gifId) => {
    console.log('get GIF');
    const url = baseUrl + `/gifs/${gifId}?api_key=${apiKey}`;
    let response = await fetch(url)
    let data = await response.json();
    return data.data
}

export {getGif};