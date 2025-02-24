import { useState } from "react";
import Link from "next/link";

interface CardProps {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
}

export function Card({ id, title, release_date, vote_average, poster_path }: CardProps) {
    const [isFavorite, setIsFavorite] = useState(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            const favorites = JSON.parse(storedFavorites);
            return favorites.some((fav: any) => fav.id === id);
        }
        return false;
    });

    return (
        <Link href={`/movie/${id}`} className="group">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
                <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                    className="w-full h-80 object-cover cursor-pointer"
                />
                <div className="p-4">
                    <h2 className="text-lg font-bold truncate">{title}</h2>
                    <p className="text-gray-400">{release_date}</p>
                    <p className="text-yellow-400">❤️ {vote_average.toFixed(1)}</p>
                </div>
                <div className="p-4">
                    <button
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
