import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationLayoutRoutingModule } from './application-layout-routing.module';
import { ApplicationLayoutComponent } from './application-layout.component';
import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NotificationMenuComponent } from './topbar/notification-menu/notification-menu.component';
import { EmailMenuComponent } from './topbar/email-menu/email-menu.component';
import { ProfileMenuComponent } from './topbar/profile-menu/profile-menu.component';
import { DirectoryMenuComponent } from './topbar/directory-menu/directory-menu.component';
import { HelpMenuComponent } from './topbar/help-menu/help-menu.component';
import { SearchMenuComponent } from './topbar/search-menu/search-menu.component';
import { AppMenuSidebarComponent } from './app-menu-sidebar/app-menu-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    ApplicationLayoutComponent,
    DashboardComponent,
    SidebarComponent,
    TopbarComponent,
    NotificationMenuComponent,
    EmailMenuComponent,
    ProfileMenuComponent,
    DirectoryMenuComponent,
    HelpMenuComponent,
    SearchMenuComponent,
    AppMenuSidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ApplicationLayoutRoutingModule,
    ReactiveFormsModule,
  ],
  
  
})
export class ApplicationLayoutModule {}
