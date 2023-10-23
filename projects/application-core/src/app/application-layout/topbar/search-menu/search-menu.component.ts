import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from 'projects/application-core/src/app/application-shared/sevices/search.service';
import { SharedMenuService } from 'projects/application-core/src/app/application-shared/sevices/shared-menu.service';


@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss'],
})
export class SearchMenuComponent implements OnInit {
  searchForm!: FormGroup;
  @Input() searchData: any[] = [];
  @Output() menuToggled = new EventEmitter<boolean>();
  filteredData: any[] = [];
  noResultsFound: boolean = false;
  isMenuOpen: boolean = false;

  constructor(private fb: FormBuilder, private searchService: SearchService, private sharedMenuService: SharedMenuService,) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: [''], // Initialize with an empty query
    });

    this.searchForm!.get('query')!.valueChanges.subscribe((query) => {
      this.searchService.updateSearchQuery(query);
    });

    this.searchService.currentQuery.subscribe((query) => {
      this.filteredData = this.filterData(query);
    });

    this.searchService.currentQuery.subscribe((query) => {
      this.filteredData = this.filterData(query);
      this.toggleResultsDisplay(query);
    });
  }

  filterData(query: string): any[] {
    // Implement your filtering logic here
    const filtered = this.searchData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    // Check if there are no results
    this.noResultsFound = filtered.length === 0;

    return filtered;
  }
  toggleResultsDisplay(query: string) {
    const searchResults = document.querySelector('.search-results');
    const noResults = document.querySelector('.no-results');

    if (searchResults && noResults) {
      if (query !== '') {
        if (this.filteredData.length > 0) {
          searchResults.classList.add('active');
          noResults.classList.remove('active');
        } else {
          searchResults.classList.remove('active');
          noResults.classList.add('active');
        }
      } else {
        searchResults.classList.remove('active');
        noResults.classList.remove('active');
      }
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.sharedMenuService.setActiveMenu(this.isMenuOpen ? 'search' : null);
    this.menuToggled.emit(this.isMenuOpen);
  }

  onItemClick(email: any) {
    if (email.route) {
      // If a route is specified in the email data, navigate to that route
      // Also, close the menu
      this.isMenuOpen = false;
      this.menuToggled.emit(this.isMenuOpen);
    }
  }
}
