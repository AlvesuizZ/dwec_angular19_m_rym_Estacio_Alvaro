import { Component, inject, OnInit} from '@angular/core';
import { EpisodesService } from '../../services/episodes.service';
import { Episode } from '../../interfaces/episode.interface';
import { FavoritesService } from '../../../myrickmorty/services/favorites.service';

@Component({
  selector: 'app-episodes',
  standalone: false,
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit {

  userId: number = 0;

  episodes:Episode[] = [];

  episodesService=inject(EpisodesService)

  favoritesService=inject(FavoritesService);

  ngOnInit(): void {
    this.loadRandomEpisodes();
  }

  loadRandomEpisodes(): void {
    this.episodesService.getRandomEpisodes().subscribe((response) => {
      this.episodes = response;
    });
  }

  getCharacterImage(characterUrl: string): string {
    const id = characterUrl.split('/').pop();
    return `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`;
  }

  getCharacterImages(episode: any): string[] {
    return episode.characters.slice(0, 6).map((characterUrl: string) => this.getCharacterImage(characterUrl));
  }


  toggleFavorite(episode: any) {
    this.getUserIdFromSessionStorage(); 
    console.log('ID de usuario en toggleFavorite:', this.userId); 
  
    if (this.favoritesService.isFavorite(this.userId, episode.id)) {
      this.favoritesService.removeFavorite(this.userId, episode.id);
      console.log('Episodio eliminado de favoritos:', episode.id);
    } else {
      const rating = prompt('Califica el episodio (1-5):');
      const comment = prompt('Escribe una observación (máx 250 caracteres):');
  
      if (rating && comment && parseInt(rating) >= 1 && parseInt(rating) <= 5 && comment.length <= 250) {
        if (this.favoritesService.addFavorite(this.userId, episode, parseInt(rating), comment)) {
          console.log('Favorito guardado correctamente para usuario:', this.userId);
        } else {
          console.log('No se pudo agregar el favorito, puede estar duplicado.');
        }
      } else {
        alert('Valoración u observación inválida.');
      }
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
  
      if (user && user.id) {
        this.userId = user.id;
        console.log('ID de usuario obtenido:', this.userId);
      } else {
        console.warn('No se encontró un ID válido en el usuario');
      }
    } catch (error) {
      console.error('Error al parsear el usuario de sessionStorage:', error);
    }
  }


}
