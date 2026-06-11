import { Component, HostListener, inject, signal, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { ThemeService, ThemeMode } from '../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  elementRef = inject(ElementRef);
  
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  isThemeMenuOpen = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 60);
  }

  toggleMenu() {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  toggleThemeMenu() {
    this.isThemeMenuOpen.update(open => !open);
  }

  setTheme(mode: ThemeMode) {
    this.themeService.setTheme(mode);
    this.isThemeMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    // If click is outside the navbar component, close the theme dropdown
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isThemeMenuOpen.set(false);
    }
  }
}
