import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './components/characters/characters.component';
import { SearchLocationComponent } from './components/searchLocation/searchLocation.component';
import { EpisodesComponent } from './components/episodes/episodes.component';

const routes: Routes = [
  { path: 'characters', component: CharactersComponent },
  { path: 'episodes', component: EpisodesComponent },
  { path: 'searchLocation', component: SearchLocationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RickmortyRoutingModule { }
