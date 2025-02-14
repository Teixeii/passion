import React, { useState } from "react";

interface Comment {
    text: string;
    timestamp: string;
}

interface CommentSectionProps {
    comments: Comment[];
    onAddComment: (comment: Comment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
    const [newComment, setNewComment] = useState("");
    const [isConfirming, setIsConfirming] = useState(false);
    const [commentToConfirm, setCommentToConfirm] = useState("");
    const [sortOrder, setSortOrder] = useState("desc"); // "desc" pour trier du plus récent au plus ancien

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            setCommentToConfirm(newComment);
            setIsConfirming(true); // Affiche le formulaire de confirmation
        }
    };

    const handleConfirmComment = () => {
        const timestamp = new Date().toLocaleString(); // Ajoute la date et l'heure actuelles
        onAddComment({ text: commentToConfirm, timestamp });
        setNewComment("");
        setIsConfirming(false); // Cache le formulaire de confirmation
        setCommentToConfirm(""); // Réinitialise le commentaire temporaire
    };

    const handleCancelComment = () => {
        setIsConfirming(false); // Cache le formulaire de confirmation
        setCommentToConfirm(""); // Réinitialise le commentaire temporaire
    };

    const handleSortOrderChange = () => {
        setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
    };

    const sortedComments = [...comments].sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return sortOrder === "desc" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold text-yellow-400">Ajouter un commentaire</h2>
            <form onSubmit={handleAddComment} className="mt-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Votre commentaire ici..."
                    rows={2}
                    className="w-full p-4 mt-2 bg-gray-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                >
                    Ajouter le commentaire
                </button>
            </form>

            {isConfirming && (
                <div className="mt-4">
                    <p className="text-white">Êtes-vous sûr de vouloir ajouter ce commentaire ?</p>
                    <div className="flex space-x-4 mt-2">
                        <button
                            onClick={handleConfirmComment}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg"
                        >
                            Confirmer
                        </button>
                        <button
                            onClick={handleCancelComment}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-4 flex items-center">
                <label className="text-white mr-2">Trier par :</label>
                <select
                    value={sortOrder}
                    onChange={handleSortOrderChange}
                    className="bg-gray-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="desc">Plus récent</option>
                    <option value="asc">Plus ancien</option>
                </select>
            </div>

            <div className="mt-4">
                {sortedComments.map((comment, index) => (
                    <div key={index} className="bg-gray-800 p-2 rounded-lg mt-2">
                        <p>{comment.text}</p>
                        <p className="text-gray-500 text-sm mt-1">{comment.timestamp}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
