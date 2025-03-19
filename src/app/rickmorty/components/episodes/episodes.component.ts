import { Component, inject, OnInit} from '@angular/core';
import { EpisodesService } from '../../services/episodes.service';
import { Episode } from '../../interfaces/episode.interface';

@Component({
  selector: 'app-episodes',
  standalone: false,
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit {

  episodes:Episode[] = [];

  episodesService=inject(EpisodesService)

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



}
