import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { SharedMenuService } from '../application-shared/sevices/shared-menu.service';
import { SearchMenuComponent } from './topbar/search-menu/search-menu.component';
import { TopbarComponent } from './topbar/topbar.component';

@Component({
  selector: 'app-application-layout',
  templateUrl: './application-layout.component.html',
  styleUrls: ['./application-layout.component.scss'],
})
export class ApplicationLayoutComponent {
  @ViewChild(SearchMenuComponent) SearchMenu!: SearchMenuComponent;
  @ViewChild(TopbarComponent) TopbarAccordianMenu!: TopbarComponent;
  
  @Input() AppMenuData: any[] = [
    {
      label: 'Vonome SME',
      imgUrl: '/assets/Product/sme.svg',
      url: '/vonome-sme',
    },
    {
      label: 'Vonome CRM',
      imgUrl: '/assets/Product/crm.svg',
      url: '/vonome-crm',
    },
    {
      label: 'Vonome INVOICE',
      imgUrl: '/assets/Product/task_bing.svg',
      url: '/vonome-invoice',
    },
    {
      label: 'Vonome HRM',
      imgUrl: '/assets/Product/hr.svg',
      url: '/vonome-crm',
    },
    {
      label: 'Vonome ACM',
      imgUrl: '/assets/Product/erp.svg',
      url: '/vonome-crm',
    },
    {
      label: 'Vonome ERP',
      imgUrl: '/assets/Product/e-invoice.svg',
      url: '/vonome-crm',
    },
    {
      label: 'Vonome TASK BING',
      imgUrl: '/assets/Product/accounting.svg',
      url: '/vonome-crm',
    },
  ];
  // In ApplicationLayoutComponent
  isSidebarCollapsed: boolean = false;
  isAppMenubarCollapsed: boolean = false;
  isMobileView: boolean = false;
  isAccordionOpen: boolean = false;
  //enable Topbar Menu
  enableNotification: boolean = true;
  enableDirectory: boolean = true;
  enableEmail: boolean = true;
  enableHelp: boolean = true;
  enableProfile: boolean = true;
  enableSearchData: boolean = true;

  constructor(private sharedMenuService: SharedMenuService) {}

  ngOnInit() {
    this.checkMobileView();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobileView();
    // this.toggleSidebar;
  }

  checkMobileView(): boolean {
    // Check the window width and set isMobileView accordingly
    this.isMobileView = window.innerWidth < 1025;

    // Set isSidebarCollapsed based on isMobileView
    return (this.isSidebarCollapsed = this.isMobileView ? true : false);
  }

  toggleSidebar(event: boolean) {
    this.isSidebarCollapsed = event;
    if (this.isSidebarCollapsed) {
      this.isAppMenubarCollapsed = false;
      
    }
  }

  toggleAppMenuBar(event: boolean) {
    this.isAppMenubarCollapsed = event;
    if (this.isAppMenubarCollapsed) {
      this.isSidebarCollapsed = false;
    }
  }

  // Handle mouse enter event
  handleMouseEnter() {
    if (this.isSidebarCollapsed) {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }

  // Handle mouse leave event
  // handleMouseLeave() {
  //   if (!this.isSidebarCollapsed) {
  //     this.isSidebarCollapsed = !this.isSidebarCollapsed;
  //   }
  // }
}
