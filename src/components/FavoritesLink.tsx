import Link from "next/link"; 

export function FavoritesLink() {
    return (
        // Lien vers la page des favoris avec un style personnalisé.
        <Link
            href="/favorites" // Redirige l'utilisateur vers la page "/favorites".
            className="block text-center mt-6 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-semibold w-full"
        >
            ⭐ Voir mes Favoris {}
        </Link>
    );
}
