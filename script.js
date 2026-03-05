/* script.js */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close menu when clicking a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // 2. Sticky Navbar & Scroll Effects
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on load

  // 4. Tabs Logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked button and target content
      btn.classList.add('active');
      const targetId = `tab-${btn.dataset.tab}`;
      document.getElementById(targetId).classList.add('active');
    });
  });

  // 5. FAQ Accordion Logic
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isActive = header.classList.contains('active');

      // Close all accordions first (optional, comment out if multiple can be open)
      accordionHeaders.forEach(h => {
        h.classList.remove('active');
        if (h.nextElementSibling) {
          h.nextElementSibling.style.maxHeight = null;
        }
      });

      if (!isActive && content) {
        header.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 6. Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 7. Modal & WhatsApp Link Generation
  const waLinks = document.querySelectorAll('.wa-link');
  const modal = document.getElementById('cta-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const modalWaLink = document.getElementById('modal-wa-link');
  const leadForm = document.getElementById('lead-form');

  const waNumber = '212600000000'; // Replace with actual WhatsApp business number
  let currentWaMsg = 'Bonjour!';

  // Open modal on CTA click
  waLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      currentWaMsg = link.dataset.waMsg || 'Bonjour!';
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Close modal if clicked outside content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle WA link click inside modal
  if (modalWaLink) {
    modalWaLink.addEventListener('click', (e) => {
      e.preventDefault();
      const encodedMsg = encodeURIComponent(currentWaMsg);
      const waUrl = `https://wa.me/${waNumber}?text=${encodedMsg}`;
      window.open(waUrl, '_blank');
      closeModal();
    });
  }

  // Handle Form Submit
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect form data
      const formData = new FormData(leadForm);
      const data = Object.fromEntries(formData.entries());

      // Format message for WhatsApp
      let formMsg = `*Nouvelle Demande d'Analyse*\n\n`;
      formMsg += `👤 *Nom:* ${data.nom}\n`;
      formMsg += `📞 *WhatsApp:* ${data.phone}\n`;
      formMsg += `🎂 *Âge:* ${data.age} ans\n`;
      formMsg += `💼 *Situation:* ${data.situation.replace('_', ' ')}\n`;
      formMsg += `🏠 *Crédit:* ${data.credit_type}\n`;
      formMsg += `💰 *Montant:* ${data.montant} Dhs\n\n`;
      formMsg += `_Message initial: ${currentWaMsg}_`;

      const encodedFormMsg = encodeURIComponent(formMsg);
      const waUrl = `https://wa.me/${waNumber}?text=${encodedFormMsg}`;

      // Open WA with all form details prefilled
      window.open(waUrl, '_blank');

      // Reset form and close modal
      leadForm.reset();
      closeModal();
    });
  }
});
