/**
 * Coppys - Główny skrypt aplikacji i panelu
 */
const AppState = {
  user: null,
  currentGuild: null,
  currentView: 'landing',
  isDirty: false,
  language: localStorage.getItem('coppys-language') || 'pl',
  dashboardTab: 'overview',
  draft: {}
};

const guilds = [
  ['Nova Gaming', '12,842', true, 'N', '#0ea5e9'],
  ['Pixel Forge', '4,291', true, 'P', '#8b5cf6'],
  ['Arcadia Hub', '18,407', false, 'A', '#f97316'],
  ['Lunar Lounge', '2,094', true, 'L', '#14b8a6'],
  ['Code Syndicate', '6,713', false, 'C', '#ef4444']
].map(([name, members, hasBot, initial, color]) => ({ name, members, hasBot, initial, color }));

const channels = [
  { name: 'general', type: 'Tekstowy', assignment: 'none' },
  { name: 'logs', type: 'Tekstowy', assignment: 'logs' },
  { name: 'welcome', type: 'Tekstowy', assignment: 'welcome' },
  { name: 'Chill Zone', type: 'Głosowy', assignment: 'none' }
];

const translations = {
  pl: {
    loginDiscord: 'Zaloguj przez Discord',
    heroTitle: 'Twój serwer. <span>Bez granic.</span>',
    heroCopy: 'Coppys łączy zaawansowaną moderację, weryfikację użytkowników i pełną automatyzację w jednym perfekcyjnie dopracowanym panelu WWW.',
    addBot: 'Dodaj do Discorda',
    openDashboard: 'Otwórz Panel Zarządzania',
    servers: 'Serwery',
    users: 'Użytkownicy',
    featuresTitle: 'Wszystko, czego potrzebuje Twój serwer.',
    controlCenter: 'CENTRUM DOWODZENIA',
    hello: 'Witaj',
    selectGuild: 'Wybierz serwer, którym chcesz zarządzać.',
    backGuilds: 'Wróć do serwerów',
    unsaved: 'Masz niezapisane zmiany!',
    unsavedHint: 'Zapisz konfigurację, aby wdrożyć ją na serwerze.',
    cancel: 'Anuluj',
    save: 'Zapisz zmiany',
    secureGateway: 'BEZPIECZNA BRAMKA',
    gatewayTitle: 'Witaj w Nova Gaming',
    gatewayCopy: 'Zanim dołączysz, potwierdź zapoznanie się z naszymi zasadami społeczności.',
    terms: 'Regulamin Usług',
    privacy: 'Polityka Prywatności',
    verify: 'Zweryfikuj i przejdź do Discorda'
  },
  en: {
    loginDiscord: 'Log in with Discord',
    heroTitle: 'Your server. <span>Without limits.</span>',
    heroCopy: 'Coppys unifies intelligent moderation, user verification, and automation in one sleek web control center.',
    addBot: 'Add to Discord',
    openDashboard: 'Open Control Panel',
    servers: 'Servers',
    users: 'Users',
    featuresTitle: 'Everything your server needs.',
    controlCenter: 'COMMAND CENTER',
    hello: 'Welcome',
    selectGuild: 'Choose a server to manage.',
    backGuilds: 'Back to servers',
    unsaved: 'You have unsaved changes!',
    unsavedHint: 'Save your configuration to deploy it to your server.',
    cancel: 'Cancel',
    save: 'Save changes',
    secureGateway: 'SECURE GATEWAY',
    gatewayTitle: 'Welcome to Nova Gaming',
    gatewayCopy: 'Before joining, confirm that you have read our community policies.',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    verify: 'Verify and continue to Discord'
  }
};

const languageMeta = {
  pl: ['🇵🇱', 'PL'],
  en: ['🇬🇧', 'EN'],
  de: ['🇩🇪', 'DE'],
  fr: ['🇫🇷', 'FR'],
  ja: ['🇯🇵', 'JA']
};

const tabs = [
  ['overview', '▦', 'Przegląd'],
  ['channels', '＃', 'Kanały i role'],
  ['verification', '◉', 'Moduł Weryfikacji'],
  ['moderation', '◈', 'Automatyczna Moderacja'],
  ['logs', '☷', 'Logi i Audyt']
];

function t(key) {
  return (translations[AppState.language] || translations.en)[key] || translations.en[key] || key;
}

function applyLanguage() {
  const lang = translations[AppState.language] ? AppState.language : 'en';
  document.documentElement.lang = lang;
  if (document.querySelector('#current-flag')) document.querySelector('#current-flag').textContent = languageMeta[AppState.language][0];
  if (document.querySelector('#current-language')) document.querySelector('#current-language').textContent = languageMeta[AppState.language][1];
  document.querySelectorAll('[data-i18n]').forEach(e => e.innerHTML = t(e.dataset.i18n));
  renderLanguageMenu();
  if (typeof renderFeatures === 'function') renderFeatures();
}

function renderLanguageMenu() {
  const menu = document.querySelector('#language-menu');
  if (!menu) return;
  menu.innerHTML = Object.entries(languageMeta)
    .map(([key, [flag, label]]) => `<button data-lang="${key}">${flag} ${label}</button>`)
    .join('');
}

async function checkAuthStatus() {
  try {
    const response = await fetch('/api/user', { credentials: 'include', headers: { Accept: 'application/json' } });
    if (!response.ok) return;
    const payload = await response.json();
    if (payload.loggedIn === true) {
      AppState.user = payload.user || { name: payload.name, tag: payload.tag, avatar: payload.avatar };
      applyLanguage();
      if (window.navigate) {
        window.navigate('servers');
      }
    }
  } catch (error) {
    console.info('OAuth2 Backend standby mode.');
  }
}

document.addEventListener('DOMContentLoaded', checkAuthStatus);

// Tylko autoryzacja przez Discord
document.addEventListener('click', event => {
  const provider = event.target.closest('#discord-login');
  if (!provider) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  window.location.assign('/api/auth/discord');
}, true);

function renderFeatures() {
  const featureData = window.BotFeaturesData || [];
  const lang = AppState.language || 'pl';
  const grid = document.querySelector('#feature-grid');
  if (!grid) return;

  grid.innerHTML = featureData.map(item => {
    const title = item.title[lang] || item.title.pl;
    const desc = item.description[lang] || item.description.pl;
    return `
      <article class="feature-card">
        <div>
          <div class="feature-header">
            <div class="feature-icon">${item.icon}</div>
            <span class="feature-badge">${item.badge}</span>
          </div>
          <h3>${title}</h3>
          <p>${desc}</p>
        </div>
        <ul class="capability-list">
          ${item.capabilities.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </article>
    `;
  }).join('');
}

function renderGuilds() {
  const currentUser = AppState.user || { name: 'Demo User', tag: 'Demo#0000' };
  const userChip = document.querySelector('#user-chip');
  if (userChip) {
    userChip.innerHTML = `<span class="avatar">${currentUser.avatar || currentUser.name?.slice(0, 2).toUpperCase() || 'U'}</span><span>${currentUser.tag || currentUser.name}</span>`;
  }
  if (document.querySelector('#user-name')) {
    document.querySelector('#user-name').textContent = (currentUser.name || currentUser.tag || 'Użytkowniku').split(' ')[0];
  }
  const guildGrid = document.querySelector('#guild-grid');
  if (guildGrid) {
    guildGrid.innerHTML = guilds.map((g, i) => `
      <article class="guild-card">
        <div class="guild-logo" style="background:linear-gradient(135deg,${g.color},#172554)">${g.initial}</div>
        <h3>${g.name}</h3>
        <p>${g.members} członków</p>
        <button class="button ${g.hasBot ? 'primary' : 'muted'}" data-guild="${i}">
          ${g.hasBot ? 'Zarządzaj' : '＋ Skonfiguruj i zaproś'}
        </button>
      </article>
    `).join('');
  }
}

function renderDashboard() {
  const g = AppState.currentGuild || guilds[0];
  const context = document.querySelector('#guild-context');
  if (context) {
    context.innerHTML = `<span class="guild-logo" style="background:${g.color}">${g.initial}</span><span>${g.name}</span>`;
  }
  const sideNav = document.querySelector('#side-nav');
  if (sideNav) {
    sideNav.innerHTML = tabs.map(([id, icon, label]) => `
      <button data-tab="${id}" class="${AppState.dashboardTab === id ? 'active' : ''}">
        <span>${icon}</span> ${label}
      </button>
    `).join('');
  }
  
  const tab = tabs.find(x => x[0] === AppState.dashboardTab);
  if (document.querySelector('#dashboard-title')) {
    document.querySelector('#dashboard-title').textContent = tab[2];
  }
  const content = document.querySelector('#dashboard-content');
  if (!content) return;
  
  if (AppState.dashboardTab === 'overview') content.innerHTML = overviewHTML();
  else if (AppState.dashboardTab === 'channels') content.innerHTML = channelsHTML();
  else if (AppState.dashboardTab === 'verification') content.innerHTML = verificationHTML();
  else content.innerHTML = placeholderHTML(tab[2]);
}

function overviewHTML() {
  return `
    <div class="overview-grid">
      <div class="metric glass"><small>CZŁONKOWIE</small><strong>12,842</strong></div>
      <div class="metric glass"><small>AKTYWNE MODUŁY</small><strong>04</strong></div>
      <div class="metric glass"><small>AKCJE MODERACJI / 24H</small><strong>142</strong></div>
      <div class="metric glass"><small>STATUS BOTA</small><strong style="color:#47ed91">99.99%</strong></div>
    </div>
    <section class="module-card glass">
      <h2>Stan serwera i bota Coppys</h2>
      <p>Wszystkie systemy bota pracują zoptymalizowanie. Ostatnia synchronizacja: przed chwilą.</p>
      <button class="button secondary" data-tab-link="channels">Skonfiguruj kanały →</button>
    </section>
  `;
}

function channelsHTML() {
  return `
    <section class="module-card glass">
      <h2>Struktura kanałów i logów</h2>
      <p>Przypisz funkcje Coppys do dedykowanych kanałów tekstowych na serwerze.</p>
      <div class="channel-list">
        ${channels.map((c, i) => `
          <div class="channel-row">
            <div class="channel-name">${c.type === 'Głosowy' ? '◖' : '#'} ${c.name}<small>${c.type}</small></div>
            <select data-channel="${i}">
              <option value="none" ${c.assignment === 'none' ? 'selected' : ''}>Standardowy kanał</option>
              <option value="logs" ${c.assignment === 'logs' ? 'selected' : ''}>Dziennik zdarzeń bota</option>
              <option value="welcome" ${c.assignment === 'welcome' ? 'selected' : ''}>Powitania i weryfikacja</option>
            </select>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function verificationHTML() {
  const d = AppState.draft.verification || { terms: true, role: 'Zweryfikowany', message: 'Witaj na serwerze!\nKliknij przycisk poniżej, aby zaakceptować zasady i odblokować dostęp.' };
  return `
    <section class="verification-layout">
      <div class="module-card glass">
        <h2>Bramka Weryfikacyjna</h2>
        <p>Skonfiguruj proces weryfikacji dla nowych członków społeczności.</p>
        <div class="setting-stack">
          <div class="setting toggle-line">
            <div>
              <label>Wymagaj akceptacji regulaminu</label>
              <small>Użytkownik musi przeczytać dokumenty przed odblokowaniem rang.</small>
            </div>
            <button class="toggle ${d.terms ? 'on' : ''}" id="terms-toggle"><span></span></button>
          </div>
          <div class="setting">
            <label for="verified-role">Rola po pomyślnej weryfikacji</label>
            <select id="verified-role">
              ${['Zweryfikowany', 'Członek', 'Nowy Gracz'].map(r => `<option ${r === d.role ? 'selected' : ''}>${r}</option>`).join('')}
            </select>
          </div>
          <div class="setting">
            <label for="welcome-message">Treść wiadomości powitalnej</label>
            <textarea id="welcome-message">${d.message}</textarea>
          </div>
        </div>
      </div>
      <aside class="verification-preview">
        <p class="eyebrow">PODGLĄD EMBED W DISCORDZIE</p>
        <div class="embed">
          <strong>Coppys • System Weryfikacji</strong>
          <p id="embed-preview">${d.message}</p>
        </div>
      </aside>
    </section>
  `;
}

function placeholderHTML(name) {
  return `
    <section class="module-card glass">
      <h2>${name}</h2>
      <p>Moduł jest aktywny i synchronizuje dane w czasie rzeczywistym.</p>
    </section>
  `;
}

function setDirty(value = true) {
  AppState.isDirty = value;
  const bar = document.querySelector('#save-bar');
  if (bar) bar.classList.toggle('visible', value);
}

function toast(message) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.querySelector('#toast-region').append(el);
  setTimeout(() => el.remove(), 2800);
}

document.addEventListener('click', e => {
  if (e.target.closest('#language-trigger')) document.querySelector('#language-select').classList.toggle('open');
  if (e.target.closest('#add-bot')) toast('Otwieranie zaproszenia bota Coppys…');
  
  const guildButton = e.target.closest('[data-guild]');
  if (guildButton) {
    const g = guilds[guildButton.dataset.guild];
    if (g.hasBot) {
      AppState.currentGuild = g;
      if (window.navigate) window.navigate('dashboard');
    } else {
      document.querySelector('#invite-title').textContent = 'Dodaj Coppys do ' + g.name;
      document.querySelector('#invite-modal').classList.add('open');
    }
  }
  if (e.target.closest('#modal-close')) document.querySelector('#invite-modal').classList.remove('open');
  if (e.target.closest('#confirm-invite')) {
    document.querySelector('#invite-modal').classList.remove('open');
    toast('Przekierowywanie do Discord OAuth2…');
  }
  const tab = e.target.closest('[data-tab]');
  if (tab) {
    AppState.dashboardTab = tab.dataset.tab;
    renderDashboard();
  }
  const tabLink = e.target.closest('[data-tab-link]');
  if (tabLink) {
    AppState.dashboardTab = tabLink.dataset.tabLink;
    renderDashboard();
  }
  if (e.target.closest('#terms-toggle')) {
    const d = AppState.draft.verification || {};
    d.terms = !document.querySelector('#terms-toggle').classList.contains('on');
    AppState.draft.verification = { ...d, role: document.querySelector('#verified-role').value, message: document.querySelector('#welcome-message').value };
    document.querySelector('#terms-toggle').classList.toggle('on');
    setDirty();
  }
  if (e.target.closest('#hamburger')) {
    document.querySelector('#sidebar').classList.add('open');
    document.querySelector('#sidebar-overlay').classList.add('open');
  }
  if (e.target.closest('#close-menu') || e.target.closest('#sidebar-overlay')) {
    document.querySelector('#sidebar').classList.remove('open');
    document.querySelector('#sidebar-overlay').classList.remove('open');
  }
  if (e.target.closest('#discard-changes')) {
    AppState.draft = {};
    setDirty(false);
    renderDashboard();
  }
  if (e.target.closest('#save-changes')) {
    const btn = document.querySelector('#save-changes');
    btn.textContent = 'Zapisywanie…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = t('save');
      btn.disabled = false;
      setDirty(false);
      toast('✓ Ustawienia bota zostały wdrożone!');
    }, 800);
  }
});

document.addEventListener('change', e => {
  if (e.target.matches('[data-channel]')) {
    channels[e.target.dataset.channel].assignment = e.target.value;
    setDirty();
  }
});