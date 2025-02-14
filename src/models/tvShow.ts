// src/models/tvShow.ts
export default interface TvShow {
    id: number;
    name: string;
    first_air_date: string;
    genre_ids: number[];
    overview: string;  // Ajout du résumé
    poster_path: string;  // Ajout du chemin de l'image
}
