import { useState, useEffect } from "react"; 

export function GenreFilter({ 
    onFilterChange, // Fonction pour mettre à jour le filtre dans le composant parent
    selectedGenre // Genre actuellement sélectionné
}: { 
    onFilterChange: (filterType: string, value: string) => void; // Type de la fonction de filtrage
    selectedGenre: string; // Type du genre sélectionné
}) {
    // État local pour stocker la liste des genres disponibles
    const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);

    // useEffect pour récupérer la liste des genres au chargement du composant
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                // Requête pour récupérer la liste des genres de films 
                const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=fr-FR", {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, // Utilisation de la clé API stockée dans les variables d'environnement.
                    },
                });
                const data = await response.json();
                setGenres(data.genres); // Mise à jour de l'état avec la liste des genres récupérés
            } catch (error) {
                console.error("Erreur lors de la récupération des genres:", error); // Gestion des erreurs en cas d'échec de la requête
            }
        };

        fetchGenres(); // Appel de la fonction au montage du composant
    }, []);

    return (
        // Sélecteur permettant de choisir un genre pour filtrer les films
        <select
            className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md w-full"
            value={selectedGenre} // Définir la valeur sélectionnée.
            onChange={(e) => onFilterChange("genre", e.target.value)} // Appeler la fonction de filtrage avec le genre choisi
        >
            <option value="">Tous les genres</option> {}
            {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                    {genre.name} {}
                </option>
            ))}
        </select>
    );
}
