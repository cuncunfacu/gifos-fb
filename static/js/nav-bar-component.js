const navBarComponent = (navBarComponentDiv) => {
    let navHeader = document.createElement('div');
    navHeader.classList.add('nav-header', 'container');

    // for big screens
    let bigScreenLinksDiv = document.createElement('div')

    let logo = document.createElement('a');
    logo.href = '/';
    logo.classList.add('logo');

    let logoImg = document.createElement('img');
    logoImg.src = './static/images/logo-mobile.svg';
    logoImg.alt = 'logo';
    logoImg.id = 'logo-mobile';
    logo.appendChild(logoImg);

    let logoImgDesk = document.createElement('img');
    logoImgDesk.src = './static/images/logo-desktop.svg';
    logoImgDesk.alt = 'logo';
    logoImgDesk.id = 'logo-desktop';
    logo.appendChild(logoImgDesk);

    let navLinks = document.createElement('nav');
    

    let navUl = document.createElement('ul');
    
    let navDarkMode = document.createElement('li');
    navDarkMode.innerText = 'MODO NOCTURNO';
    // todo modo nocturno eventlistener
    navUl.appendChild(navDarkMode)

    let navFavorites = document.createElement('li');
    let navFavoritesA = document.createElement('a');
    navFavoritesA.href = '/favorites.html';
    navFavoritesA.innerText = 'FAVORITOS';
    navFavorites.appendChild(navFavoritesA);
    navUl.appendChild(navFavorites)

    let navMyGifs = document.createElement('li');
    let navMyGifsA = document.createElement('a');
    navMyGifsA.href = '/my-gifs.html';
    navMyGifsA.innerText = 'MIS GIFOS';

    navMyGifs.appendChild(navMyGifsA);
    navUl.appendChild(navMyGifs);

    let btnCrearGifoLi = document.createElement('li');
    let btnCrearGifo = document.createElement('img');
    btnCrearGifo.src = './static/images/button-crear-gifo.svg' ;
    btnCrearGifoLi.appendChild(btnCrearGifo);
    navUl.appendChild(btnCrearGifoLi);

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