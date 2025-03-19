import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { RickmortyRoutingModule } from './rickmorty-routing.module';
import { CharactersComponent } from './components/characters/characters.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { SearchLocationComponent } from './components/searchLocation/searchLocation.component';
import { PagesModule } from '../pages/pages.module';


@NgModule({
  declarations: [
    CharactersComponent,
    EpisodesComponent,

  ],
  imports: [
    CommonModule,
    RickmortyRoutingModule,
    CoreModule,
    PagesModule
  ]
})
export class RickmortyModule { }
