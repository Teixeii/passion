import { useState, useEffect } from "react"; 

export function LanguageFilter({ 
    onFilterChange, // Fonction pour mettre à jour le filtre dans le composant parent.
    selectedLanguage // Langue actuellement sélectionnée.
}: { 
    onFilterChange: (filterType: string, value: string) => void; // Type de la fonction de filtrage.
    selectedLanguage: string; // Type de la langue sélectionnée.
}) {
    // État local pour stocker la liste des langues disponibles.
    const [languages, setLanguages] = useState<{ iso_639_1: string; name: string }[]>([]);

    // useEffect pour récupérer la liste des langues utilisées dans les films populaires au chargement du composant.
    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                // Requête pour récupérer les films 
                const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=fr-FR", {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, // Utilisation de la clé API 
                    },
                });
                const data = await response.json();

                // Extraction des langues originales 
                const uniqueLanguages = [...new Set(data.results.map((movie: any) => movie.original_language))];

                // Requête pour récupérer la liste complète des langues 
                const languageNamesResponse = await fetch("https://api.themoviedb.org/3/configuration/languages", {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                    },
                });
                const languageNamesData = await languageNamesResponse.json();

                // Filtrer les langues pour ne garder que celles utilisées dans les films populaires.
                const filteredLanguages = languageNamesData.filter((lang: any) =>
                    uniqueLanguages.includes(lang.iso_639_1) // Vérifie si la langue est présente dans les films populaires.
                );

                setLanguages(filteredLanguages); // Mise à jour de l'état avec les langues filtrées.
            } catch (error) {
                console.error("Erreur lors de la récupération des langues:", error); // Gestion des erreurs en cas d'échec de la requête.
            }
        };

        fetchLanguages(); // Appel de la fonction au montage du composant.
    }, []);

    return (
        // Sélecteur permettant de choisir une langue pour filtrer les films.
        <select
            className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md w-full"
            value={selectedLanguage} // Définir la valeur sélectionnée.
            onChange={(e) => onFilterChange("language", e.target.value)} // Appeler la fonction de filtrage avec la langue choisie.
        >
            <option value="">Toutes les langues</option> {}
            {languages.map((lang) => (
                <option key={lang.iso_639_1} value={lang.iso_639_1}>
                    {lang.name} {}
                </option>
            ))}
        </select>
    );
}
