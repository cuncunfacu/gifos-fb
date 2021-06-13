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

    let hamburgerToggle = document.createElement('div');
    hamburgerToggle.classList.add('hamburger-option', 'ham-untoggled', 'container');

    hamburgerToggle.addEventListener('click', () => {
        let ham3 = document.getElementById('ham-span-3');
        
        const isToggled = hamburgerToggle.classList.contains('ham-untoggled');
    
        if (isToggled) {
            ham3.classList.add('hide');
            hamburgerToggle.classList.remove('ham-untoggled');
            hamburgerToggle.classList.add('ham-toggled');
        } else {
            ham3.classList.remove('hide');
            hamburgerToggle.classList.add('ham-untoggled');
            hamburgerToggle.classList.remove('ham-toggled');
        }
    })

    for (let i = 0; i < 3; i++) {
        let span = document.createElement('span');
        span.id = 'ham-span-' + (i+1);
        hamburgerToggle.appendChild(span);
        
    }
    navHeader.appendChild(logo);
    navHeader.appendChild(hamburgerToggle);
    navBarComponentDiv.appendChild(navHeader);
}

export {navBarComponent}