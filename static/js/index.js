let hamDiv = document.getElementById('hamburger-option');




hamDiv.addEventListener('click', () => {
    let ham3 = document.getElementById('ham-span-3');
    
    const isToggled = hamDiv.classList.contains('ham-untoggled');

    if (isToggled) {
        ham3.classList.add('hide');
        hamDiv.classList.remove('ham-untoggled');
        hamDiv.classList.add('ham-toggled');
    } else {
        ham3.classList.remove('hide');
        hamDiv.classList.add('ham-untoggled');
        hamDiv.classList.remove('ham-toggled');
    }
})
