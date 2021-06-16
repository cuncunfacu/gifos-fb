import {getGif} from './card-purple.js';
import {baseUrl, apiKey} from './settings.js';


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
            trendingGifDiv.addEventListener('click', async () => {
                let body = document.getElementById('body');
                let gifData = await getGif(apiKey, baseUrl, element.id);
                // render gif div with image and buttons

                let cardGifMaxDiv = document.createElement('div');
                cardGifMaxDiv.classList.add('card-gif-max', 'container');
                cardGifMaxDiv.id = 'card-max';

                let cardDivMaxMain = document.createElement('div');
                cardDivMaxMain.classList.add('card-div-max-main');

                let cardDivMaxImg = document.createElement('img');
                cardDivMaxImg.src = gifData.images.original.url;
                
                let cardDivMaxFooter = document.createElement('div');
                cardDivMaxFooter.classList.add('card-div-max-footer', 'container');

                let cardDivMaxLeftTxt = document.createElement('div');
                cardDivMaxLeftTxt.classList.add('card-div-max-left-txt');

                let userTxt = document.createElement('h6');
                userTxt.innerText = "User";

                let gifTitle = document.createElement('h5');
                gifTitle.innerText = "Título GIFO";

                let favSvg = document.createElement('img');

                // todo render fav o no fav
                favSvg.src = './static/images/icon-fav.svg';

                
                let downloadSvg = document.createElement('img');
                downloadSvg.src = './static/images/icon-download.svg';
                downloadSvg.classList.add('download-svg');

                cardDivMaxLeftTxt.appendChild(userTxt);
                cardDivMaxLeftTxt.appendChild(gifTitle);
                cardDivMaxFooter.appendChild(cardDivMaxLeftTxt);
                cardDivMaxFooter.appendChild(favSvg);
                cardDivMaxFooter.appendChild(downloadSvg);

                cardDivMaxMain.appendChild(cardDivMaxImg);
                cardDivMaxMain.appendChild(cardDivMaxFooter);

                let cross = document.createElement('div');
                cross.classList.add('cross', 'container')
                cross.addEventListener('click', () => {
                    cardGifMaxDiv.remove();
                })

                let crossDiv1 = document.createElement('div');
                crossDiv1.classList.add('cross-div-1');
                let crossDiv2 = document.createElement('div');
                crossDiv2.classList.add('cross-div-2');
                cross.appendChild(crossDiv1);
                cross.appendChild(crossDiv2);
                cardGifMaxDiv.appendChild(cross);

                cardGifMaxDiv.appendChild(cardDivMaxMain);
                body.appendChild(cardGifMaxDiv);

            })

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