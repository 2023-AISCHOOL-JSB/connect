const loginBtn = document.querySelector('.login__btn')
const loginClose = document.querySelector('.login__close')
const login = document.querySelector('.login')

loginBtn.addEventListener('click', () => {
    login.classList.add('show-modal')
    console.log('hi')
})

loginClose.addEventListener('click', (event) => {
    login.classList.remove('show-modal')
    console.log('hi')
  
})


const modalBackground = document.querySelector('.login');

modalBackground.addEventListener('click', (event) => {
    if (event.target == modalBackground) {
        modalBackground.classList.remove('show-modal')
    }
        
})