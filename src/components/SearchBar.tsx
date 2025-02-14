import { useState, useEffect } from "react";

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [searchQuery, setSearchQuery] = useState(""); // État pour stocker la saisie de l'utilisateur
    const [suggestions, setSuggestions] = useState<any[]>([]); // État pour stocker les suggestions
    const [loading, setLoading] = useState(false); // État pour afficher un état de chargement

    const handleSearchQueryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query); // Mettre à jour la saisie de l'utilisateur

        if (query.length >= 3) {
            setLoading(true); // Activer le chargement
            try {
                const movieResponse = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}&language=fr-FR`
                );
                const tvResponse = await fetch(
                    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}&language=fr-FR`
                );

                const movieData = await movieResponse.json();
                const tvData = await tvResponse.json();

                const combinedSuggestions = [...movieData.results, ...tvData.results];
                setSuggestions(combinedSuggestions); // Mettre à jour les suggestions
            } catch (error) {
                console.error("Erreur lors de la récupération des suggestions:", error);
            } finally {
                setLoading(false); // Désactiver le chargement après la réponse
            }
        } else {
            setSuggestions([]); // Si la saisie est trop courte, on vide les suggestions
        }

        onSearch(query); // Appeler onSearch en temps réel pour filtrer les films
    };

    const handleSelectSuggestion = (suggestion: any) => {
        const title = suggestion.title || suggestion.name; // Utiliser le titre ou le nom selon le type
        setSearchQuery(title); // Mettre le titre de la suggestion dans le champ de recherche
        setSuggestions([]); // Vider les suggestions
        onSearch(title); // Lancer la recherche avec le titre sélectionné
    };

    return (
        <div className="w-full mb-4 relative">
            <input
                type="text"
                placeholder="Rechercher un film ou une série..."
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearchQueryChange} // Appeler cette fonction lors de chaque saisie
            />

            {loading && <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white">Chargement...</div>}

            {suggestions.length > 0 && (
                <ul className="absolute left-0 w-full bg-gray-800 text-white mt-2 rounded-lg shadow-md z-10">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            className="p-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleSelectSuggestion(suggestion)} // Sélectionner une suggestion
                        >
                            {suggestion.title || suggestion.name} {/* Afficher le titre ou le nom de la suggestion */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
