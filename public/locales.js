/**
 * Coppys - Zintegrowany System Routingu, Lokalizacji i Konfiguracji Językowej
 * Wersja ze zdefiniowaną bazą surową (ISO 639-1 + ISO 3166-1) oraz domyślnym językiem angielskim (en_us).
 */

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

// Surowa baza danych języków i krajów oparta na oficjalnych wykazach
const RAW_LOCALES_DATABASE = [
  { code_underscore: "en_us", code_hyphen: "en-us", language: "Angielski (US)", country: "Stany Zjednoczone", lang_code: "en", country_code: "us" },
  { code_underscore: "en_gb", code_hyphen: "en-gb", language: "Angielski (UK)", country: "Wielka Brytania", lang_code: "en", country_code: "gb" },
  { code_underscore: "pl_pl", code_hyphen: "pl-pl", language: "Polski", country: "Polska", lang_code: "pl", country_code: "pl" },
  { code_underscore: "cs_cz", code_hyphen: "cs-cz", language: "Czeski", country: "Czechy", lang_code: "cs", country_code: "cz" },
  { code_underscore: "sk_sk", code_hyphen: "sk-sk", language: "Słowacki", country: "Słowacja", lang_code: "sk", country_code: "sk" },
  { code_underscore: "de_de", code_hyphen: "de-de", language: "Niemiecki", country: "Niemcy", lang_code: "de", country_code: "de" },
  { code_underscore: "fr_fr", code_hyphen: "fr-fr", language: "Francuski", country: "Francja", lang_code: "fr", country_code: "fr" },
  { code_underscore: "es_es", code_hyphen: "es-es", language: "Hiszpański", country: "Hiszpania", lang_code: "es", country_code: "es" },
  { code_underscore: "it_it", code_hyphen: "it-it", language: "Włoski", country: "Włochy", lang_code: "it", country_code: "it" },
  { code_underscore: "uk_ua", code_hyphen: "uk-ua", language: "Ukraiński", country: "Ukraina", lang_code: "uk", country_code: "ua" },
  { code_underscore: "ru_ru", code_hyphen: "ru-ru", language: "Rosyjski", country: "Rosja", lang_code: "ru", country_code: "ru" },
  { code_underscore: "nl_nl", code_hyphen: "nl-nl", language: "Holenderski", country: "Holandia", lang_code: "nl", country_code: "nl" },
  { code_underscore: "pt_pt", code_hyphen: "pt-pt", language: "Portugalski", country: "Portugalia", lang_code: "pt", country_code: "pt" },
  { code_underscore: "pt_br", code_hyphen: "pt-br", language: "Portugalski (Brazylia)", country: "Brazylia", lang_code: "pt", country_code: "br" },
  { code_underscore: "sv_se", code_hyphen: "sv-se", language: "Szwedzki", country: "Szwecja", lang_code: "sv", country_code: "se" },
  { code_underscore: "no_no", code_hyphen: "no-no", language: "Norweski", country: "Norwegia", lang_code: "no", country_code: "no" },
  { code_underscore: "da_dk", code_hyphen: "da-dk", language: "Duński", country: "Dania", lang_code: "da", country_code: "dk" },
  { code_underscore: "fi_fi", code_hyphen: "fi-fi", language: "Fiński", country: "Finlandia", lang_code: "fi", country_code: "fi" },
  { code_underscore: "hu_hu", code_hyphen: "hu-hu", language: "Węgierski", country: "Węgry", lang_code: "hu", country_code: "hu" },
  { code_underscore: "ro_ro", code_hyphen: "ro-ro", language: "Rumuński", country: "Rumunia", lang_code: "ro", country_code: "ro" },
  { code_underscore: "bg_bg", code_hyphen: "bg-bg", language: "Bułgarski", country: "Bułgaria", lang_code: "bg", country_code: "bg" },
  { code_underscore: "el_gr", code_hyphen: "el-gr", language: "Grecki", country: "Grecja", lang_code: "el", country_code: "gr" },
  { code_underscore: "tr_tr", code_hyphen: "tr-tr", language: "Turecki", country: "Turcja", lang_code: "tr", country_code: "tr" },
  { code_underscore: "lt_lt", code_hyphen: "lt-lt", language: "Litewski", country: "Litwa", lang_code: "lt", country_code: "lt" },
  { code_underscore: "lv_lv", code_hyphen: "lv-lv", language: "Łotewski", country: "Łotwa", lang_code: "lv", country_code: "lv" },
  { code_underscore: "et_ee", code_hyphen: "et-ee", language: "Estoński", country: "Estonia", lang_code: "et", country_code: "ee" },
  { code_underscore: "ja_jp", code_hyphen: "ja-jp", language: "Japoński", country: "Japonia", lang_code: "ja", country_code: "jp" },
  { code_underscore: "zh_cn", code_hyphen: "zh-cn", language: "Chiński (Uproszczony)", country: "Chiny", lang_code: "zh", code: "cn" },
  { code_underscore: "zh_tw", code_hyphen: "zh-tw", language: "Chiński (Tradycyjny)", country: "Tajwan", lang_code: "zh", country_code: "tw" },
  { code_underscore: "ko_kr", code_hyphen: "ko-kr", language: "Koreański", country: "Korea Południowa", lang_code: "ko", country_code: "kr" },
  { code_underscore: "ar_sa", code_hyphen: "ar-sa", language: "Arabski", country: "Arabia Saudyjska", lang_code: "ar", country_code: "sa" },
  { code_underscore: "he_il", code_hyphen: "he-il", language: "Hebrajski", country: "Izrael", lang_code: "he", country_code: "il" },
  { code_underscore: "hi_in", code_hyphen: "hi-in", language: "Hindi", country: "Indie", lang_code: "hi", country_code: "in" },
  { code_underscore: "th_th", code_hyphen: "th-th", language: "Tajski", class: "Tajlandia", lang_code: "th", country_code: "th" },
  { code_underscore: "vi_vn", code_hyphen: "vi-vn", language: "Wietnamski", country: "Wietnam", lang_code: "vi", country_code: "vn" },
  { code_underscore: "id_id", code_hyphen: "id-id", language: "Indonezyjski", country: "Indonezja", lang_code: "id", country_code: "id" }
];

// Wygenerowanie tablicy wspieranych lokalizacji na podstawie surowej bazy
const supportedLocales = [];
const localeMappingStore = {};

RAW_LOCALES_DATABASE.forEach(item => {
  supportedLocales.push(item.code_underscore, item.code_hyphen);
  localeMappingStore[item.code_underscore] = item;
  localeMappingStore[item.code_hyphen] = item;
});

function parsePath() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  
  // Oczekiwana ścieżka: ['home', 'en_us', 'servers']
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

function getLocaleFromLang(langCode) {
  const found = RAW_LOCALES_DATABASE.find(x => x.lang_code === langCode);
  return found ? found.code_underscore : 'en_us';
}

function getLangFromLocale(locale) {
  const normalized = locale.toLowerCase().replace('-', '_');
  const found = localeMappingStore[normalized];
  return found ? found.lang_code : 'en';
}

function pathFor(view, locale = null) {
  const currentLang = AppState.language || 'en';
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
  
  // Jeśli ścieżka jest niepoprawna lub brak lokacji, wymuś domyślny angielski (en_us)
  if (!parsed) {
    const defaultLocale = 'en_us';
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