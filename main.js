(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });
  const lightbox = document.querySelector('#lightbox');
  if (lightbox) {
    const image = lightbox.querySelector('img');
    const close = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); image.src = ''; document.body.style.overflow = ''; };
    document.querySelectorAll('[data-lightbox="true"]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault(); image.src = link.href; image.alt = link.querySelector('img')?.alt || 'Fotografia de projeto ADIENG';
      lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
    }));
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }
  const form = document.querySelector('#contact-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const subject = String(data.get('subject') || 'Contacto pelo site');
    const message = String(data.get('message') || '').trim();
    const body = `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone || 'Não indicado'}\n\nMensagem:\n${message}`;
    const status = document.querySelector('#form-status');
    if (status) status.textContent = 'A abrir a aplicação de e-mail. Se não abrir automaticamente, envie a mensagem para geral@adieng.net.';
    window.location.href = `mailto:geral@adieng.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
