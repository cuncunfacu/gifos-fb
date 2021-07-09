import {getGif, getFavs, addFav, removeFav} from './api-calls.js';
import {baseUrl, apiKey} from './settings.js';
import {cardMaxComponent} from './card-max-component.js';

const trendingGifsComponent = async (trendingGifsComponentDiv) => {
    const url = baseUrl + `/gifs/trending?api_key=${apiKey}&limit=13`;

    let h2 = document.createElement('h2');
    h2.innerText = 'Tending GIFOS';
    trendingGifsComponentDiv.appendChild(h2);

    let p = document.createElement('p');
    p.innerText = 'Mira los últimos GIFOS de nuestra comunidad.';
    trendingGifsComponentDiv.appendChild(p);

    let sliderBtnL = document.createElement('img');
    sliderBtnL.classList.add('slider-l');
    let sliderBtnR = document.createElement('img');
    sliderBtnR.classList.add('slider-r');
    sliderBtnL.src = './static/images/button-slider-left.svg';
    sliderBtnR.src = './static/images/Button-slider-right.svg';

    let carrDiv = document.createElement('div');
    carrDiv.classList.add('carr-div', 'container');


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
            trendingGifDiv.addEventListener('click', () => {
                if (screen.width < 1000){
                cardMaxComponent(element.id)
                }
            })
            let trendingImg = document.createElement('img');
            trendingImg.src = element.images.downsized_medium.url;

            let hoverDiv = document.createElement('div');
            hoverDiv.id = 'hover-div-'+element.id
            hoverDiv.classList.add('container','hover-div')
    
    
            let hoverDivButtonGrp = document.createElement('div');
            hoverDivButtonGrp.classList.add('btn-grp','container');
    
            let favSvg = document.createElement('img');
            let favIds = getFavs();
            if (favIds.indexOf(element.id) > -1) {
                favSvg.src = './static/images/icon-fav-active.svg';
            } else {
                favSvg.src = './static/images/icon-fav.svg';
            }
    
            favSvg.addEventListener('click', () => {
                let favIds = getFavs();
                if (favIds.indexOf(element.id) > -1) {
                    removeFav(element.id);
                    favSvg.src = './static/images/icon-fav.svg';
                } else {
                    addFav(element.id);
                    favSvg.src = './static/images/icon-fav-active.svg';
                }
            })
            hoverDivButtonGrp.appendChild(favSvg);
    
            let downloadSvg = document.createElement('img');
            downloadSvg.src = './static/images/icon-download-hover.svg';
            hoverDivButtonGrp.appendChild(downloadSvg);
    
            let iconMax = document.createElement('img');
            iconMax.src = './static/images/icon-max-hover.svg';
            hoverDivButtonGrp.appendChild(iconMax);
            
            iconMax.addEventListener('click', () => {
                    cardMaxComponent(element.id, false)
            })
    
            hoverDiv.appendChild(hoverDivButtonGrp);
    
            let hoverDivTextGrp = document.createElement('div');
            hoverDivTextGrp.classList.add('txt-grp', 'container');
            
            let userTxt = document.createElement('h6');
            userTxt.innerText = element.username;
            hoverDivTextGrp.appendChild(userTxt);
            
            let gifTitle = document.createElement('h5');    
            gifTitle.innerText = element.title;
            hoverDivTextGrp.appendChild(gifTitle);
    
            hoverDiv.append(hoverDivTextGrp);

            trendingGifDiv.appendChild(trendingImg);
            trendingGifDiv.appendChild(hoverDiv)
            trendingCarrouselDiv.appendChild(trendingGifDiv);

        }
    } catch (error) {
        console.log(error)
    }
    sliderBtnR.addEventListener('click', () => {
        trendingCarrouselDiv.scrollLeft += 300;
    })
    sliderBtnL.addEventListener('click', () => {
        trendingCarrouselDiv.scrollLeft -= 300;
    })
    carrDiv.appendChild(sliderBtnL);
    carrDiv.appendChild(trendingCarrouselDiv)
    carrDiv.appendChild(sliderBtnR);
    trendingGifsComponentDiv.appendChild(carrDiv)
}

export {trendingGifsComponent};