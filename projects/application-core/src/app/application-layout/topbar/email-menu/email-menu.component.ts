import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UrlSanitizerService } from 'projects/application-core/src/app/application-shared/sevices/url-sanitizer.service';
import { SharedMenuService } from 'projects/application-core/src/app/application-shared/sevices/shared-menu.service';


@Component({
  selector: 'app-email-menu',
  templateUrl: './email-menu.component.html',
  styleUrls: ['./email-menu.component.scss'],
})
export class EmailMenuComponent implements OnInit {
  @Input() emails: any[] = [];
  @Input() isMenuOpen: boolean = false; // Define isMenuOpen property

  constructor(
    private sharedMenuService: SharedMenuService,
    private urlSanitizerService: UrlSanitizerService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit() {}

  toggleMenu(event: Event) {
    event.stopPropagation(); // Prevent the click event from bubbling up
    this.isMenuOpen = !this.isMenuOpen;
    this.sharedMenuService.setActiveMenu(this.isMenuOpen ? 'email' : null);
  }

  // Inside your NotificationMenuComponent class
  onItemClick(email: any) {
    if (email.route) {
      // If a route is specified in the email data, navigate to that route
      this.router.navigate([email.route]);
      this.isMenuOpen = false; // Close the menu after navigation
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!event || !this.el.nativeElement.contains(event.target as Node)) {
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
