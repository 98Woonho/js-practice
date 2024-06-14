const movieId = location.search.split('=')[1];
const swiperWrapper = document.querySelector('.swiper-wrapper');

function getMovie() {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGQ2YjY5OGJkZjMyNDk0ZmU1NDYzOGU3ZmVmNjk4YiIsInN1YiI6IjY2NjY0YzIxNTlmMjE0ODE2OGExNTM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kwltZDxWbQYihnw7WWODdmwrkr8DpVUSZZRmYiITxAw',
            accept: 'application/json'
        }
    })
        .then(res => {
            const movie = res.data;
            const progress = document.getElementById('progress');
            const ratingContainer = document.getElementById('ratingContainer');
            const poster = document.getElementById('poster');
            const movieTitle = document.getElementById('movieTitle');
            const genres = document.getElementById('genres');
            const voteAverage = document.getElementById('voteAverage');
            const releaseDate = document.getElementById('releaseDate');
            const runtime = document.getElementById('runtime');
            const overview = document.getElementById('overview');

            progress.style.height = Math.round((ratingContainer.clientHeight * 0.705 * (movie.vote_average * 10) / 100)) + 'px';
            if (movie.vote_average < 3.3) {
                progress.style.backgroundColor = '#ff2e2e';
            } else if (movie.vote_average < 6.6) {
                progress.style.backgroundColor = '#d3b634';
            } else {
                progress.style.backgroundColor = '#4ec12b';
            }
            poster.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`;
            movieTitle.innerText = movie.title;
            genres.innerText = movie.genres.map(genre => genre.name).join(', ');
            voteAverage.innerText = `회원 평점 : ${Math.round(movie.vote_average * 10)}%`;
            releaseDate.innerText = movie.release_date + ' 개봉';
            runtime.innerText = movie.runtime + '분';
            overview.innerText = movie.overview;
        })
        .catch(err => {
            console.log(err);
        });
}

getMovie();

function getTrailer() {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGQ2YjY5OGJkZjMyNDk0ZmU1NDYzOGU3ZmVmNjk4YiIsInN1YiI6IjY2NjY0YzIxNTlmMjE0ODE2OGExNTM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kwltZDxWbQYihnw7WWODdmwrkr8DpVUSZZRmYiITxAw',
            accept: 'application/json'
        }
    })
        .then(res => {

            const trailerKey = res.data.results.filter(result => result.type === 'Trailer')[0].key;
            const trailer = document.getElementById('trailer');
            trailer.src = `https://www.youtube.com/embed/${trailerKey}`
        })
        .catch(err => {
            console.log(err);
        });
}

getTrailer();

function getImages() {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGQ2YjY5OGJkZjMyNDk0ZmU1NDYzOGU3ZmVmNjk4YiIsInN1YiI6IjY2NjY0YzIxNTlmMjE0ODE2OGExNTM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kwltZDxWbQYihnw7WWODdmwrkr8DpVUSZZRmYiITxAw',
            accept: 'application/json'
        }
    })
        .then(res => {
            for (backdrop of res.data.backdrops) {
                const div = document.createElement('div');
                const img = document.createElement('img');

                div.classList.add('swiper-slide');
                img.src = `https://image.tmdb.org/t/p/original${backdrop.file_path}`
                div.appendChild(img);
                swiperWrapper.appendChild(div);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

getImages();


// swiper 설정
const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    }
});