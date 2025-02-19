"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Import de Link pour la navigation sans rechargement de page.
import Menu from "@/components/Menu";
import { MovieCard } from "@/components/movie-card";

export default function Home() {
    // États pour gérer les films, les films filtrés, la requête de recherche, les filtres et le film sélectionné
    const [movies, setMovies] = useState<any[]>([]); // Liste des films récupérés de l'API.
    const [filteredMovies, setFilteredMovies] = useState<any[]>([]); // Liste des films après les filtres ou recherche.
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        genre: "", // Filtre genre.
        year: "", // Filtre année de sortie.
        rating: "", // Filtre note minimale.
        language: "", // Filtre langue.
    });
    const [selectedMovie, setSelectedMovie] = useState<any | null>(null); // Stocke le film sélectionné.

    // Fonction pour récupérer les films depuis l'API en fonction des filtres
    const fetchMovies = async (filters: { genre: string; year: string; rating: string; language: string }) => {
        const baseUrl = "https://api.themoviedb.org/3/discover/movie";
        const params = new URLSearchParams({
            language: filters.language || "fr-FR", // Langue des films
            sort_by: "popularity.desc", // Trier par popularité décroissante.
            with_genres: filters.genre, // Filtrage par genre.
            primary_release_year: filters.year, // Filtrage par année de sortie.
            "vote_average.gte": filters.rating, // Filtrage par note minimum.
            "with_original_language": filters.language, // Filtrage par langue originale.
        });

        console.log("Params sent to API:", params.toString()); // Log des paramètres envoyés à l'API.

        const response = await fetch(`${baseUrl}?${params}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, // Utilisation de la clé API
            },
        });
        const data = await response.json();
        console.log("Movies fetched from API:", data.results); // Log des films récupérés.
        setMovies(data.results); // Mise à jour de l'état des films.
        setFilteredMovies(data.results); // Initialisation des films filtrés avec les résultats de l'API.
    };

    // Fonction pour gérer la recherche
    const handleSearch = (query: string) => {
        setSearchQuery(query); // Mise à jour de l'état de la recherche.
        filterMovies(query); // Filtrage des films en fonction de la recherche.
    };

    // Fonction pour réinitialiser les filtres
    const handleResetFilters = () => {
        setFilters({
            genre: "",
            year: "",
            rating: "",
            language: "",
        }); // Réinitialisation des filtres.
        setSearchQuery(""); // Réinitialisation de la recherche.
        fetchMovies({
            genre: "",
            year: "",
            rating: "",
            language: "",
        }); // Récupération des films sans filtres.
    };

    // Fonction pour gérer le changement de filtres
    const handleFilterChange = (filterType: string, value: string) => {
        setFilters((prev) => {
            const updatedFilters = { ...prev, [filterType]: value }; // Mise à jour du filtre modifié.
            fetchMovies(updatedFilters); // Récupération des films avec les nouveaux filtres.
            return updatedFilters;
        });
    };

    // Fonction pour gérer le changement de langue
    const handleLanguageChange = (language: string) => {
        setFilters((prev) => ({ ...prev, language })); // Mise à jour de la langue dans les filtres.
        fetchMovies({ ...filters, language }); // Récupération des films avec la nouvelle langue.
    };

    // Fonction pour filtrer les films en fonction de la requête de recherche
    const filterMovies = (query: string) => {
        let filtered = movies;

        if (query) {
            filtered = filtered.filter((movie) =>
                movie.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        console.log("Filtered movies:", filtered); // Log des films filtrés.
        setFilteredMovies(filtered); // Mise à jour de l'état des films filtrés.
    };

    // Récupérer les films au chargement initial du composant
    useEffect(() => {
        fetchMovies(filters);
    }, []); // Exécution une seule fois au montage du composant.

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <Menu
                onSearch={handleSearch} // Fonction appelée lors d'une recherche.
                onResetFilters={handleResetFilters} // Fonction appelée pour réinitialiser les filtres.
                onFilterChange={handleFilterChange} // Fonction appelée lors d'un changement de filtre.
                onChangeLanguage={handleLanguageChange} // Fonction appelée lors d'un changement de langue.
                filters={filters} // Passage des filtres actuels au composant Menu.
            />
            <main className="ml-64 p-6 w-full">
                <h1 className="text-4xl font-extrabold text-center mb-8">Films Populaires</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredMovies.map((movie) => (
                        <Link key={movie.id} href={`/movie/${movie.id}`} className="block">
                            <MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
                            {/* Affichage des cartes de films et mise à jour du film sélectionné */}
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
