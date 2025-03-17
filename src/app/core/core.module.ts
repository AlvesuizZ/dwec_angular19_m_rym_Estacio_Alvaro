import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    BreadcrumbComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LayoutComponent]
})
export class CoreModule { }
