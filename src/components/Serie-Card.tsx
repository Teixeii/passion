import { useState } from "react";
import Link from "next/link";

export function SerieCard({ serie, onClick }: { serie: any; onClick: () => void }) {
    const [isFavorite, setIsFavorite] = useState(() => {
        const storedFavorites = localStorage.getItem("seriesFavorites");
        if (storedFavorites) {
            const favorites = JSON.parse(storedFavorites);
            return favorites.some((fav: any) => fav.id === serie.id);
        }
        return false;
    });

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        let updatedFavorites: any[] = [];
        const storedFavorites = localStorage.getItem("seriesFavorites");

        if (storedFavorites) {
            updatedFavorites = JSON.parse(storedFavorites);
        }

        if (isFavorite) {
            updatedFavorites = updatedFavorites.filter((fav: any) => fav.id !== serie.id);
        } else {
            if (!updatedFavorites.some((fav: any) => fav.id === serie.id)) {
                updatedFavorites.push(serie);
            }
        }

        localStorage.setItem("seriesFavorites", JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <Link href={`/series/${serie.id}`} className="group">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
                <img
                    src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                    alt={serie.name}
                    className="w-full h-80 object-cover cursor-pointer"
                />
                <div className="p-4">
                    <h2 className="text-lg font-bold">{serie.name}</h2>
                    <p className="text-gray-400">{serie.first_air_date}</p>
                    <p className="text-yellow-400">❤️ {serie.vote_average.toFixed(1)}</p>
                </div>
                <div className="p-4">
                    <button
                        onClick={toggleFavorite}
                        className={`mt-2 py-2 px-4 rounded-lg ${
                            isFavorite ? "bg-red-600" : "bg-yellow-500"
                        } text-white w-full`}
                    >
                        {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                    </button>
                </div>
            </div>
        </Link>
    );
}
