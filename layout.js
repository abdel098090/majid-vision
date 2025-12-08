const NAV_TEMPLATE = `
  <header class="navbar sticky">
    <div class="logo">Madjid Vision</div>
    <nav>
      <ul class="nav-links">
        <li><a href="index.html" data-nav="home">Home</a></li>
        <li><a href="about.html" data-nav="about">About</a></li>
        <li><a href="portfolio.html" data-nav="portfolio">Portfolio</a></li>
        <li><a href="courses.html" data-nav="courses">Courses</a></li>
        <li><a href="books.html" data-nav="books">Books</a></li>
        <li><a href="personal.html" data-nav="personal">Branding</a></li>
        <li><a href="technical-help.html" data-nav="technical-help">Tech Help</a></li>
        <li><a href="contact.html" data-nav="contact">Contact</a></li>
        <li class="lang-switcher">
          <button type="button" class="lang-coming" title="Français & العربية versions coming soon" disabled>🌍 Languages</button>
        </li>
        <li><button id="dark-toggle" type="button" aria-label="Toggle dark mode">🌙</button></li>
        <li><a href="contact.html#booking" class="nav-cta">Book a Call</a></li>
      </ul>
    </nav>
  </header>
`;

const FOOTER_TEMPLATE = `
  <footer class="site-footer">
    <div class="footer-content">
      <p class="footer-logo">Madjid Vision</p>
      <ul class="footer-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="courses.html">Courses</a></li>
        <li><a href="books.html">Books</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <p class="footer-copy">&copy; 2025 Madjid Vision. All rights reserved.</p>
      <p class="footer-note">Downloadable resources & social channels returning soon.</p>
    </div>
  </footer>
`;

function renderTemplate(selector, template) {
  document.querySelectorAll(selector).forEach((container) => {
    container.innerHTML = template;
  });
}

function highlightActiveNav() {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  document.querySelectorAll('[data-component="navbar"] [data-nav]').forEach((link) => {
    if (link.dataset.nav === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTemplate('[data-component="navbar"]', NAV_TEMPLATE);
  renderTemplate('[data-component="footer"]', FOOTER_TEMPLATE);
  highlightActiveNav();
  document.dispatchEvent(new CustomEvent('layout:ready'));
});
