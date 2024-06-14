let page = 1;

// swiper 설정
const mySwiper = new Swiper('#swiper', {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 15,
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },
});

// 인기 TOP 10 영화 목록 가져오기 {
function getTopTenMovies() {
    axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=ko-KR&page=1&sort_by=popularity.desc`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGQ2YjY5OGJkZjMyNDk0ZmU1NDYzOGU3ZmVmNjk4YiIsInN1YiI6IjY2NjY0YzIxNTlmMjE0ODE2OGExNTM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kwltZDxWbQYihnw7WWODdmwrkr8DpVUSZZRmYiITxAw',
            accept: 'application/json'
        }
    })
        .then(res => {
            const swiperWrapper = document.querySelector('.swiper-wrapper');
            const swiperSlides = swiperWrapper.querySelectorAll('.swiper-slide');
            results = res.data.results;

            for (let i = 0; i < 10; i++) {
                const poster_url = 'https://media.themoviedb.org/t/p/w220_and_h330_face' + results[i].poster_path;
                const img = document.createElement('img');
                const a = document.createElement('a');

                img.src = poster_url;
                a.href = `detail.html?movieId=${results[i].id}`;

                a.appendChild(img);
                swiperSlides[i].appendChild(a);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

getTopTenMovies()

// 페이지 별 영화 목록 가져오기
function getMovies(page) {
    axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=ko-KR&page=${page}&sort_by=popularity.desc`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGQ2YjY5OGJkZjMyNDk0ZmU1NDYzOGU3ZmVmNjk4YiIsInN1YiI6IjY2NjY0YzIxNTlmMjE0ODE2OGExNTM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kwltZDxWbQYihnw7WWODdmwrkr8DpVUSZZRmYiITxAw',
            accept: 'application/json'
        }
    })
        .then(res => {
            const movies = document.getElementById('movies');
            results = res.data.results;

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
    var scrollTrigger = 1; // 화면이 맨 끝에 도달했을 때

    if ((scrollPosition + windowHeight) >= (documentHeight * scrollTrigger)) {
        console.log('화면 끝 도달');
        // 스크롤 트리거 지점에 도달했을 때 새로운 콘텐츠를 로드하는 함수 호출
        getMovies(++page);
    }
});