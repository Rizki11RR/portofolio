/**
 * main.js — Portfolio site interactions
 */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     DOM references
     --------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  const navLinks = document.querySelectorAll(".nav-link");
  const yearEl = document.getElementById("year");

  /* ---------------------------------------------------------
     Footer year
     --------------------------------------------------------- */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------
     Hero entrance animation
     --------------------------------------------------------- */
  var heroElements = document.querySelectorAll(".hero-anim");

  function triggerHeroAnimation() {
    heroElements.forEach(function (el) {
      el.classList.add("hero-visible");
    });
  }

  if (heroElements.length > 0) {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      triggerHeroAnimation();
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(triggerHeroAnimation);
      });
    }
  }

  /* ---------------------------------------------------------
     Mobile menu toggle
     --------------------------------------------------------- */
  function openMobileMenu() {
    mobileMenu.classList.remove("hidden");
    mobileToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden");

    const lines = mobileToggle.querySelectorAll("span");
    lines[0].style.transform = "translateY(4px) rotate(45deg)";
    lines[1].style.opacity = "0";
    lines[2].style.transform = "translateY(-4px) rotate(-45deg)";
  }

  function closeMobileMenu() {
    mobileMenu.classList.add("hidden");
    mobileToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden");

    const lines = mobileToggle.querySelectorAll("span");
    lines[0].style.transform = "";
    lines[1].style.opacity = "";
    lines[2].style.transform = "";
  }

  function toggleMobileMenu() {
    const isOpen = mobileToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMobileMenu() : openMobileMenu();
  }

  mobileToggle.addEventListener("click", toggleMobileMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  /* ---------------------------------------------------------
     Navbar scroll effect
     --------------------------------------------------------- */
  let lastScroll = 0;

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 40) {
      navbar.classList.add("shadow-nav");
    } else {
      navbar.classList.remove("shadow-nav");
    }

    lastScroll = scrollY;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  /* ---------------------------------------------------------
     Active nav link on scroll
     --------------------------------------------------------- */
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("text-primary");
          link.classList.add("text-surface-dark/60");
        });

        var activeLink = document.querySelector('.nav-link[href="#' + id + '"]');
        if (activeLink) {
          activeLink.classList.add("text-primary");
          activeLink.classList.remove("text-surface-dark/60");
        }
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------------------------------------------------------
     Reveal on scroll (Intersection Observer)
     --------------------------------------------------------- */
  var revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length > 0 && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------
     Smooth scroll polyfill for older browsers
     --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = navbar.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });

  /* ---------------------------------------------------------
     Contact Form — Client-side validation & submission
     --------------------------------------------------------- */
  var contactForm = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");

  if (contactForm) {
    var nameField = document.getElementById("contact-name");
    var emailField = document.getElementById("contact-email");
    var messageField = document.getElementById("contact-message");

    function setError(field, message) {
      var fieldWrap = field.closest(".form-field");
      if (fieldWrap) {
        fieldWrap.classList.add("is-error");
        fieldWrap.classList.remove("is-valid");
        var errorEl = fieldWrap.querySelector(".form-error");
        if (errorEl) errorEl.textContent = message;
      }
    }

    function clearError(field) {
      var fieldWrap = field.closest(".form-field");
      if (fieldWrap) {
        fieldWrap.classList.remove("is-error");
        var errorEl = fieldWrap.querySelector(".form-error");
        if (errorEl) errorEl.textContent = "";
      }
    }

    function setValid(field) {
      var fieldWrap = field.closest(".form-field");
      if (fieldWrap) {
        fieldWrap.classList.add("is-valid");
        fieldWrap.classList.remove("is-error");
      }
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Live validation on blur
    nameField.addEventListener("blur", function () {
      if (!this.value.trim()) {
        setError(this, "Please enter your name.");
      } else {
        clearError(this);
        setValid(this);
      }
    });

    emailField.addEventListener("blur", function () {
      if (!this.value.trim()) {
        setError(this, "Please enter your email address.");
      } else if (!isValidEmail(this.value.trim())) {
        setError(this, "Please enter a valid email address.");
      } else {
        clearError(this);
        setValid(this);
      }
    });

    messageField.addEventListener("blur", function () {
      if (!this.value.trim()) {
        setError(this, "Please enter a message.");
      } else {
        clearError(this);
        setValid(this);
      }
    });

    // Clear errors on input
    [nameField, emailField, messageField].forEach(function (field) {
      field.addEventListener("input", function () {
        clearError(this);
      });
    });

    // Form submission
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var hasError = false;

      // Validate name
      if (!nameField.value.trim()) {
        setError(nameField, "Please enter your name.");
        hasError = true;
      } else {
        clearError(nameField);
        setValid(nameField);
      }

      // Validate email
      if (!emailField.value.trim()) {
        setError(emailField, "Please enter your email address.");
        hasError = true;
      } else if (!isValidEmail(emailField.value.trim())) {
        setError(emailField, "Please enter a valid email address.");
        hasError = true;
      } else {
        clearError(emailField);
        setValid(emailField);
      }

      // Validate message
      if (!messageField.value.trim()) {
        setError(messageField, "Please enter a message.");
        hasError = true;
      } else {
        clearError(messageField);
        setValid(messageField);
      }

      if (hasError) {
        // Focus the first field with an error
        var firstError = contactForm.querySelector(".form-field.is-error .form-input");
        if (firstError) firstError.focus();
        return;
      }

      // TODO: Connect form backend — e.g. Formspree, EmailJS, Netlify Forms, or custom API endpoint.
      // Currently, the form is frontend-only and prevents submission.
      // Replace the block below with a fetch() call to the configured endpoint.

      // Show temporary message
      formStatus.classList.remove("hidden");
      formStatus.classList.add("bg-primary-50", "text-primary-dark", "border", "border-primary/20");
      formStatus.textContent = "Contact form backend is not configured yet. Thank you for your interest — please reach out via email or social media in the meantime.";

      // Reset form after showing message
      contactForm.reset();

      // Clear validation states
      [nameField, emailField, messageField].forEach(function (field) {
        var fieldWrap = field.closest(".form-field");
        if (fieldWrap) {
          fieldWrap.classList.remove("is-valid", "is-error");
        }
      });

      // Hide status after 8 seconds
      setTimeout(function () {
        formStatus.classList.add("hidden");
      }, 8000);
    });
  }

})();
