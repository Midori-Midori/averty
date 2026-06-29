import { Injectable, signal, computed, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<ThemeMode>('system');
  
  private systemPrefersDark = signal<boolean>(false);

  // Computes the active theme based on user preference and system setting
  resolvedTheme = computed<'light' | 'dark'>(() => {
    const currentTheme = this.theme();
    if (currentTheme === 'system') {
      return this.systemPrefersDark() ? 'dark' : 'light';
    }
    return currentTheme;
  });

  isDark = computed(() => this.resolvedTheme() === 'dark');

  constructor() {
    if (typeof window !== 'undefined') {
      // 1. Load saved theme preference
      const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
      if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
        this.theme.set(savedTheme);
      } else {
        this.theme.set('system');
      }

      // 2. Setup system preference listener
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.systemPrefersDark.set(mediaQuery.matches);
      
      // Use modern addEventListener
      mediaQuery.addEventListener('change', (e) => {
        this.systemPrefersDark.set(e.matches);
      });
    }

    // Effect to apply the theme to DOM and localStorage automatically when signals change
    effect(() => {
      const currentTheme = this.theme();
      const resolved = this.resolvedTheme();

      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', currentTheme);
      }

      if (typeof document !== 'undefined') {
        if (resolved === 'dark') {
          document.documentElement.setAttribute('data-colors-mode', 'dark');
        } else {
          document.documentElement.setAttribute('data-colors-mode', 'light');
        }
      }
    });
  }

  setTheme(newTheme: ThemeMode) {
    this.theme.set(newTheme);
  }

  // Support cycling toggle: light -> dark -> system -> light
  toggleTheme() {
    this.theme.update(t => {
      if (t === 'light') return 'dark';
      if (t === 'dark') return 'system';
      return 'light';
    });
  }
}
