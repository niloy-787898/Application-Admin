import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlSanitizerService } from '../../application-shared/sevices/url-sanitizer.service';
import { MenuDataService } from '../../application-shared/sevices/menu-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() mouseEnterEvent = new EventEmitter<boolean>();

  @Input() isSidebarCollapsed: boolean = false;
  menuData: any[] = [];

  submenuStates: boolean[] = [];
  currentlyOpenSubmenuIndex: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private urlSanitizerService: UrlSanitizerService,
    private el: ElementRef,
    private renderer: Renderer2,
    private menuService: MenuDataService
  ) {}

  ngOnInit() {
    this.getMenuData();
    this.initializeSubmenuStates();
    // Add a click event listener to the document
    this.renderer.listen('document', 'click', (event: Event) => {
      this.closeSubmenusOutsideSidebar();
    });
  }
  private getMenuData() : void {
    this.menuData = this.menuService.getMenuData();
  }
  initializeSubmenuStates() {
    this.submenuStates = new Array(this.menuData.length).fill(false);
  }
  isSelected(menu: any) {
    const currentRoute = this.router.url;
    if (currentRoute === menu.url) {
      return true; // Highlight the main menu item when its route matches
    } else if (menu.children) {
      return menu.children.some(
        (submenu: { url: string }) => currentRoute === submenu.url
      ); // Highlight the submenu item when its route matches
    }
    return false;
  }

  // Add a click event listener to the document body when the submenu is opened.
  toggleSubMenu(index: number, event: Event) {
    // Toggle the submenu state for the clicked menu item
    this.submenuStates[index] = !this.submenuStates[index];

    // Close other submenus when opening one
    if (!this.isSidebarCollapsed) {
      this.submenuStates.forEach((state, i) => {
        if (i !== index) {
          this.submenuStates[i] = false;
        }
      });
    }
    // Set the currently open submenu index
    this.currentlyOpenSubmenuIndex = this.submenuStates[index] ? index : null;

    event.stopPropagation();
  }

  closeSubmenusOutsideSidebar() {
    this.submenuStates = this.submenuStates.map(() => false); // Close all submenus
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  sanitizeImageUrl(url: string | null): SafeResourceUrl | null {
    return this.urlSanitizerService.sanitizeUrl(url);
  }

  // Handle mouse enter event
  handleMouseEnter() {
    this.mouseEnterEvent.emit(true);
  }
}
