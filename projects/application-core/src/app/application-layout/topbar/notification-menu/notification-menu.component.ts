import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedMenuService } from 'projects/application-core/src/app/application-shared/sevices/shared-menu.service';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.scss'],
})
export class NotificationMenuComponent implements OnInit {
  @Input() notifications: any[] = [];
  isMenuOpen: boolean = false; // Define isMenuOpen property
  // Inside your component
  iconBackgroundColors: string[] = ['#00ff00', '#0000ff', '#ff0000']; // Define an array of colors
  currentColorIndex: number = 0; // Initialize the index variable

  constructor(
    private sharedMenuService: SharedMenuService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit() {}

  toggleMenu(event: Event) {
    event.stopPropagation(); // Prevent the click event from bubbling up
    this.isMenuOpen = !this.isMenuOpen;
    this.sharedMenuService.setActiveMenu(
      this.isMenuOpen ? 'notification' : null
    );
  }

  // Inside your NotificationMenuComponent class
  onItemClick(notification: any) {
    if (notification.route) {
      // If a route is specified in the notification data, navigate to that route
      this.router.navigate([notification.route]);
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

  //get background color
  // Function to get the background color based on the index
  getIconBackgroundColor(index: number): string {
    return this.iconBackgroundColors[index % this.iconBackgroundColors.length];
  }
}
