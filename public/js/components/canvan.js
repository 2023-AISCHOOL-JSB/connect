const todolist = document.querySelectorAll('.todo__list__li');
    const sections = document.querySelectorAll('.canvan section');

    for (const section of sections) {
        section.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        section.addEventListener('drop', (e) => {
            const selected = document.querySelector('.dragging');
            if (selected) {
                section.querySelector('ul').appendChild(selected);
                selected.classList.remove('dragging');
            }
        });
    }

    for (const item of todolist) {
        item.addEventListener('dragstart', (e) => {
            e.target.classList.add('dragging');
        });

        item.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });

    }


// write

const listMenuBtn = document.querySelectorAll('.list__menu-btn')
const listButtons = document.querySelectorAll('.list__buttons')


for (let i = 0; i < listMenuBtn.length; i++ ) {
    let handCount = 0
listMenuBtn[i].addEventListener('click', () => {
    listButtons[i].classList.toggle('hidden')
    handCount++
    console.log(handCount)
    if (handCount % 2 == 1) {
        listMenuBtn[i].innerHTML = `<i class="fa-solid fa-hand"></i>`
    } else {
        listMenuBtn[i].innerHTML = `<i class="fa-regular fa-hand"></i>`
    }
})
    }

const canvanWrite = document.querySelector(".canvan__write");
const openModalBtn = document.querySelector(".add-new-task-btn");
const closeModalBtn = document.querySelector(".canvan__write__close");
// 모달창 열기
openModalBtn.addEventListener("click", () => {
    canvanWrite.classList.remove('hidden')
    
  
});
// 모달창 닫기
closeModalBtn.addEventListener("click", () => {
    canvanWrite.classList.add('hidden')
    
})