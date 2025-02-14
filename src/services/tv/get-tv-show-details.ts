// src/services/tv/get-tv-show-details.ts
import axios from 'axios';

const getTvShowDetails = async (id: string) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des détails de la série", error);
        throw new Error("Erreur lors de la récupération des données");
    }
};

export default getTvShowDetails;
