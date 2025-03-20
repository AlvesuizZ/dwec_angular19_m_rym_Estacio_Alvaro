import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  userId!: number; 

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.getUserIdFromSessionStorage();
    
    if (this.userId !== null && this.userId !== undefined) {
      this.loadFavorites();
    } else {
      console.warn('No se pudo cargar favoritos porque el userId es inválido.');
    }
  }


  getUserIdFromSessionStorage(): void {
    const userString = sessionStorage.getItem('user');
    console.log('Contenido de sessionStorage:', userString);
  
    if (!userString) {
      console.warn('No hay usuario en sessionStorage');
      return;
    }
  
    try {
      const user = JSON.parse(userString);
      console.log('Usuario parseado:', user); 
  
      if (user && typeof user.id === 'number' && user.id >= 0) {
        this.userId = user.id;
        console.log('ID de usuario obtenido:', this.userId);
      } else {
        console.warn('No se encontró un ID válido en el usuario:', user);
      }
    } catch (error) {
      console.error('Error al parsear el usuario de sessionStorage:', error);
    }
  }

  loadFavorites(): void {
    if (this.userId == null && this.userId == undefined) {
      console.error('Error: userId no válido');
      return;
    }

    this.favorites = this.favoritesService.getFavorites(this.userId);
    console.log('Favoritos cargados para el usuario', this.userId, ':', this.favorites); 
  }

  addFavorite(episode: any, rating: number, comment: string): void {
    if (!this.userId) {
      console.error('Error: userId no válido');
      return;
    }

    console.log('Añadiendo favorito para el usuario:', this.userId, 'Episodio:', episode); 

    if (this.favoritesService.addFavorite(this.userId, episode, rating, comment)) {
      console.log('Favorito añadido correctamente');
      this.loadFavorites();
    } else {
      console.log('Error al añadir el favorito');
    }
  }

  removeFavorite(episodeId: number): void {
    if (!this.userId) {
      console.error('Error: userId no válido');
      return;
    }

    this.favoritesService.removeFavorite(this.userId, episodeId);
    this.loadFavorites();
  }
}