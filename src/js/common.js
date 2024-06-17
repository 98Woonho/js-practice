const body = document.body;
const titleInput = document.getElementById('titleInput');
const dialog = document.getElementById('dialog');
const menuCloseIcon = document.getElementById('menuCloseIcon');
const menuCloseIconDarkMode = document.getElementById('menuCloseIconDarkMode');

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

    if (isDarkMode) {
        menuCloseIcon.style.display = 'none';
        menuCloseIconDarkMode.style.display = 'block';
    } else {
        menuCloseIcon.style.display = 'block';
        menuCloseIconDarkMode.style.display = 'none';
    }

    localStorage.setItem('dark-mode', isDarkMode);
}

// 만약 이전 페이지에서 다크모드를 활성화 했으면 다음 페이지에서도 활성화 유지
if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
    menuCloseIcon.style.display = 'none';
    menuCloseIconDarkMode.style.display = 'block';
} else {
    menuCloseIcon.style.display = 'block';
    menuCloseIconDarkMode.style.display = 'none';
}

let value;
titleInput.addEventListener('input', function (e) {
    value = e.target.value;
})

const handleSearch = () => {
    window.location.href = `search.html?title=${value}`;
}

const handleMenuIcon = () => {
    dialog.classList.add('visible');
}

dialog.addEventListener('click', function (e) {
    if (e.target === dialog) {
        dialog.classList.remove('visible');
    }
})

const handleMenuCloseIcon = () => {
    dialog.classList.remove('visible');
}

