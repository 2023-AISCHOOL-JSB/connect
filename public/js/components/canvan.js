
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

const listMenuBtn = document.querySelector('.list__menu-btn')
const listButtons = document.querySelector('.list__buttons')

let handCount = 0
listMenuBtn.addEventListener('click', () => {
    listButtons.classList.toggle('hidden')
    handCount++
    if (handCount % 2 == 1) {
        listMenuBtn.innerHTML = `<i class="fa-solid fa-hand"></i>`
    } else {
        listMenuBtn.innerHTML = `<i class="fa-regular fa-hand"></i>`
    }
    

})