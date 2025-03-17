import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RickmortyRoutingModule } from './rickmorty-routing.module';
import { CharactersComponent } from './components/characters/characters.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { SearchLocationComponent } from './components/searchLocation/searchLocation.component';


@NgModule({
  declarations: [
    CharactersComponent,
    EpisodesComponent,
    SearchLocationComponent
  ],
  imports: [
    CommonModule,
    RickmortyRoutingModule
  ]
})
export class RickmortyModule { }
