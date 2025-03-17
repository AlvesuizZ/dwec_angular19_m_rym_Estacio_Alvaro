import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/notFound/notFound.component';


@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
