import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageKey = 'favorites';

  constructor() {}

  // Obtener favoritos de un usuario específico
  getFavorites(userId: number): any[] {
    const favorites = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    return favorites[userId] || []; // Devuelve los favoritos del usuario o un array vacío si no existen
  }


  addFavorite(userId: number, episode: any, rating: number, comment: string): boolean {
    if (!episode || !rating || !comment) return false;

    const favorites = JSON.parse(localStorage.getItem(this.storageKey) || '{}');

    if (!favorites[userId]) {
      favorites[userId] = []; // Inicializa el array de favoritos si no existe
    }

    const alreadyExists = favorites[userId].some((fav: any) => fav.id === episode.id);
    if (alreadyExists) return false; // Evita duplicados

    favorites[userId].push({ ...episode, rating, comment }); // Añade el nuevo favorito
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));

    return true;
  }

  // Eliminar un favorito de un usuario específico
  removeFavorite(userId: number, episodeId: number): void {
    const favorites = JSON.parse(localStorage.getItem(this.storageKey) || '{}');

    if (favorites[userId]) {
      favorites[userId] = favorites[userId].filter((fav: any) => fav.id !== episodeId); // Filtra el favorito a eliminar
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  // Verificar si un episodio es favorito para un usuario específico
  isFavorite(userId: number, episodeId: number): boolean {
    const favorites = this.getFavorites(userId);
    return favorites.some((fav) => fav.id === episodeId);
  }
}
