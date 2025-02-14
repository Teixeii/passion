"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Menu from "@/components/Menu";
import { MovieCard } from "@/components/movie-card";

export default function Home() {
    const [movies, setMovies] = useState<any[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        genre: "",
        year: "",
        rating: "",
        language: "",
    });
    const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

    const fetchMovies = async (filters: { genre: string; year: string; rating: string; language: string }) => {
        const baseUrl = "https://api.themoviedb.org/3/discover/movie"; 
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
        console.log("Movies fetched from API:", data.results);
        setMovies(data.results);
        setFilteredMovies(data.results);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        filterMovies(query);
    };

    const handleResetFilters = () => {
        setFilters({
            genre: "",
            year: "",
            rating: "",
            language: "",
        });
        setSearchQuery("");
        fetchMovies({
            genre: "",
            year: "",
            rating: "",
            language: "",
        });
    };

    const handleFilterChange = (filterType: string, value: string) => {
        setFilters((prev) => {
            const updatedFilters = { ...prev, [filterType]: value };
            fetchMovies(updatedFilters);
            return updatedFilters;
        });
    };

    const filterMovies = (query: string) => {
        let filtered = movies;

        if (query) {
            filtered = filtered.filter((movie) =>
                movie.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        console.log("Filtered movies:", filtered);
        setFilteredMovies(filtered);
    };

    useEffect(() => {
        fetchMovies(filters);
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <Menu
                onSearch={handleSearch}
                onResetFilters={handleResetFilters}
                onFilterChange={handleFilterChange}
                filters={filters}
            />
            <main className="ml-64 p-6 w-full">
                <h1 className="text-4xl font-extrabold text-center mb-8">Films Populaires</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredMovies.map((movie) => (
                        <Link key={movie.id} href={`/movie/${movie.id}`} className="block">
                            <MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}