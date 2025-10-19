// Initialize AOS
AOS.init({ duration: 700, once: true });

  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuLinks = mobileMenu.querySelectorAll("nav a");

  // Toggle menu on button click
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Close button
  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });

  // Close menu when a link is clicked
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // Optional: close when clicking outside the menu
  mobileMenu.addEventListener("click", (e) => {
    if(e.target === mobileMenu) {
      mobileMenu.classList.add("hidden");
    }
  });
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
// Form submission thank you
const form = document.querySelector('form[name="contact"]');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent default form submission

  const formData = new FormData(form);

  // Send form data to Formspree (or Netlify)
  fetch('https://formspree.io/f/mvgwvebq', { // replace with your endpoint
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      // Show the thank you modal
      const modal = document.getElementById('thankYouModal');
      modal.classList.remove('hidden');

      // Reset the form
      form.reset();

      // Scroll form into view
      form.scrollIntoView({ behavior: 'smooth' });
    } else {
      return response.json().then(data => {
        throw new Error(data.error || 'Form submission failed');
      });
    }
  }).catch((error) => alert('Oops! There was a problem: ' + error.message));
});

// Close modal
function closeThankYouModal() {
  const modal = document.getElementById('thankYouModal');
  modal.classList.add('hidden');

  // Optional: scroll back to top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
