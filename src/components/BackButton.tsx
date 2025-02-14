import React from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
    label: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label }) => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
            {label}
        </button>
    );
};

export default BackButton;
