import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Episode } from '../interfaces/episode.interface';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  private apiUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) { }

  getRandomEpisodes(): Observable<Episode[]> {
    return this.http.get<{ results: Episode[] }>(this.apiUrl).pipe(
      map(response => this.getRandomElements(response.results, 6))
    );
  }

  private getRandomElements(array: Episode[], count: number): Episode[] {
    return array.sort(() => Math.random() - 0.5).slice(0, count);
  }
}
