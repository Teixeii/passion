import Movie from "@/models/movie";

export default async function getMovies(): Promise<Movie[]> {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=title.asc`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        }
    });
    const data = await response.json();

    // Filtrer les films ayant un poster
    return data.results
        .filter((movie: any) => movie.poster_path) // Garder seulement ceux qui ont une affiche
        .map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            genre_ids: movie.genre_ids,
            overview: movie.overview,
            poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
}
