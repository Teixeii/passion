// src/components/Menu.tsx
"use client";

import React from "react";
import { GenreFilter } from "./GenreFilter";
import { YearFilter } from "./YearFilter";
import { RatingFilter } from "./RatingFilter";
import { LanguageFilter } from "./LanguageFilter";
import { SearchBar } from "./SearchBar";
import { ResetFiltersButton } from "./ResetFiltersButton";
import { FavoritesLink } from "./FavoritesLink";
import { Header } from "./header";
import { NavigationButton } from "./button/navigation-button";

interface MenuProps {
    onSearch: (query: string) => void;
    onResetFilters: () => void;
    onFilterChange: (filterType: string, value: string) => void;
    filters: {
        genre: string;
        year: string;
        rating: string;
        language: string;
    };
    onChangeLanguage: (lang: string) => void; // Ajoutez cette ligne
}

const Menu: React.FC<MenuProps> = ({
                                       onSearch,
                                       onResetFilters,
                                       onFilterChange,
                                       filters,
                                       onChangeLanguage,
                                   }) => {
    return (
        <aside className="w-64 bg-gray-800 p-6 space-y-4 fixed h-full shadow-lg rounded-r-lg hidden md:block">
            <Header />
            <SearchBar onSearch={onSearch} />
            <GenreFilter onFilterChange={onFilterChange} selectedGenre={filters.genre} />
            <YearFilter onFilterChange={onFilterChange} selectedYear={filters.year} />
            <RatingFilter onFilterChange={onFilterChange} selectedRating={filters.rating} />
            <LanguageFilter onFilterChange={onChangeLanguage} selectedLanguage={filters.language} />
            <ResetFiltersButton onResetFilters={onResetFilters} />
            <FavoritesLink />
            <div className="space-y-4">
                <NavigationButton label="Films" route="/" />
                <NavigationButton label="Séries" route="/series" />
            </div>
        </aside>
    );
};

export default Menu;