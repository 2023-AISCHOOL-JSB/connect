const menuBtn = document.querySelector('.header__menu')
const menuBar = document.querySelector('.menu-bar')
const menuClose = document.querySelector('.menu-bar__close')

menuBtn.addEventListener('click', () => {
    menuBar.classList.add('show-menu')
})

menuClose.addEventListener('click', () => {
    menuBar.classList.remove('show-menu')
})

