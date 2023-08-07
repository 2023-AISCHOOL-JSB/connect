const writeGroup = document.querySelector('.write__group')
const writeSelect = document.querySelector('.write__select')
const selectValue = writeSelect.value

console.log(selectValue)


    writeSelect.addEventListener('input', () => {
        if (writeSelect.value === '게시판') {
            writeGroup.classList.add('hidden');
        } else {
            writeGroup.classList.remove('hidden');
        }
    });



const todayDateInput = document.getElementById('todayDate');

// 오늘 날짜를 가져오기 위한 함수
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 오늘 날짜를 input 요소의 value로 설정
todayDateInput.value = getTodayDate();