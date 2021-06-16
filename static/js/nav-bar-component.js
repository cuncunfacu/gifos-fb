const navBarComponent = (navBarComponentDiv) => {
    let navHeader = document.createElement('div');
    navHeader.classList.add('nav-header', 'container');

    let logo = document.createElement('a');
    logo.href = '/';
    logo.classList.add('logo');

    let logoImg = document.createElement('img');
    logoImg.src = './static/images/logo-mobile.svg';
    logo.alt = 'logo';
    logo.appendChild(logoImg);

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
}

export {navBarComponent}