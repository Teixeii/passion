// app/series/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Menu from "@/components/Menu";
import { SerieCard } from "@/components/Serie-Card";

export default function Series() {
    const [series, setSeries] = useState<any[]>([]);
    const [filteredSeries, setFilteredSeries] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        genre: "",
        year: "",
        rating: "",
        language: "",
    });
    const [selectedSeries, setSelectedSeries] = useState<any | null>(null);

    const fetchSeries = async (filters: { genre: string; year: string; rating: string; language: string }) => {
        const baseUrl = "https://api.themoviedb.org/3/discover/tv";
        const params = new URLSearchParams({
            language: filters.language || "fr-FR",
            sort_by: "popularity.desc",
            with_genres: filters.genre,
            primary_release_year: filters.year,
            "vote_average.gte": filters.rating,
            "with_original_language": filters.language,
        });

        console.log("Params sent to API:", params.toString());

        const response = await fetch(`${baseUrl}?${params}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            },
        });
        const data = await response.json();
        console.log("Series fetched from API:", data.results);
        setSeries(data.results);
        setFilteredSeries(data.results);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        filterSeries(query);
    };

    const handleResetFilters = () => {
        setFilters({
            genre: "",
            year: "",
            rating: "",
            language: "",
        });
        setSearchQuery("");
        fetchSeries({
            genre: "",
            year: "",
            rating: "",
            language: "",
        });
    };

    const handleFilterChange = (filterType: string, value: string) => {
        setFilters((prev) => {
            const updatedFilters = { ...prev, [filterType]: value };
            fetchSeries(updatedFilters);
            return updatedFilters;
        });
    };

    const handleLanguageChange = (lang: string) => {
        setFilters((prev) => ({ ...prev, language: lang }));
        fetchSeries({ ...filters, language: lang });
    };

    const filterSeries = (query: string) => {
        let filtered = series;

        if (query) {
            filtered = filtered.filter((series) =>
                series.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        console.log("Filtered series:", filtered);
        setFilteredSeries(filtered);
    };

    useEffect(() => {
        fetchSeries(filters);
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <Menu
                onSearch={handleSearch}
                onResetFilters={handleResetFilters}
                onFilterChange={handleFilterChange}
                filters={filters}
                onChangeLanguage={handleLanguageChange} // This line is correct
            />
            <main className="ml-64 p-6 w-full">
                <h1 className="text-4xl font-extrabold text-center mb-8">Séries Populaires</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredSeries.map((serie) => (
                        <Link key={serie.id} href={`/series/${serie.id}`} className="block">
                            <SerieCard serie={serie} onClick={() => setSelectedSeries(serie)} />
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
