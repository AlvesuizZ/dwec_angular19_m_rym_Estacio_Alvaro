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
    if (this.favoritesService.isFavorite(this.userId, episode.id)) {
      this.favoritesService.removeFavorite(this.userId, episode.id);
    } else {
      const rating = prompt('Califica el episodio (1-5):');
      const comment = prompt('Escribe una observación (máx 250 caracteres):');

      if (rating && comment && parseInt(rating) >= 1 && parseInt(rating) <= 5 && comment.length <= 250) {
        this.favoritesService.addFavorite(this.userId, episode, parseInt(rating), comment);
      } else {
        alert('Valoración u observación inválida.');
      }
    }
  }


}
