import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';
import { SharedMenuService } from 'projects/application-core/src/app/application-shared/sevices/shared-menu.service';
import { UrlSanitizerService } from 'projects/application-core/src/app/application-shared/sevices/url-sanitizer.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  @Input() profiles: any[] = [];
  isMenuOpen: boolean = false; // Define isMenuOpen property

  constructor(
    private sharedMenuService: SharedMenuService,
    private router: Router,
    private urlSanitizerService: UrlSanitizerService,
    private el: ElementRef

  ) {}

  ngOnInit() {}

  toggleMenu(event: Event) {
    event.stopPropagation(); // Prevent the click event from bubbling up
    this.isMenuOpen = !this.isMenuOpen;
    this.sharedMenuService.setActiveMenu(this.isMenuOpen ? 'profile' : null);
  }

  // Inside your NotificationMenuComponent class
  onItemClick(profileSubmenu: any) {
    if (profileSubmenu.route) {
      // If a route is specified in the profile data, navigate to that route
      this.router.navigate([profileSubmenu.route]);
      this.isMenuOpen = false; // Close the menu after navigation
    }
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      // Clicked outside the email menu, close it
      this.isMenuOpen = false;
    }
  }

  handleMenuClick(event: Event) {
    // Prevent clicks on the email menu from propagating to the document click event
    event.stopPropagation();
  }

  sanitizeImageUrl(url: string | null): SafeResourceUrl | null {
    return this.urlSanitizerService.sanitizeUrl(url);
  }
}
