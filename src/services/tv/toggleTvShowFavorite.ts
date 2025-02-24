import TvShow from "@/models/tvShow";

export function toggleTvShowFavorite(serie: TvShow) {

        let updatedFavorites: any[] = [];
        const storedFavorites = localStorage.getItem("favorites");

        if (storedFavorites) {
            updatedFavorites = JSON.parse(storedFavorites);
        }

        if (updatedFavorites.find((fav: any) => fav.id === serie.id)) {
            updatedFavorites = updatedFavorites.filter((fav: any) => fav.id !== serie.id);
        } else {
            if (!updatedFavorites.some((fav: any) => fav.id === serie.id)) {
                updatedFavorites.push(serie);
            }
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}