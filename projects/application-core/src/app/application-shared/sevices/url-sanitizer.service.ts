import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UrlSanitizerService {

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeUrl(url: string | null): SafeResourceUrl | null {
    if (url !== null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return null;
  }

}
