const title = location.search.split('=')[1];

let page = 1;

// 페이지 별 영화 목록 가져오기
function getMovies(page) {
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=ko-KR&page=${page}`, {
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

getMovies(page);

// 무한 스크롤
window.addEventListener('scroll', function () {
    // 스크롤 위치
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    // 화면 높이
    var windowHeight = window.innerHeight;
    // 현재 웹사이트 전체 높이
    var documentHeight = document.body.clientHeight;
    var scrollTrigger = 0.99; // 화면이 99% 아래에 도달했을 때

    if ((scrollPosition + windowHeight) >= (documentHeight * scrollTrigger)) {
        console.log('화면 끝 도달');
        // 스크롤 트리거 지점에 도달했을 때 새로운 콘텐츠를 로드하는 함수 호출
        getMovies(++page);
    }
});