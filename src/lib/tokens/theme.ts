/**
 * Theme utilities (client-side) — persistence and init helpers.
 * Note: designed to be imported in client islands or used by inline scripts.
 */

export type Theme = 'light' | 'dark';
export type Contrast = 'default' | 'high';

const THEME_KEY = 'vibe-theme';
const CONTRAST_KEY = 'vibe-contrast';

export function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v === 'light' || v === 'dark') return v;
    return null;
  } catch (e) {
    return null;
  }
}

export function getStoredContrast(): Contrast | null {
  try {
    const v = localStorage.getItem(CONTRAST_KEY);
    if (v === 'default' || v === 'high') return v;
    return null;
  } catch (e) {
    return null;
  }
}

export function setStoredTheme(theme: Theme | null) {
  try {
    if (theme === null) localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
}

export function setStoredContrast(contrast: Contrast | null) {
  try {
    if (contrast === null) localStorage.removeItem(CONTRAST_KEY);
    else localStorage.setItem(CONTRAST_KEY, contrast);
  } catch (e) {}
}

export function initThemeFromPrefs(root: HTMLElement = document.documentElement) {
  const storedTheme = getStoredTheme();
  const storedContrast = getStoredContrast();

  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const prefersHigh = typeof window !== 'undefined' && window.matchMedia && (window.matchMedia('(prefers-contrast: more)').matches || window.matchMedia('(prefers-contrast: high)').matches);

  const theme: Theme = (storedTheme as Theme) || (prefersDark ? 'dark' : 'light');
  const contrast: Contrast = (storedContrast as Contrast) || (prefersHigh ? 'high' : 'default');

  root.setAttribute('data-theme', theme);
  root.setAttribute('data-contrast', contrast);

  return { theme, contrast };
}
