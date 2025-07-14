import { makeAutoObservable, runInAction } from "mobx";
import { fetchGenres, fetchMovies, type Movie } from "../api/kinopoiskApi";

export interface Genre {
    name: string;
    slug?: string; // slug может быть не нужен, если не используется
}

export interface Filters {
    genres?: string[];
    rating?: [number, number];
    year?: [number, number];
}

class FilmStore {
    movies: Movie[] = [];
    total: number = 0;
    page: number = 1;
    limit: number = 50;
    loading: boolean = false;
    error: string | null = null;

    filters: Filters = {
        genres: [],
        rating: [0, 10],
        year: [1900, new Date().getFullYear()],
    };

    allGenres: Genre[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setFilters(Filters: Partial<Filters>) {
        this.filters = { ...this.filters, ...Filters };
        this.page = 1;
        this.movies = [];
        this.loadMovies();
    }

    async loadMovies() {
        this.loading = true;
        try {
            const { docs, total } = await fetchMovies({
                page: this.page,
                limit: this.limit,
                genres: this.filters.genres,
                rating: this.filters.rating,
                year: this.filters.year,
            });
            runInAction(() => {
                this.movies = this.page === 1 ? docs : [...this.movies, ...docs];
                this.total = total;
                this.loading = false;
            });
        } catch {
            runInAction(() => {
                this.error = "Ошибка при загрузке фильмов";
                this.loading = false;
            });
        }
    }

    async loadGenres() {
        try {
            const values = await fetchGenres();
            runInAction(() => {
                this.allGenres = values.map(item => ({ name: item.name }));
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : "Произошла ошибка при загрузке жанров";
            });
        }
    }

    setPage(page: number) {
        this.page = page;
        this.loadMovies();
    }

    loadMore() {
        if (this.movies.length < this.total && !this.loading) {
            this.page += 1;
            this.loadMovies();
        }
    }

    reset() {
        this.page = 1;
        this.movies = [];
        this.loadMovies();
    }
}

export const filmStore = new FilmStore();