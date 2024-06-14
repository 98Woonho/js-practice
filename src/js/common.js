const darkModeToggle = document.getElementById('darkModeToggle');

// 스크롤 맨 위로 이동 버튼 함수
const handleScrollUpBtn = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 부드러운 스크롤
    });
}



let isToggled = false;

// 다크모드 토글
const handleDarkModeToggle = (btn) => {
    const body = document.querySelector('body');

    if (!isToggled) {
        btn.style.left = '45px';
        darkModeToggle.style.backgroundColor = '#e8e8e8';
        body.classList.add('dark-mode');
    } else {
        btn.style.left = '5px';
        darkModeToggle.style.backgroundColor = '#333333';
        body.classList.remove('dark-mode');
    }
    isToggled = !isToggled;
}