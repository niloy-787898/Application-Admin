import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SharedMenuService } from 'projects/application-core/src/app/application-shared/sevices/shared-menu.service';
import { UrlSanitizerService } from 'projects/application-core/src/app/application-shared/sevices/url-sanitizer.service';

@Component({
  selector: 'app-help-menu',
  templateUrl: './help-menu.component.html',
  styleUrls: ['./help-menu.component.scss']
})
export class HelpMenuComponent implements OnInit {

  @Input() helps: any[] = [];
  isMenuOpen: boolean = false; // Define isMenuOpen property

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
    this.sharedMenuService.setActiveMenu(this.isMenuOpen ? 'help' : null);
  }

  // Inside your directoryMenuComponent class
  onItemClick(directory: any) {
    if (directory.route) {
      // If a route is specified in the directory data, navigate to that route
      this.router.navigate([directory.route]);
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
