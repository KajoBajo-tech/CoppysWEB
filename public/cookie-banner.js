/**
 * Obsługa Banera Zgody RODO / Cookies dla Coppys
 */
(function initCookieBanner() {
  document.addEventListener('DOMContentLoaded', () => {
    const consent = localStorage.getItem('coppys_cookie_consent');
    if (consent) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        <h4>🔒 Prywatność i Pliki Cookies</h4>
        <p>
          Używamy plików cookies oraz pamięci lokalnej (LocalStorage) wyłącznie w celu zapewnienia prawidłowego działania panelu, zapamiętania preferencji językowych oraz obsługi bezpiecznej autoryzacji Discord OAuth2. 
          Szczegóły znajdziesz w naszej <a href="#privacy" data-route="privacy" style="color: #00f0ff; text-decoration: underline;">Polityce Prywatności</a>.
        </p>
      </div>
      <div class="cookie-actions">
        <button class="cookie-btn decline" id="cookie-decline">Tylko niezbędne</button>
        <button class="cookie-btn accept" id="cookie-accept">Akceptuję wszystkie</button>
      </div>
    `;

    document.body.appendChild(banner);

    setTimeout(() => {
      banner.classList.add('active');
    }, 500);

    document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem('coppys_cookie_consent', 'accepted');
      banner.classList.remove('active');
      setTimeout(() => banner.remove(), 400);
    });

    document.getElementById('cookie-decline').addEventListener('click', () => {
      localStorage.setItem('coppys_cookie_consent', 'essential');
      banner.classList.remove('active');
      setTimeout(() => banner.remove(), 400);
    });
  });
})();