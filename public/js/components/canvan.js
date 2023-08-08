const todolist = document.querySelectorAll('.todo__list__li');
const sections = document.querySelectorAll('.canvan section');



for (const section of sections) {
    section.addEventListener('dragover', (e) => {
        e.preventDefault();
        
    });

    section.addEventListener('drop', (e) => {
        e.preventDefault();
        const selected = document.querySelector('.dragging');
        todolist.forEach((list) => {
            const itemId = list.getAttribute('data-id')
            updateItem(itemId, list)
        })
        
        
        if (selected) {
            section.querySelector('ul').appendChild(selected);
            selected.classList.remove('dragging');
            // process_idx를 받아야하고 section위치도 인지해야하고 in_process도 받아와야하고
            const id = 0 // process_idx
            const sectionindex = 0 // ex) done__list, todo_list data-id 줘서 1 ,2 ,3 이렇게 줘서 1이면 fetch 뭐 주고 이렇게?
            const in_process = 0 // 만약에 sectionindex가 1이면 todo 2면 progress 3이면 done 이렇게?

            // 보내기
            fetch(`/group/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    process:"내가 넣을 프로세스 정보"
                }
                
            })
            .then(response => { // 오류처리
                if (response.ok) {
                    console.log('Update successful');
                } else {
                    console.error('Update failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
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


function updateItem(id, deleteBtn) {
  fetch(`/group/delete/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  })
  .then(data => {
      console.log('데이터메시지',data.message); // 서버에서 보낸 응답 메시지
      if (data) {
          deleteBtn.parentNode.parentNode.style.display = 'none'
      }
      console.log(data)
       
    
    // 화면에서 삭제된 항목 제거 (예: button.parentNode.remove())
  })
  .catch(error => {
    console.error('Fetch error:', error);
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


//  delete

const listDelete = document.querySelectorAll(".list__delete-btn")


listDelete.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (e) => {
        
        const itemId = deleteBtn.getAttribute('data-id')
        deleteItem(itemId, deleteBtn)
    })
})



function deleteItem(id, deleteBtn) {
  fetch(`/group/delete/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  })
  .then(data => {
      console.log('데이터메시지',data.message); // 서버에서 보낸 응답 메시지
      if (data) {
          deleteBtn.parentNode.parentNode.style.display = 'none'
      }
      console.log(data)
       
    
    // 화면에서 삭제된 항목 제거 (예: button.parentNode.remove())
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}

