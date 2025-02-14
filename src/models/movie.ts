export default interface Movie {
    id: number;
    title: string;
    release_date: string;
    genre_ids: number[];
    overview: string;  // Ajout du résumé
    poster_path: string;  // Ajout du chemin de l'image
}
