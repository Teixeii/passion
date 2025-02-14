// FilmButton.tsx
"use client"; // Assurez-vous que ce composant est côté client

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  // Utilisez useRouter de next/navigation

export function FilmButton() {
    const [mounted, setMounted] = useState(false);  // Variable pour vérifier si on est côté client
    const router = useRouter();

    useEffect(() => {
        setMounted(true);  // Le composant est monté
    }, []);

    // Ne pas afficher le composant tant qu'il n'est pas monté côté client
    if (!mounted) return null;

    const handleClick = () => {
        // Redirige vers la page d'accueil (app/page.tsx)
        router.push('/');  // Le chemin vers app/page.tsx (page d'accueil)
    };
  return (
    <button 
      onClick={handleClick} 
      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-xl transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center gap-2"
    >
      Voir les films
    </button>
  );
}
