import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  userId: number = 0;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.getUserIdFromSessionStorage();
    this.loadFavorites();
  }

  getUserIdFromSessionStorage(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id;
    console.log('Usuario actual:', this.userId);
  }

  loadFavorites(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id;
    this.favorites = this.favoritesService.getFavorites(this.userId);
    console.log('Favoritos cargados para el usuario', this.userId, ':', this.favorites);
  }

  removeFavorite(episodeId: number): void {
    this.favoritesService.removeFavorite(this.userId, episodeId);
    this.loadFavorites();
  }
}
