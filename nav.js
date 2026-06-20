// nav.js — inject shared nav + footer into every page
(function () {
  const currentPage = location.pathname.replace(/\/+$/, '') || '/';

  const navHTML = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --navy: #071022;
      --navy2: #0d1a35;
      --gold: #C9A84C;
      --gold-light: #e8c97a;
      --white: #ffffff;
      --gray: #8a9ab5;
      --text: #d4dbe8;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: var(--navy); color: var(--text); font-family: 'Inter', sans-serif; }

    /* ── NAV ── */
    #site-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      background: rgba(7,16,34,0.96);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(201,168,76,0.2);
      padding: 0 40px;
      height: 70px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem; font-weight: 300; letter-spacing: 0.12em;
      color: var(--gold); text-decoration: none;
    }
    .nav-logo span { color: var(--white); }
    .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
    .nav-links a {
      font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--text); text-decoration: none;
      transition: color 0.25s;
      position: relative;
    }
    .nav-links a::after {
      content: ''; position: absolute; left: 0; bottom: -4px;
      width: 0; height: 1px; background: var(--gold);
      transition: width 0.25s;
    }
    .nav-links a:hover, .nav-links a.active { color: var(--gold); }
    .nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
    .nav-cta {
      background: var(--gold); color: var(--navy) !important;
      padding: 9px 20px; border-radius: 2px; font-weight: 600;
    }
    .nav-cta::after { display: none !important; }
    .nav-cta:hover { background: var(--gold-light) !important; color: var(--navy) !important; }

    /* Hamburger */
    .nav-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
    .nav-toggle span { display: block; width: 24px; height: 2px; background: var(--gold); transition: all 0.3s; }

    /* ── FOOTER ── */
    #site-footer {
      background: #040d1c;
      border-top: 1px solid rgba(201,168,76,0.15);
      padding: 60px 40px 30px;
    }
    .footer-inner {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px;
    }
    .footer-brand .footer-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem; font-weight: 300; color: var(--gold);
      letter-spacing: 0.12em; margin-bottom: 12px; display: block;
    }
    .footer-brand p { font-size: 0.85rem; color: var(--gray); line-height: 1.7; }
    .footer-col h4 {
      font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 16px;
    }
    .footer-col ul { list-style: none; }
    .footer-col ul li { margin-bottom: 10px; }
    .footer-col ul a { font-size: 0.85rem; color: var(--gray); text-decoration: none; transition: color 0.2s; }
    .footer-col ul a:hover { color: var(--white); }
    .footer-bottom {
      max-width: 1100px; margin: 40px auto 0;
      padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);
      display: flex; justify-content: space-between; align-items: center;
      font-size: 0.75rem; color: var(--gray);
    }

    /* WhatsApp float */
    .wpp-float {
      position: fixed; bottom: 28px; right: 28px; z-index: 999;
      width: 56px; height: 56px; border-radius: 50%;
      background: #25D366; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(37,211,102,0.4);
      animation: pulse-wpp 2.5s infinite;
      text-decoration: none;
    }
    .wpp-float svg { width: 28px; height: 28px; fill: white; }
    @keyframes pulse-wpp {
      0%,100% { box-shadow: 0 4px 20px rgba(37,211,102,0.4); }
      50% { box-shadow: 0 4px 36px rgba(37,211,102,0.7); }
    }

    @media (max-width: 768px) {
      #site-nav { padding: 0 20px; }
      .nav-links { display: none; position: absolute; top: 70px; left: 0; right: 0;
        background: rgba(7,16,34,0.98); flex-direction: column; padding: 24px 20px;
        gap: 20px; border-bottom: 1px solid rgba(201,168,76,0.2); }
      .nav-links.open { display: flex; }
      .nav-toggle { display: flex; }
      .footer-inner { grid-template-columns: 1fr; gap: 32px; }
      .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
    }
  </style>

  <nav id="site-nav">
    <a href="/" class="nav-logo">ANI<span>·</span>HU</a>
    <button class="nav-toggle" aria-label="Menu" onclick="document.querySelector('.nav-links').classList.toggle('open')">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links">
      <li><a href="/" data-page="/">Início</a></li>
      <li><a href="/harmonizacao-facial" data-page="/harmonizacao-facial">Harmonização Facial</a></li>
      <li><a href="/harmonizacao-corporal" data-page="/harmonizacao-corporal">Harmonização Corporal</a></li>
      <li><a href="/endolaser" data-page="/endolaser">Endolaser</a></li>
      <li><a href="/curativos" data-page="/curativos">Curativos</a></li>
      <li><a href="/blog" data-page="/blog">Blog</a></li>
      <li><a href="https://wa.me/5511966504825?text=Olá!+Gostaria+de+agendar+uma+avaliação." target="_blank" class="nav-cta">Agendar</a></li>
    </ul>
  </nav>

  <a class="wpp-float" href="https://wa.me/5511966504825?text=Olá!+Gostaria+de+mais+informações." target="_blank" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.855L.057 23.882l6.174-1.619A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.889 9.889 0 01-5.031-1.375l-.361-.214-3.741.981.998-3.648-.235-.374A9.861 9.861 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/></svg>
  </a>
  `;

  const footerHTML = `
  <footer id="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-logo">ANI·HU</span>
        <p>by Dr. Nilmar Bispo · Estética Avançada<br>Referência em harmonização facial, corporal e Endolaser em São Paulo.</p>
      </div>
      <div class="footer-col">
        <h4>Procedimentos</h4>
        <ul>
          <li><a href="/harmonizacao-facial">Harmonização Facial</a></li>
          <li><a href="/harmonizacao-corporal">Harmonização Corporal</a></li>
          <li><a href="index.html">Endolaser</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Clínica</h4>
        <ul>
          <li><a href="/#bio">Dr. Nilmar Bispo</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="https://wa.me/5511966504825" target="_blank">WhatsApp</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} ANI-HU · Dr. Nilmar Bispo · Estética Avançada</span>
      <span>São Bernardo do Campo · Tatuapé · Paulista</span>
    </div>
  </footer>
  `;

  // Insert nav at top of body
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  // Insert footer at end of body
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Mark active link
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page && currentPage.startsWith(a.dataset.page) && a.dataset.page !== '') a.classList.add('active');
    if (a.dataset.page === '' && (currentPage === '/' || currentPage === '')) a.classList.add('active');
  });

  // Push body content down for fixed nav
  document.body.style.paddingTop = '70px';
})();
