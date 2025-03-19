import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { CoreModule } from '../core/core.module';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CoreModule
  ],
  exports: [
    CardComponent
  ]
})
export class PagesModule { }
