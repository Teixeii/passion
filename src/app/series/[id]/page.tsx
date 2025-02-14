"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CommentSection from "@/components/CommentSection"; // Ajustez le chemin selon votre structure de fichiers
import RatingSection from "@/components/RatingSection"; // Ajustez le chemin selon votre structure de fichiers
import { Header } from "@/components/HeaderId"; // Ajustez le chemin selon votre structure de fichiers
import BackButton from "@/components/BackButton"; // Ajustez le chemin selon votre structure de fichiers

interface Comment {
    text: string;
    timestamp: string;
}

export default function SeriesDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [series, setSeries] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<Comment[]>([]);
    const [userRating, setUserRating] = useState<number | null>(null);
    const [isConfirmingRating, setIsConfirmingRating] = useState(false);
    const [ratingToConfirm, setRatingToConfirm] = useState<number | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchSeriesDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/tv/${id}?language=fr-FR`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                        }
                    }
                );
                if (!response.ok) throw new Error("Erreur lors de la récupération de la série");

                const data = await response.json();
                setSeries(data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur :", error);
                setLoading(false);
            }
        };

        fetchSeriesDetails();

        // Récupérer la note enregistrée localement
        const savedRating = localStorage.getItem(`series-rating-${id}`);
        if (savedRating) {
            setUserRating(Number(savedRating));
        }
    }, [id]);

    const handleAddComment = (comment: Comment) => {
        const updatedComments = [...comments, comment];
        setComments(updatedComments);
    };

    const handleAddRating = (rating: number) => {
        setRatingToConfirm(rating);
        setIsConfirmingRating(true); // Affiche le formulaire de confirmation
    };

    const handleConfirmRating = (rating: number) => {
        setUserRating(rating);
        localStorage.setItem(`series-rating-${id}`, rating.toString());
        setIsConfirmingRating(false); // Cache le formulaire de confirmation
    };

    const handleCancelRating = () => {
        setIsConfirmingRating(false); // Cache le formulaire de confirmation
        setRatingToConfirm(null); // Réinitialise la note temporaire
    };

    if (loading) return <div className="text-center text-2xl font-bold text-white mt-20">Chargement...</div>;
    if (!series) return <div className="text-center text-red-500 text-xl">Série non trouvée.</div>;

    return (
        <div
            className="min-h-screen bg-cover bg-center text-white relative"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-70" />
            <Header /> {/* Utilisation du composant Header */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen p-12 mt-24">
                <div className="md:w-1/3 flex justify-center">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                        alt={series.name}
                        className="rounded-lg shadow-xl w-[350px] h-auto transition-transform transform hover:scale-110"
                    />
                </div>

                <div className="md:w-2/3 bg-black bg-opacity-60 p-8 rounded-lg ml-6 max-h-screen overflow-auto">
                    <h1 className="text-5xl font-extrabold text-yellow-400">{series.name}</h1>
                    <p className="text-gray-300 italic text-2xl mt-2">{series.tagline}</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-xl mt-6">
                        <p>📅 <strong>Première diffusion :</strong> {series.first_air_date}</p>
                        <p>🎭 <strong>Genres :</strong> {series.genres.map((g: any) => g.name).join(", ")}</p>
                        <p>📺 <strong>Nombre de saisons :</strong> {series.number_of_seasons}</p>
                        <p>🎬 <strong>Nombre d'épisodes :</strong> {series.number_of_episodes}</p>
                    </div>

                    <p className="mt-6 text-gray-200 text-lg leading-relaxed">{series.overview}</p>

                    {/* Utilisation du composant BackButton */}
                    <BackButton label="⬅ Retour à la page précédente" />

                    {/* Utilisation du composant RatingSection */}
                    <RatingSection
                        userRating={userRating}
                        isConfirmingRating={isConfirmingRating}
                        ratingToConfirm={ratingToConfirm}
                        onAddRating={handleAddRating}
                        onConfirmRating={handleConfirmRating}
                        onCancelRating={handleCancelRating}
                    />

                    {/* Utilisation du composant CommentSection */}
                    <CommentSection comments={comments} onAddComment={handleAddComment} />
                </div>
            </div>
        </div>
    );
}
