// src/services/movies/get-movie-details.ts
import axios from 'axios';

const getMovieDetails = async (id: string) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du film", error);
        throw new Error("Erreur lors de la récupération des données");
    }
};

export default getMovieDetails;
