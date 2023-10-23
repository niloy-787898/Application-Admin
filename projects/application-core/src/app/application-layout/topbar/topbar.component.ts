import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EmailMenuComponent } from './email-menu/email-menu.component';
import { NotificationMenuComponent } from './notification-menu/notification-menu.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { SafeResourceUrl } from '@angular/platform-browser';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { DirectoryMenuComponent } from './directory-menu/directory-menu.component';
import { HelpMenuComponent } from './help-menu/help-menu.component';
import { SharedMenuService } from '../../application-shared/sevices/shared-menu.service';
import { UrlSanitizerService } from '../../application-shared/sevices/url-sanitizer.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  @ViewChild(EmailMenuComponent) emailMenu!: EmailMenuComponent;
  @ViewChild(HelpMenuComponent) HelpMenu!: HelpMenuComponent;
  @ViewChild(NotificationMenuComponent)
  notificationMenu!: NotificationMenuComponent;
  @ViewChild(ProfileMenuComponent) profileMenu!: ProfileMenuComponent;
  @ViewChild(SearchMenuComponent) SearchMenu!: SearchMenuComponent;
  @ViewChild(DirectoryMenuComponent) DirectoryMenu!: DirectoryMenuComponent;

  @Output() toggleSidebarEvent = new EventEmitter<boolean>();
  @Output() toggleAppMenubarEvent = new EventEmitter<boolean>();

  @Input() isAccordionOpen: boolean = false; // Initialize accordion state
  @Input() isMenuOpen: boolean = false; // Define isMenuOpen property
  @Input() isAppMenubarCollapsed: boolean = false;
  @Input() isSidebarCollapsed: boolean = false;
  @Input() directories: string[] = [];
  @Input() notifications: string[] = [];
  @Input() emails: string[] = [];
  @Input() helps: string[] = [];
  @Input() profiles: string[] = [];
  @Input() searchData: any[] = [];
  @Input() enableNotification: boolean = true;
  @Input() enableDirectory: boolean = true;
  @Input() enableEmail: boolean = true;
  @Input() enableHelp: boolean = true;
  @Input() enableProfile: boolean = true;
  @Input() enableSearchData: boolean = true;

  // Image logo path store
  imgUrlWithoutText: any = './assets/logo/vonome-logo-without-text.png';
  imgUrlWithText: any = './assets/logo/vonome.png';
  directoryList = [
    {
      key: 'SME',
      name: 'Vonome SME',
      imgUrl: '/assets/Product/sme.svg',
      route: '/vonome-sme',
      submenus: [],
    },
    {
      key: 'CRM',
      name: 'Vonome CRM',
      imgUrl: '/assets/Product/crm.svg',
      route: '/vonome-crm',
      submenus: [],
    },
    {
      key: 'INV',
      name: 'Vonome INVOICE',
      imgUrl: '/assets/Product/task_bing.svg',
      route: '/vonome-invoice',
      submenus: [],
    },
    {
      key: 'HRM',
      name: 'Vonome HRM',
      imgUrl: '/assets/Product/hr.svg',
      route: '/vonome-crm',
      submenus: [],
    },
    {
      key: 'ACM',
      name: 'Vonome ACM',
      imgUrl: '/assets/Product/erp.svg',
      route: '/vonome-crm',
      submenus: [],
    },
    {
      key: 'ERP',
      name: 'Vonome ERP',
      imgUrl: '/assets/Product/e-invoice.svg',
      route: '/vonome-crm',
      submenus: [],
    },
    {
      key: 'TB',
      name: 'Vonome TASK BING',
      imgUrl: '/assets/Product/accounting.svg',
      route: '/vonome-crm',
      submenus: [],
    },
  ];
  notificationList = [
    {
      icon: 'fa-regular fa-thumbs-up',
      label: 'Someone likes our posts.',
      time: '5 horus ago',
      route: '/likes',
    },
    {
      icon: 'fa-regular fa-message',
      label: '3 New Comments',
      time: '3 horus ago',
      route: '/likes',
    },
    {
      icon: 'fa-brands fa-shopify',
      label: 'New Orders Placed.',
      time: '45 mins ago',
      route: '/likes',
    },
    {
      icon: 'fa-brands fa-first-order',
      label: 'Orders Activity.',
      time: '30 mins ago',
    },
  ];
  emailList = [
    {
      profileImage: '/assets/profile/profile-img.jpg',
      name: 'niloy',
      tag: 'Like',
      time: '5 horus ago',
      route: '/likes',
    },
    {
      profileImage: '/assets/profile/profile-img.jpg',
      name: 'niloy',
      tag: 'Like',
      time: '5 horus ago',
      route: '/likes',
    },
    {
      profileImage: '/assets/profile/profile-img.jpg',
      name: 'niloy',
      tag: 'Like',
      time: '5 horus ago',
    },
  ];
  helpList = [
    {
      name: 'Help & Support',
      subname: 'Have questions? Find answers here!',
      route: '/help-support',
    },
    {
      name: 'Demo',
      subname: 'Watch our comprehensive tutorial.',
      route: '/demo',
    },
    {
      name: 'Whats new in Vonome Solution?',
      subname: '',
      route: '/whats-new',
    },
    {
      name: 'Take a tour',
      subname: '',
      route: '/take-tour',
    },
  ];
  profileList = [
    {
      profileImage: '/assets/profile/profile-img.jpg',
      name: 'niloy',
      role: 'web Developer',
      submenu: [
        {
          icon: 'fa-regular fa-user',
          label: 'My Profile',
          route: '/profile',
        },
        {
          icon: 'fa-solid fa-gear',
          label: 'My Profile',
          route: '/setting',
        },
        {
          icon: 'fa-solid fa-right-from-bracket',
          label: 'Logout',
          route: '/logout',
        },
      ],
    },
  ];
  searchdata = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Alice Johnson' },
    { id: 3, name: 'Bob Smith' },
    { id: 4, name: 'Jashim Uddin' },
  ];

  constructor(
    private sharedMenuService: SharedMenuService,
    private urlSanitizerService: UrlSanitizerService
  ) {}

  ngOnInit() {
    // Subscribe to the active menu changes
    this.sharedMenuService.getActiveMenu().subscribe((activeMenu: any) => {
      if (activeMenu) {
        // Close the email menu if it's open
        if (activeMenu !== 'email') {
          this.emailMenu.isMenuOpen = false;
        }
        // Close the email menu if it's open
        if (activeMenu !== 'help') {
          this.HelpMenu.isMenuOpen = false;
        }
        // Close the Directory menu if it's open
        if (activeMenu !== 'directory') {
          this.DirectoryMenu.isMenuOpen = false;
        }
        // Close the notification menu if it's open
        if (activeMenu !== 'notification') {
          this.notificationMenu.isMenuOpen = false;
        }
        // Close the profile menu if it's open
        if (activeMenu !== 'profile') {
          this.profileMenu.isMenuOpen = false;
        }
        // Close the profile menu if it's open
        if (activeMenu !== 'search') {
          this.SearchMenu.isMenuOpen = false;
        }
      }
    });
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.toggleSidebarEvent.emit(this.isSidebarCollapsed);
    this.sharedMenuService.setActiveAccordian(
      this.isSidebarCollapsed ? 'sidebarMenu' : null
    );
  }

  toggleAppMenuBar() {
    this.isAppMenubarCollapsed = !this.isAppMenubarCollapsed;
    this.toggleAppMenubarEvent.emit(this.isAppMenubarCollapsed);
    this.sharedMenuService.setActiveAccordian(
      this.isAppMenubarCollapsed ? 'AppbarMenu' : null
    );
  }

  toggleAccordion() {
    // Toggle the value of isAccordionOpen
    this.isAccordionOpen = !this.isAccordionOpen;
    this.sharedMenuService.setActiveAccordian(
      this.isAccordionOpen ? 'toggle' : null
    );
  }

  sanitizeImageUrl(url: string | null): SafeResourceUrl | null {
    return this.urlSanitizerService.sanitizeUrl(url);
  }
}
