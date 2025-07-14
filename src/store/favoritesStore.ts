import { makeAutoObservable } from "mobx";

const STORAGE_KEY = "favoriteMovieIds";

export class FavoritesStore {
  ids: number[] = [];

  constructor() {
    makeAutoObservable(this);
    this.load();
  }

  load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        this.ids = JSON.parse(raw);
      } catch {}
    }
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids));
  }

  add(id: number) {
    if (!this.ids.includes(id)) {
      this.ids.push(id);
      this.save();
    }
  }

  remove(id: number) {
    this.ids = this.ids.filter(x => x !== id);
    this.save();
  }

  toggle(id: number) {
    if (this.ids.includes(id)) this.remove(id);
    else this.add(id);
  }
}

export const favoritesStore = new FavoritesStore();