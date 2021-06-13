const trendingGifsComponent = async (baseUrl, apiKey, trendingGifsComponentDiv) => {
    const url = baseUrl + `/gifs/trending?api_key=${apiKey}`;

    let h2 = document.createElement('h2');
    h2.innerText = 'Tending GIFOS';
    trendingGifsComponentDiv.appendChild(h2);

    let p = document.createElement('p');
    p.innerText = 'Mira los últimos GIFOS de nuestra comunidad.';
    trendingGifsComponentDiv.appendChild(p);

    let trendingCarrouselDiv = document.createElement('div');
    trendingCarrouselDiv.id = 'trending-carrousel';
    trendingCarrouselDiv.classList.add('trending-carrousel', 'container');

    try {
        const response = await fetch(url);
        let data = await response.json();
        data = data.data.slice(0,12);

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            let trendingGifDiv = document.createElement('div');
            trendingGifDiv.classList.add('trending-card', 'container')
            trendingGifDiv.id = element.id;

            let trendingImg = document.createElement('img');
            trendingImg.src = element.images.downsized_medium.url;

            trendingGifDiv.appendChild(trendingImg);
            trendingCarrouselDiv.appendChild(trendingGifDiv);

        }
    } catch (error) {
        console.log(error)
        
    }
    trendingGifsComponentDiv.appendChild(trendingCarrouselDiv)
}

export {trendingGifsComponent};