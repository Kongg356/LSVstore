
document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
    });
  }

  const selects = document.querySelectorAll('.custom-select');
  selects.forEach(sel => {
    sel.addEventListener('change', () => {
      sel.style.borderColor = 'var(--gold)';
      showToast(`Đã lọc: ${sel.options[sel.selectedIndex].text}`);
      setTimeout(() => { sel.style.borderColor = ''; }, 1200);
    });
  });

  const addBtns = document.querySelectorAll('.add-btn');
  addBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card  = btn.closest('.product-card');
      const title = card.querySelector('.card-title').textContent;
      showToast(`✓ Đã thêm: ${title}`);
      btn.textContent = '✓';
      btn.style.background    = 'var(--gold)';
      btn.style.color         = 'var(--black)';
      btn.style.borderColor   = 'var(--gold)';
      setTimeout(() => {
        btn.textContent = '+';
        btn.style.background  = '';
        btn.style.color       = '';
        btn.style.borderColor = '';
      }, 1600);
    });
  });

  const overlayBtns = document.querySelectorAll('.overlay-btn');
  overlayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card  = btn.closest('.product-card');
      const title = card.querySelector('.card-title').textContent;
      showToast(`🔍 Đang xem: ${title}`);
    });
  });


  const heroBtn = document.querySelector('.hero-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      document.querySelector('.main-content')
        ?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const sections = document.querySelectorAll('section, main');
  const navItems = document.querySelectorAll('.nav-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(n => n.classList.remove('active'));
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => observer.observe(sec));


  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.boxShadow = '0 4px 30px rgba(0,0,0,.5)';
    } else {
      header.style.boxShadow = '';
    }
  });

  function showToast(msg) {

    const old = document.querySelector('.toast');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;

    Object.assign(toast.style, {
      position:     'fixed',
      bottom:       '2rem',
      right:        '2rem',
      background:   '#1e1e1e',
      color:        '#e8c97a',
      border:       '1px solid #c9a84c',
      borderRadius: '12px',
      padding:      '.75rem 1.4rem',
      fontFamily:   'DM Sans, sans-serif',
      fontSize:     '.85rem',
      fontWeight:   '500',
      letterSpacing:'.04em',
      zIndex:       '9999',
      opacity:      '0',
      transform:    'translateY(16px)',
      transition:   'opacity .3s ease, transform .3s ease',
      pointerEvents:'none',
      boxShadow:    '0 8px 30px rgba(0,0,0,.5)',
    });

    document.body.appendChild(toast);


    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.opacity   = '1';
        toast.style.transform = 'translateY(0)';
      });
    });


    setTimeout(() => {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 320);
    }, 2200);
  }


  const imgs = document.querySelectorAll('.card-img');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            imgObserver.unobserve(img);
          }
        }
      });
    });
    imgs.forEach(img => imgObserver.observe(img));
  }

  console.log('%c✦ LUXE STORE loaded successfully', 'color:#c9a84c;font-size:14px;font-weight:bold;');
});