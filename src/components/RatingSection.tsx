import React from "react";

interface RatingSectionProps {
    userRating: number | null;
    isConfirmingRating: boolean;
    ratingToConfirm: number | null;
    onAddRating: (rating: number) => void;
    onConfirmRating: (rating: number) => void;
    onCancelRating: () => void;
}

const RatingSection: React.FC<RatingSectionProps> = ({
    userRating,
    isConfirmingRating,
    ratingToConfirm,
    onAddRating,
    onConfirmRating,
    onCancelRating
}) => {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold text-yellow-400">Noter ce film :</h2>
            <div className="flex space-x-2 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => onAddRating(star)}
                        className="text-3xl transition-transform transform hover:scale-125"
                    >
                        {userRating && userRating >= star ? "❤️" : "🤍"}
                    </button>
                ))}
            </div>

            {isConfirmingRating && ratingToConfirm !== null && (
                <div className="mt-4">
                    <p className="text-white">Êtes-vous sûr de vouloir attribuer cette note ?</p>
                    <div className="flex space-x-4 mt-2">
                        <button
                            onClick={() => onConfirmRating(ratingToConfirm)}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg"
                        >
                            Confirmer
                        </button>
                        <button
                            onClick={onCancelRating}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            {userRating !== null && !isConfirmingRating && (
                <p className="mt-2 text-lg text-yellow-400 font-bold">✅ Vous avez noté : {userRating} / 5</p>
            )}
        </div>
    );
};

export default RatingSection;
