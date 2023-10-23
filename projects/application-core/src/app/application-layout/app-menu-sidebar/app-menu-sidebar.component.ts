import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UrlSanitizerService } from '../../application-shared/sevices/url-sanitizer.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './app-menu-sidebar.component.html',
  styleUrls: ['./app-menu-sidebar.component.scss'],
})
export class AppMenuSidebarComponent implements OnInit {
  @Output() toggleAppMenubarEvent = new EventEmitter<void>();
  @Input() isAppMenubarCollapsed: boolean = false;
  @Input() AppMenuData: any[] = [];
  footerMenus = [
    {
      icon: 'fa-regular fa-user',
      label: 'Help Center',
      route: '/help-center',
    },
    {
      icon: 'fa-solid fa-gear',
      label: 'Setting',
      route: '/setting',
    },
    {
      icon: 'fa-solid fa-right-from-bracket',
      label: 'Support',
      route: '/support',
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private urlSanitizerService: UrlSanitizerService
  ) {}

  isSelected(item: any) {
    const currentRoute = this.router.url;
    if (currentRoute === item.route) {
      return true; // Highlight the main menu item when its route matches
    } else if (item.submenus) {
      return item.submenus.some(
        (submenu: { route: string }) => currentRoute === submenu.route
      ); // Highlight the submenu item when its route matches
    }
    return false;
  }

    // Inside your NotificationMenuComponent class
    onItemClick(footerMenus: any) {
      if (footerMenus.route) {
        // If a route is specified in the profile data, navigate to that route
        this.router.navigate([footerMenus.route]);
      }
    }

  sanitizeImageUrl(url: string | null): SafeResourceUrl | null {
    return this.urlSanitizerService.sanitizeUrl(url);
  }

  ngOnInit() {}
}
