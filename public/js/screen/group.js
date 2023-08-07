const groupNav = document.querySelectorAll('.group__nav');
const canvan = document.querySelector('.canvan')
const timeline = document.querySelector('.timeline')

// 보류


for (let i = 0; i < groupNav.length; i++){
    groupNav[i].addEventListener('click', (event) => {
        // 모든 탭의 파란색 클래스를 제거합니다.
        for (let j = 0; j < groupNav.length; j++) {
            groupNav[j].classList.remove('blue');
        }

        // 클릭한 탭에만 파란색 클래스를 추가합니다.
        event.currentTarget.classList.add('blue');
    });
}

// 실패 다음에 끝장본다 
// for (let i = 0; i < groupNav.length; i++) {
//     groupNav[i].addEventListener('click', () => {
//         for (let j = 0; j < groupNav.length; j++) {
//             if (i === j) {
//                 groupNav[j].classList.add('blue');
//             } else {
//                 groupNav[j].classList.remove('blue');
//             }
//         }
//         console.log(i);
//     });
// }
