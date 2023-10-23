import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationLayoutModule } from './application-layout/application-layout.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedMenuService } from './application-shared/sevices/shared-menu.service';
import { SearchService } from './application-shared/sevices/search.service';
import { MenuDataService } from './application-shared/sevices/menu-data.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ApplicationLayoutModule,
    ReactiveFormsModule,
  ],

  providers: [SharedMenuService, SearchService, MenuDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
