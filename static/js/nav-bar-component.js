import {toggleDarkMode, renderDarkMode, isDarkMode} from './api-calls.js';

const navBarComponent = (navBarComponentDiv) => {
    const darkMode = isDarkMode();
    let navHeader = document.createElement('div');
    navHeader.classList.add('nav-header', 'container');

    // for big screens
    let bigScreenLinksDiv = document.createElement('div')

    let logo = document.createElement('a');
    logo.href = 'index.html';
    logo.classList.add('logo');

    let logoImg = document.createElement('img');
    if (darkMode){
        logoImg.src = './static/images/logo-mobile-modo-noct.svg';
    } else {
        logoImg.src = './static/images/logo-mobile.svg';
    }
    logoImg.alt = 'logo';
    logoImg.id = 'logo-mobile';
    logo.appendChild(logoImg);

    let logoImgDesk = document.createElement('img');
    if (darkMode){
        logoImgDesk.src = './static/images/Logo-modo-noc.svg';
    } else {
        logoImgDesk.src = './static/images/logo-desktop.svg';
    }
    logoImgDesk.alt = 'logo';
    logoImgDesk.id = 'logo-desktop';
    logo.appendChild(logoImgDesk);

    let navLinks = document.createElement('nav');
    let navLinkSepLine1 = document.createElement('div');
    navLinkSepLine1.classList.add('sep')
    let navLinkSepLine2 = document.createElement('div');
    navLinkSepLine2.classList.add('sep')

    let navUl = document.createElement('ul');
    // navUl.classList.add('container');
    
    let navDarkMode = document.createElement('li');
    navDarkMode.id = "dark-mode-li";

    if (darkMode) {
        navDarkMode.innerText = "MODO DIURNO";
    } else {
        navDarkMode.innerText = "MODO NOCTURNO";
    }
    // todo modo nocturno eventlistener
    navDarkMode.addEventListener('click', () => {
        toggleDarkMode();
    })

    navUl.appendChild(navDarkMode)
    navUl.appendChild(navLinkSepLine1)

    let navFavorites = document.createElement('li');
    let navFavoritesA = document.createElement('a');
    navFavoritesA.href = 'favorites.html';
    navFavoritesA.innerText = 'FAVORITOS';
    navFavorites.appendChild(navFavoritesA);
    navUl.appendChild(navFavorites)
    navUl.appendChild(navLinkSepLine2)

    let navMyGifs = document.createElement('li');
    let navMyGifsA = document.createElement('a');
    navMyGifsA.href = 'my-gifs.html';
    navMyGifsA.innerText = 'MIS GIFOS';

    navMyGifs.appendChild(navMyGifsA);
    navUl.appendChild(navMyGifs);

    let btnCrearGifoLi = document.createElement('li');
    let btnCrearGifo = document.createElement('img');
    btnCrearGifo.src = './static/images/button-crear-gifo.svg';
    btnCrearGifo.classList.add('crear-gif-btn');
    btnCrearGifoLi.appendChild(btnCrearGifo);
    navUl.appendChild(btnCrearGifoLi);

    btnCrearGifo.addEventListener('click', () => {
        window.location.href = '/create-gif.html'
    })
    navLinks.appendChild(navUl);
    navLinks.classList.add('hide', 'nav-links', 'container');

    let hamburgerToggle = document.createElement('div');
    hamburgerToggle.classList.add('hamburger-option', 'ham-untoggled', 'container');

    for (let i = 0; i < 3; i++) {
        let span = document.createElement('span');
        span.id = 'ham-span-' + (i+1);
        hamburgerToggle.appendChild(span);
        
    }

    hamburgerToggle.addEventListener('click', () => {
        let ham3 = document.getElementById('ham-span-3');
        
        const isToggled = hamburgerToggle.classList.contains('ham-untoggled');
    
        if (isToggled) {
            ham3.classList.remove('hide');
            navLinks.classList.remove('hide');
            hamburgerToggle.classList.remove('ham-untoggled');
            hamburgerToggle.classList.add('ham-toggled');
        } else {
            ham3.classList.remove('hide');
            navLinks.classList.add('hide');
            hamburgerToggle.classList.add('ham-untoggled');
            hamburgerToggle.classList.remove('ham-toggled');
        }
    })

    navHeader.appendChild(logo);


    navHeader.appendChild(hamburgerToggle);
    navBarComponentDiv.appendChild(navHeader);
    navBarComponentDiv.appendChild(navLinks);

    bigScreenLinksDiv.appendChild(navLinks);
    navBarComponentDiv.appendChild(bigScreenLinksDiv);
}

export {navBarComponent}