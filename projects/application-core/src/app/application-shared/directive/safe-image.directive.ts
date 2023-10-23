import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Directive({
  selector: 'img[safeImage]',
})
export class SafeImageDirective {
  @Input() set safeImage(value: string | null) {
    if (value !== null) {
      const sanitizedUrl: SafeResourceUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(value);
      this.renderer.setAttribute(
        this.el.nativeElement,
        'src',
        this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, sanitizedUrl)!
      );
    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) {}
}
