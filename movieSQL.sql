CREATE TABLE `movie_js`.`movie` (
	title VARCHAR(255),
    overview TEXT,
    poster VARCHAR(255),
    vote_average FLOAT,
    popularity FLOAT,
    release_date DATE,
    genre_ids JSON
);