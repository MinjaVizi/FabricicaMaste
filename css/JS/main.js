document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.querySelector('.hamburger-menu');
    var nav = document.querySelector('header nav');})

    hamburger.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    }); 