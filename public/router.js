/* Premium URL router z obsługą schematu: /home/pl_pl/, /home/en_us/servers itd. */
const CoppysRoutes = {
  landing: '',
  servers: 'servers',
  dashboard: 'dashboard',
  gateway: 'gateway',
  terms: 'terms',
  privacy: 'privacy'
};

const routeBySlug = Object.fromEntries(
  Object.entries(CoppysRoutes).map(([view, slug]) => [slug, view])
);

// Mapowanie języka na pełny kod krajowy (language_country)
const localeMap = {
  pl: 'pl_pl',
  en: 'en_us',
  de: 'de_de',
  fr: 'fr_fr',
  ja: 'ja_jp'
};

const supportedLocales = Object.values(localeMap);

function parsePath() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  
  // Oczekiwana ścieżka: ['home', 'pl_pl', 'servers']
  if (parts[0] !== 'home' || !parts[1]) {
    return null;
  }

  const locale = parts[1].toLowerCase();
  if (!supportedLocales.includes(locale)) {
    return null;
  }

  const viewSlug = parts[2] || '';
  const view = routeBySlug[viewSlug] || 'landing';

  return { locale, view };
}

function getLocaleFromLang(lang) {
  return localeMap[lang] || 'pl_pl';
}

function getLangFromLocale(locale) {
  return locale.split('_')[0] || 'pl';
}

function pathFor(view, locale = null) {
  const currentLang = AppState.language || 'pl';
  const targetLocale = locale || getLocaleFromLang(currentLang);
  const slug = CoppysRoutes[view] ?? '';
  return `/home/${targetLocale}/${slug}`.replace(/\/+$/, '/');
}

function switchPremiumView(view) {
  if ((view === 'servers' || view === 'dashboard') && !AppState.user) {
    navigate('landing', getLocaleFromLang(AppState.language), true);
    return;
  }
  document.querySelectorAll('.view').forEach(element => element.classList.toggle('active', element.id === view));
  AppState.currentView = view;
  if (view === 'servers' && typeof renderGuilds === 'function') renderGuilds();
  if (view === 'dashboard' && typeof renderDashboard === 'function') renderDashboard();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function route() {
  const parsed = parsePath();
  
  // Jeśli URL nie pasuje do schematu /home/pl_pl/, przekierowujemy od razu na /home/pl_pl/
  if (!parsed) {
    const defaultLocale = getLocaleFromLang(AppState.language || 'pl');
    navigate('landing', defaultLocale, true);
    return;
  }

  const lang = getLangFromLocale(parsed.locale);
  if (AppState.language !== lang) {
    AppState.language = lang;
    localStorage.setItem('coppys-language', lang);
    if (typeof applyLanguage === 'function') applyLanguage();
  }

  document.querySelectorAll('a[data-route]').forEach(link => {
    link.href = pathFor(link.dataset.route, parsed.locale);
  });

  switchPremiumView(parsed.view);
}

function navigate(view, locale = null, replace = false) {
  const targetLocale = locale || getLocaleFromLang(AppState.language);
  const target = pathFor(view, targetLocale);
  if (window.location.pathname !== target) {
    window.history[replace ? 'replaceState' : 'pushState']({}, '', target);
  }
  route();
}

window.route = route;
window.switchView = switchPremiumView;
window.navigate = navigate;
window.addEventListener('popstate', route);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const view = link.getAttribute('href').slice(1) || 'landing';
    if (!CoppysRoutes[view]) return;
    link.dataset.route = view;
    link.href = pathFor(view);
  });
  route();
});

document.addEventListener('click', event => {
  const link = event.target.closest('a[data-route]');
  if (!link) return;
  const view = link.dataset.route;
  event.preventDefault();
  event.stopImmediatePropagation();
  navigate(view);
}, true);

document.addEventListener('click', event => {
  const languageOption = event.target.closest('[data-lang]');
  if (!languageOption) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const lang = languageOption.dataset.lang;
  const locale = getLocaleFromLang(lang);
  localStorage.setItem('coppys-language', lang);
  AppState.language = lang;
  if (typeof applyLanguage === 'function') applyLanguage();
  document.querySelector('#language-select')?.classList.remove('open');
  navigate(AppState.currentView || 'landing', locale);
}, true);