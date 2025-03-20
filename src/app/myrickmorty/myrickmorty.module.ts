import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyrickmortyRoutingModule } from './myrickmorty-routing.module';
import { FavoritesComponent } from './components/favorites/favorites.component';


@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    MyrickmortyRoutingModule
  ]
})
export class MyrickmortyModule { }
