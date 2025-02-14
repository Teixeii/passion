import { useState } from "react";

export function RatingFilter({ onFilterChange, selectedRating }: { onFilterChange: (filterType: string, value: string) => void; selectedRating: string }) {
    return (
        <select
            className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md w-full"
            value={selectedRating}
            onChange={(e) => onFilterChange("rating", e.target.value)} // Appeler onFilterChange avec la note sélectionnée
        >
            <option value="0">Toutes les notes</option>
            <option value="5">5+ ❤️</option>
            <option value="6">6+ ❤️</option>
            <option value="7">7+ ❤️</option>
            <option value="8">8+ ❤️</option>
            <option value="9">9+ ❤️</option>
        </select>
    );
}
