import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { CoreModule } from '../core/core.module';
import { CardComponent } from './components/card/card.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    CardComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CardComponent,
    LoginComponent
  ]
})
export class PagesModule { }
