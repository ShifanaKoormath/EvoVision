// Initialize AOS
AOS.init({ duration: 700, once: true });

// Mobile Menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

menuBtn?.addEventListener('click', () => mobileMenu.classList.remove('hidden'));
closeMenu?.addEventListener('click', () => mobileMenu.classList.add('hidden'));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href') === '#') return;
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    mobileMenu?.classList.add('hidden'); // close mobile menu
  });
});
function openModal(id){
  const modal = document.getElementById(id);
  modal.classList.remove('hidden');
  modal.classList.add('show'); // triggers backdrop fade
  document.body.style.overflow = 'hidden';
}

function closeModal(id){
  const modal = document.getElementById(id);
  modal.classList.remove('show');
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 300); // matches transition duration
}


// Initialize Swiper inside modal
const projectSwiper = new Swiper('.project-screenshots', {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,
  autoplay: { delay: 3500 },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
});

 // Swiper initialization
const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 4000 },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
});

// Optional: touch effect for mobile
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('touchstart', () => card.classList.add('hover'));
  card.addEventListener('touchend', () => card.classList.remove('hover'));
});
// Form submission thankyou
const form = document.querySelector('form[name="contact"]');
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // prevent default form submission

    // Optionally, send the form data via Netlify
    const formData = new FormData(form);
    fetch('/', {
      method: 'POST',
      body: formData
    }).then(() => {
      // Show the thank you modal
      document.getElementById('thankYouModal').classList.remove('hidden');
      form.reset(); // Clear the form fields
    }).catch((error) => alert('Oops! There was a problem.'));
  });

  function closeThankYouModal() {
    document.getElementById('thankYouModal').classList.add('hidden');
  }