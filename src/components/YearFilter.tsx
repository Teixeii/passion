import { useState, useEffect } from "react";

export function YearFilter({ onFilterChange, selectedYear }: { onFilterChange: (filterType: string, value: string) => void; selectedYear: string }) {
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        const fetchYears = async () => {
            try {
                const allYears = new Set<number>();
                const fetchPages = async (url: string, pageCount: number) => {
                    for (let page = 1; page <= pageCount; page++) {
                        const response = await fetch(`${url}&page=${page}`, {
                            headers: {
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                            },
                        });
                        const data = await response.json();
                        data.results.forEach((item: any) => {
                            const year = item.release_date ? new Date(item.release_date).getFullYear() : item.first_air_date ? new Date(item.first_air_date).getFullYear() : null;
                            if (year) {
                                allYears.add(year);
                            }
                        });
                    }
                };

                await fetchPages("https://api.themoviedb.org/3/discover/movie?language=fr-FR&sort_by=popularity.desc", 5);
                await fetchPages("https://api.themoviedb.org/3/discover/tv?language=fr-FR&sort_by=popularity.desc", 5);

                setYears(Array.from(allYears).sort((a, b) => b - a)); // Trier les années dans l'ordre décroissant
            } catch (error) {
                console.error("Erreur lors de la récupération des années:", error);
            }
        };

        fetchYears();
    }, []);

    return (
        <select
            className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md w-full"
            value={selectedYear}
            onChange={(e) => onFilterChange("year", e.target.value)}
        >
            <option value="">Toutes les années</option>
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
}
