import { useState } from "react";

export function MovieCard({ movie, onClick }: { movie: any; onClick: () => void }) {
    const [isFavorite, setIsFavorite] = useState(() => {
        // Vérifier si le film est déjà dans les favoris (localStorage)
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            const favorites = JSON.parse(storedFavorites);
            return favorites.some((fav: any) => fav.id === movie.id); // Vérifier si le film est déjà présent
        }
        return false;
    });

    const toggleFavorite = (e: React.MouseEvent) => {
        // Empêcher la propagation de l'événement sur le bouton pour ne pas rediriger vers les détails
        e.stopPropagation();

        let updatedFavorites: any[] = [];
        const storedFavorites = localStorage.getItem("favorites");

        if (storedFavorites) {
            updatedFavorites = JSON.parse(storedFavorites);
        }

        // Si le film est déjà un favori, on le retire de la liste
        if (isFavorite) {
            updatedFavorites = updatedFavorites.filter((fav: any) => fav.id !== movie.id);
        } else {
            // Ajouter le film aux favoris uniquement s'il n'est pas déjà présent
            if (!updatedFavorites.some((fav: any) => fav.id === movie.id)) {
                updatedFavorites.push(movie);
            }
        }

        // Sauvegarder les favoris dans le localStorage
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="group" onClick={onClick}>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-80 object-cover cursor-pointer"
                />
                <div className="p-4">
                    <h2 className="text-lg font-bold">{movie.title}</h2>
                    <p className="text-gray-400">{movie.release_date}</p>
                    <p className="text-yellow-400">❤️ {movie.vote_average.toFixed(1)}</p>
                </div>
            </div>
            {/* Le bouton "Mettre en favoris" est maintenant en dehors du bloc principal */}
            <div className="p-4">
                <button
                    onClick={toggleFavorite} // Ajout ou suppression des favoris
                    className={`mt-2 py-2 px-4 rounded-lg ${
                        isFavorite ? "bg-red-600" : "bg-yellow-500"
                    } text-white w-full`}
                >
                    {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                </button>
            </div>
        </div>
    );
}
