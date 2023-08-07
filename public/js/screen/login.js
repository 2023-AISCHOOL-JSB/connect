const loginBtn = document.querySelector('.login__btn')
const loginClose = document.querySelector('.login__close')
const login = document.querySelector('.login')
const loginAlert = document.querySelector('.login__alert-text')
const loginId = document.querySelector('#id')
const loginPw = document.querySelector('#pw')
const loginSubmit = document.querySelector('.login__button')


// 로그인 경고



loginSubmit.addEventListener('click', (event) => {
    if (loginId.value === "") {
        event.preventDefault()
        loginAlert.innerText = '아이디를 입력해주세요'
    }
    else if (loginPw.value === "") {
        event.preventDefault()
        loginAlert.innerText = '비밀번호를 입력해주세요'
    }    
//     if (데이터베이스에 없다면){
//         event.preventDefault()
//         loginAlert.innerText = '아이디가 존재하지 않습니다.'
// }
//     if (비밀번호가 틀렸다면){
//         event.preventDefault()
//         loginAlert.innerText = '비밀번호가 틀렸습니다..'
//     }
})




document.addEventListener('DOMContentLoaded', function() {
    loginBtn.addEventListener('click', () => {
    login.classList.add('show-modal')
    console.log('hi')
})
});

// 로그인 모달


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