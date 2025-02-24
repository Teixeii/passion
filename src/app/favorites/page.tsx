"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SerieCard } from "../../components/Serie-Card";

export default function Favorites() {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [seriesFavorites, setSeriesFavorites] = useState<any[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }

        const storedSeriesFavorites = localStorage.getItem("seriesFavorites");
        if (storedSeriesFavorites) {
            setSeriesFavorites(JSON.parse(storedSeriesFavorites));
        }
    }, []);

    const removeFromFavorites = (movie: any) => {
        const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const removeSeriesFromFavorites = (serie: any) => {
        const updatedSeriesFavorites = seriesFavorites.filter((fav) => fav.id !== serie.id);
        setSeriesFavorites(updatedSeriesFavorites);
        localStorage.setItem("seriesFavorites", JSON.stringify(updatedSeriesFavorites));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="flex justify-between items-center bg-gray-800 p-6 shadow-md">
                <h1 className="text-3xl font-bold text-white">🎬 CinéFlix</h1>
                <Link href="/" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold">
                    ⬅️ Retour à l'accueil
                </Link>
            </header>

            <main className="p-6">
                <h2 className="text-4xl font-extrabold text-center mb-8">🎥 Mes films Favoris</h2>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favorites.map((movie) => (
                            <div key={movie.id} className="group">
                                <Link href={`/movie/${movie.id}`} className="block">
                                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="w-full h-80 object-cover"
                                        />
                                        <div className="p-4">
                                            <h2 className="text-lg font-bold">{movie.title}</h2>
                                            <p className="text-gray-400">{movie.release_date}</p>
                                            <p className="text-yellow-400">❤️ {movie.vote_average.toFixed(1)}</p>
                                        </div>
                                    </div>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFromFavorites(movie);
                                    }}
                                    className="block text-center mt-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold w-full"
                                >
                                    ❌ Retirer des favoris
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 text-xl mt-10">Aucun film en favoris 😢</p>
                )}

                <h2 className="text-4xl font-extrabold text-center mb-8 mt-12">📺 Mes Séries Favorites</h2>

                {seriesFavorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {seriesFavorites.map((serie) => (
                            <SerieCard
                                key={serie.id}
                                serie={serie}
                                onClick={() => {}}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 text-xl mt-10">Aucune série en favoris 😢</p>
                )}
            </main>
        </div>
    );
}
