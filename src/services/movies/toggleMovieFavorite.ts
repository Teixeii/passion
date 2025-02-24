import Movie from "@/models/movie";

export function ToggleMovieFavorite(movie: Movie) {

        let updatedFavorites: any[] = [];
        const storedFavorites = localStorage.getItem("favorites");

        if (storedFavorites) {
            updatedFavorites = JSON.parse(storedFavorites);
        }

        if (updatedFavorites.find((fav: any) => fav.id === movie.id)) {
            updatedFavorites = updatedFavorites.filter((fav: any) => fav.id !== movie.id);
        } else {
            if (!updatedFavorites.some((fav: any) => fav.id === movie.id)) {
                updatedFavorites.push(movie);
            }
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}