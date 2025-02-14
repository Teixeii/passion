// src/services/tv/get-tv-shows.ts
import TvShow from "@/models/tvShow";

export default async function getTvShows(): Promise<TvShow[]> {
    const response = await fetch(`https://api.themoviedb.org/3/tv/popular?language=fr-FR&page=1`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        }
    });
    const data = await response.json();

    // Filtrer les séries ayant un poster
    return data.results
        .filter((tvShow: any) => tvShow.poster_path) // Garder seulement ceux qui ont une affiche
        .map((tvShow: any) => ({
            id: tvShow.id,
            name: tvShow.name,
            first_air_date: tvShow.first_air_date,
            genre_ids: tvShow.genre_ids,
            overview: tvShow.overview,
            poster_path: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`,
        }));
}
