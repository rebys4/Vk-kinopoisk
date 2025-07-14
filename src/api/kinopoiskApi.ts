import axios from "axios";

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;
const API_URL = import.meta.env.VITE_KINOPOISK_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
    },
})

export interface Movie {
    id: number | string;
    name: string;
    year?: number;
    rating?: { kp?: number };
    poster?: { url?: string }
    genres?: { name: string }[];
    description?: string;
    [key: string]: string | number | boolean | object | undefined;
}

export async function fetchMovies(params: {
    page?: number;
    limit?: number;
    genres?: string[];
    rating?: [number, number];
    year?: [number, number];
  }) {
    const query: Record<string, string | number | string[] | undefined> = {
      page: params.page ?? 1,
      limit: params.limit ?? 50,
      year: params.year ? `${params.year[0]}-${params.year[1]}` : undefined,
      "rating.kp": params.rating ? `${params.rating[0]}-${params.rating[1]}` : undefined,
      "genres.name": params.genres && params.genres.length > 0 ? params.genres : undefined,
    };
    Object.keys(query).forEach((k) => query[k] === undefined && delete query[k]);
  
    // Вот здесь — запрос именно на фильмы
    const response = await api.get<{
      docs: Movie[];
      total: number;
    }>("/v1.4/movie", { params: query });
  
    return response.data;  
    // будет { docs: Movie[], total: number, page, pages… }
  }

export interface GenreApiItem {
    name: string;
    slug: string;
}

export async function fetchGenres(): Promise<GenreApiItem[]> {
    const response = await api.get<GenreApiItem[]>(
        "/v1.4/movie/possible-values-by-field",
        { params: { field: "genres.name" } }
    );
    
    return response.data;
  }

export async function fetchMovieById(id: string | number) {
    const response = await api.get(`/v1.4/movie/${id}`);

    return response.data;
}