const noticeBtn = document.querySelector('.group__notice')
const noticeList = document.querySelector('.notice__list')
const canvanBoard = document.querySelector('.canvan')
const canvanBtn = document.querySelector('.group__board')


// const canvan

noticeBtn.addEventListener('click', () => {
    noticeBtn.classList.add('blue')
    noticeList.classList.remove('hidden')
    canvanBtn.classList.remove('blue')
    canvanBoard.classList.add('hidden')
})

canvanBtn.addEventListener('click', () => {
    canvanBtn.classList.add('blue')
    canvanBoard.classList.remove('hidden')
    noticeBtn.classList.remove('blue')
    noticeList.classList.add('hidden')
})