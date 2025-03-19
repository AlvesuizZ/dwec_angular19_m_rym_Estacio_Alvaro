import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../interfaces/character.interface';


@Injectable({
  providedIn: 'root',
})

export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getRandomCharacters(): Observable<Character[]> {
    return this.http.get<{ results: Character[] }>(this.apiUrl).pipe(
      map(response => this.getRandomElements(response.results, 6))
    ); 
  }

  private getRandomElements(array: Character[], count: number): Character[] {
    return array.sort(() => Math.random() - 0.5).slice(0, count);
  }
}
