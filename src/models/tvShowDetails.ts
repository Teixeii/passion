// src/models/tvShowDetails.ts
export interface TvShowDetails {
    name: string;
    overview: string;
    poster_path?: string;
    first_air_date?: string;
    genres?: { id: number; name: string }[];
    number_of_seasons?: number;
    number_of_episodes?: number;
}
