// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Import de Link pour la navigation sans rechargement de page.
import Menu from "@/components/Menu";
import { SerieCard } from "@/components/Serie-Card"; // Réutilisation du composant MovieCard.

export default function Series() {
    // États pour gérer les séries, les séries filtrées, la requête de recherche, les filtres et la série sélectionnée
    const [series, setSeries] = useState<any[]>([]); // Liste des séries récupérées de l'API.
    const [filteredSeries, setFilteredSeries] = useState<any[]>([]); // Liste des séries après les filtres ou recherche.
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        genre: "", // Filtre genre.
        year: "", // Filtre année de sortie.
        rating: "", // Filtre note minimale.
        language: "", // Filtre langue.
    });
    const [selectedSeries, setSelectedSeries] = useState<any | null>(null); // Stocke la série sélectionnée.
    const [currentLanguage, setCurrentLanguage] = useState("fr"); // État pour gérer la langue actuelle

    // Fonction pour récupérer les séries depuis l'API en fonction des filtres
    const fetchSeries = async (filters: { genre: string; year: string; rating: string; language: string }) => {
        const baseUrl = "https://api.themoviedb.org/3/discover/tv"; // URL de l'API pour récupérer les séries.
        const params = new URLSearchParams({
            language: filters.language || currentLanguage, // Langue des séries
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
        console.log("Series fetched from API:", data.results); // Log des séries récupérées.
        setSeries(data.results); // Mise à jour de l'état des séries.
        setFilteredSeries(data.results); // Initialisation des séries filtrées avec les résultats de l'API.
    };

    // Fonction pour gérer la recherche
    const handleSearch = (query: string) => {
        setSearchQuery(query); // Mise à jour de l'état de la recherche.
        filterSeries(query); // Filtrage des séries en fonction de la recherche.
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
        fetchSeries({
            genre: "",
            year: "",
            rating: "",
            language: "",
        }); // Récupération des séries sans filtres.
    };

    // Fonction pour gérer le changement de filtres
    const handleFilterChange = (filterType: string, value: string) => {
        setFilters((prev) => {
            const updatedFilters = { ...prev, [filterType]: value }; // Mise à jour du filtre modifié.
            fetchSeries(updatedFilters); // Récupération des séries avec les nouveaux filtres.
            return updatedFilters;
        });
    };

    // Fonction pour filtrer les séries en fonction de la requête de recherche
    const filterSeries = (query: string) => {
        let filtered = series;

        if (query) {
            filtered = filtered.filter((series) =>
                series.name.toLowerCase().includes(query.toLowerCase()) // Recherche par nom de série
            );
        }

        console.log("Filtered series:", filtered); // Log des séries filtrées.
        setFilteredSeries(filtered); // Mise à jour de l'état des séries filtrées.
    };

    // Fonction pour gérer le changement de langue
    const handleLanguageChange = (lang: string) => {
        setCurrentLanguage(lang);
        fetchSeries({ ...filters, language: lang }); // Récupérer les séries dans la nouvelle langue
    };

    // Récupérer les séries au chargement initial du composant
    useEffect(() => {
        fetchSeries(filters);
    }, []); // Exécution une seule fois au montage du composant.

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <Menu
                onSearch={handleSearch} // Fonction appelée lors d'une recherche.
                onResetFilters={handleResetFilters} // Fonction appelée pour réinitialiser les filtres.
                onFilterChange={handleFilterChange} // Fonction appelée lors d'un changement de filtre.
                filters={filters} // Passage des filtres actuels au composant Menu.
                onChangeLanguage={handleLanguageChange} // Fonction appelée lors d'un changement de langue.
            />
            <main className="ml-64 p-6 w-full">
                <h1 className="text-4xl font-extrabold text-center mb-8">Séries Populaires</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredSeries.map((serie) => (
                        <Link key={serie.id} href={`/series/${serie.id}`} className="block">
                            <SerieCard serie={serie} onClick={() => setSelectedSeries(serie)} />
                            {/* Affichage des cartes de séries et mise à jour de la série sélectionnée */}
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
