const body = document.body;

// 스크롤 맨 위로 이동 버튼 함수
const handleScrollUpBtn = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 부드러운 스크롤
    });
}

// 다크모드 토글
const handleDarkModeToggle = () => {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
}

if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
}