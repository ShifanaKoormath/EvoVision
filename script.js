function setOverlayHeight() {
  const overlay = document.getElementById('introOverlay');
  overlay.style.height = `${window.innerHeight}px`;
}

// Set on load
setOverlayHeight();

// Update if orientation changes (optional)
window.addEventListener('resize', setOverlayHeight);
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('introOverlay');
  const main = document.querySelector('main');
  const headerLogo = document.getElementById('headerLogo');
 const headerContent = document.getElementById('headerContent');
  setTimeout(() => {
    overlay.classList.add('fadeOut');    // overlay fades out
   headerContent.classList.add('fade-down');
    main.classList.add('fadeIn');       // main content fades in
   // ✅ Refresh AOS after intro finishes
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 800);
  }, 1400); // matches logo & ring animation duration

});




document.addEventListener('DOMContentLoaded', () => {

   const header = document.querySelector('header');
  header.style.transform = 'translateY(0)'; // trigger repaint
  // ===== Initialize AOS =====
  AOS.init({ duration: 700, once: true });

  // ===== HEADER & MOBILE MENU =====
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuLinks = mobileMenu.querySelectorAll("nav a");

  // Toggle menu
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Close menu
  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });

  // Close menu when a link is clicked
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // Close menu when clicking outside
  mobileMenu.addEventListener("click", (e) => {
    if(e.target === mobileMenu) {
      mobileMenu.classList.add("hidden");
    }
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') === '#') return;
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      const headerOffset = document.querySelector('header').offsetHeight;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      mobileMenu.classList.add('hidden'); // close mobile menu if open
    });
  });

  // ===== MODALS =====
  window.openModal = function(id){
    const modal = document.getElementById(id);
    modal.classList.remove('hidden');
    modal.classList.add('show'); // triggers fade
    document.body.style.overflow = 'hidden';
  }

  window.closeModal = function(id){
    const modal = document.getElementById(id);
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 300); // match transition duration
  }

const swiper = new Swiper('.swiper', {
  slidesPerView: 1,        // keep 1 initially for mobile
  spaceBetween: 24,
  loop: true,
  speed: 1000,
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 15,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  breakpoints: {
    768: { slidesPerView: 2, centeredSlides: false, effect: 'slide' },
    1024: { slidesPerView: 3, centeredSlides: false, effect: 'slide' },
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: true,
  },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
});




const workSection = document.getElementById('work');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    });
  },
  { threshold: 0.3 }
);

observer.observe(workSection);


  // ===== TOUCH EFFECTS FOR MOBILE =====
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('touchstart', () => card.classList.add('hover'));
    card.addEventListener('touchend', () => card.classList.remove('hover'));
  });

  // ===== FORM SUBMISSION =====
  const form = document.querySelector('form[name="contact"]');
  if(form){
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);

      fetch('https://formspree.io/f/mvgwvebq', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if(response.ok){
          const modal = document.getElementById('thankYouModal');
          modal.classList.remove('hidden');
          form.reset();
          form.scrollIntoView({ behavior: 'smooth' });
        } else {
          return response.json().then(data => { throw new Error(data.error || 'Form submission failed'); });
        }
      }).catch(err => alert('Oops! There was a problem: ' + err.message));
    });
  }

  window.closeThankYouModal = function(){
    const modal = document.getElementById('thankYouModal');
    modal.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

});
