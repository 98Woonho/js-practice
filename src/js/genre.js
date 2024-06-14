let page = 1;

const handleGenre = (genreBtn) => {
    const title = document.querySelector('.main-title');
    const movies = document.getElementById('movies');
    const genreBtns = document.querySelectorAll('#genreBtns button');
    page = 1;

    title.innerText = '장르별 영화 - ' + genreBtn.innerText;

    movies.innerHTML = '';

    for (let btn of genreBtns) {
        btn.classList.remove('selected');
    }

    genreBtn.classList.add('selected');

    getMovies(page, genreBtn.id);
}


// 페이지 별 영화 목록 가져오기
function getMovies(page, genre, sort, voteCountGte) {
    if (voteCountGte) {
        axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=ko-KR&page=${page}&sort_by=popularity.desc&with_genres=${genre}&sort_by=${sort}&vote_count.gte=${voteCountGte}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGQ2YjY5OGJkZjMyNDk0ZmU1NDYzOGU3ZmVmNjk4YiIsInN1YiI6IjY2NjY0YzIxNTlmMjE0ODE2OGExNTM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kwltZDxWbQYihnw7WWODdmwrkr8DpVUSZZRmYiITxAw',
                accept: 'application/json'
            }
        })
            .then(res => {
                results = res.data.results;

                const movies = document.getElementById('movies');

                results.forEach(result => {
                    const poster_url = 'https://media.themoviedb.org/t/p/w220_and_h330_face' + result.poster_path;
                    const a = document.createElement('a');
                    const img = document.createElement('img');

                    a.href = `detail.html?movieId=${result.id}`;
                    img.src = poster_url;

                    a.appendChild(img);
                    movies.appendChild(a);
                })
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=ko-KR&page=${page}&sort_by=popularity.desc&with_genres=${genre}&sort_by=${sort}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGQ2YjY5OGJkZjMyNDk0ZmU1NDYzOGU3ZmVmNjk4YiIsInN1YiI6IjY2NjY0YzIxNTlmMjE0ODE2OGExNTM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kwltZDxWbQYihnw7WWODdmwrkr8DpVUSZZRmYiITxAw',
                accept: 'application/json'
            }
        })
            .then(res => {
                results = res.data.results;

                const movies = document.getElementById('movies');

                results.forEach(result => {
                    const poster_url = 'https://media.themoviedb.org/t/p/w220_and_h330_face' + result.poster_path;
                    const a = document.createElement('a');
                    const img = document.createElement('img');

                    a.href = `detail.html?movieId=${result.id}`;
                    img.src = poster_url;

                    a.appendChild(img);
                    movies.appendChild(a);
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
}

getMovies(1, '28', 'popularity.desc');

// 정렬 선택
const handleSortSelect = (select) => {
    const movies = document.getElementById('movies');
    const btns = document.querySelectorAll('#genreBtns button');

    for (let btn of btns) {
        if (btn.classList.contains('selected')) {
            id = btn.id;
        }
    }

    movies.innerHTML = '';

    if (select.value === 'popularity.desc') {
        getMovies(1, id, select.value);
    } else {
        getMovies(1, id, select.value, 500);
    }

}

// 무한 스크롤
window.addEventListener('scroll', function () {
    // 스크롤 위치
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    // 화면 높이
    var windowHeight = window.innerHeight;
    // 현재 웹사이트 전체 높이
    var documentHeight = document.body.clientHeight;
    var scrollTrigger = 0.99; // 화면이 99% 아래에 도달했을 때
    let id;

    const genreBtns = document.querySelectorAll('#genreBtns button');
    for (let btn of genreBtns) {
        if (btn.classList.contains('selected')) {
            id = btn.id;
        }
    }

    if ((scrollPosition + windowHeight) >= (documentHeight * scrollTrigger)) {
        // 스크롤 트리거 지점에 도달했을 때 새로운 콘텐츠를 로드하는 함수 호출
        console.log('화면 끝 도달');
        getMovies(++page, id);
    }
});