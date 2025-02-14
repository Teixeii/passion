// SeriesButton.tsx
"use client";  // Assurez-vous que ce composant est exécuté côté client

import { useRouter } from 'next/navigation';  // Importer useRouter de next/navigation

export function SeriesButton() {
  const router = useRouter();

  const handleClick = () => {
    // Rediriger vers la page des séries
    router.push('/series');  // Correction du chemin pour correspondre à la structure du dossier
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-xl transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center gap-2"
    >
      Voir les séries
    </button>
  );
}
