import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageKey = 'favorites';

  constructor() {}


  getFavorites(userId: number): any[] {
    const favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return favorites.filter((fav: any) => fav.userId === userId); 
  }


  addFavorite(userId: number, episode: any, rating: number, comment: string): boolean {
    console.log('Guardando favorito para el usuario:', userId); 
    if (!episode || !rating || !comment) return false;

    const favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    const alreadyExists = favorites.some(
      (fav: any) => fav.userId === userId && fav.id === episode.id
    );
    if (alreadyExists) return false; 

    favorites.push({ userId, ...episode, rating, comment }); 
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));

    console.log('Favorito añadido:', { userId, ...episode, rating, comment });
    return true;
  }


  removeFavorite(userId: number, episodeId: number): void {
    const favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    const updatedFavorites = favorites.filter(
      (fav: any) => !(fav.userId === userId && fav.id === episodeId)
    ); // Filtra para eliminar el favorito
    localStorage.setItem(this.storageKey, JSON.stringify(updatedFavorites));

    console.log('Favorito eliminado:', { userId, episodeId }); 
  } 


  isFavorite(userId: number, episodeId: number): boolean {
    const favorites = this.getFavorites(userId) || [];
  
    console.log('Lista de favoritos en isFavorite:', favorites);
    console.log('Buscando episodio:', episodeId, 'para el usuario:', userId);
  
    return favorites.some(fav => {
      console.log('Comparando con:', fav);
      return fav.userId.toString() === userId.toString() && fav.episode.id === episodeId;
    });
  }
}