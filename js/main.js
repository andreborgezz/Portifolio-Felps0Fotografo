document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  })

  // Initialize particles.js
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ffd700",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffd700",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  }

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-menu a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Portfolio category filter
  const categoryButtons = document.querySelectorAll(".category-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const category = this.getAttribute("data-category")

      portfolioItems.forEach((item) => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Portfolio carousel
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselItems = document.querySelectorAll(".carousel-item");

  let currentIndex = 0;

  // Update carousel position
  function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
  }

  // Add event listeners for carousel buttons
  const nextButton = document.querySelector(".carousel-button.next");
  const prevButton = document.querySelector(".carousel-button.prev");

  if (nextButton && prevButton) {
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);
  }

  // Auto-advance carousel
  setInterval(nextSlide, 5000);

  // Testimonial slider
  const testimonialItems = document.querySelectorAll(".testimonial-item")
  const testimonialDots = document.querySelectorAll(".dot")
  let currentTestimonial = 0

  function showTestimonial(index) {
    testimonialItems.forEach((item) => item.classList.remove("active"))
    testimonialDots.forEach((dot) => dot.classList.remove("active"))

    testimonialItems[index].classList.add("active")
    testimonialDots[index].classList.add("active")
    currentTestimonial = index
  }

  const testimonialNext = document.querySelector(".testimonial-next")
  const testimonialPrev = document.querySelector(".testimonial-prev")

  if (testimonialNext && testimonialPrev) {
    testimonialNext.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length
      showTestimonial(currentTestimonial)
    })

    testimonialPrev.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length
      showTestimonial(currentTestimonial)
    })
  }

  testimonialDots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = Number.parseInt(this.getAttribute("data-index"))
      showTestimonial(index)
    })
  })

  // Auto-advance testimonials if they exist
  if (testimonialItems.length > 0) {
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length
      showTestimonial(currentTestimonial)
    }, 8000)
  }

  // Portfolio modal
  const modal = document.getElementById("portfolioModal")
  const modalImage = document.getElementById("modalImage")
  const modalTitle = document.getElementById("modalTitle")
  const modalDescription = document.getElementById("modalDescription")
  const closeModal = document.querySelector(".close-modal")

  // Open modal when clicking on portfolio expand button
  const expandButtons = document.querySelectorAll(".portfolio-expand")
  expandButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const imgSrc = this.getAttribute("href")
      const title = this.parentElement.querySelector("h3").textContent
      const description = this.parentElement.querySelector("p").textContent

      modalImage.src = imgSrc
      modalTitle.textContent = title
      modalDescription.textContent = description

      modal.style.display = "block"
      document.body.style.overflow = "hidden"
    })
  })

  // Close modal
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    })
  }

  // Close modal when clicking outside of content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  // Form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Here you would typically send the form data to a server
      // For demonstration purposes, we'll just show an alert
      alert("Mensagem enviada com sucesso! Felipe entrará em contato em breve.")
      contactForm.reset()
    })
  }

  // Glitch effect on hover
  const glitchElements = document.querySelectorAll(".glitch-effect")

  glitchElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.classList.add("active")
    })

    element.addEventListener("mouseleave", () => {
      element.classList.remove("active")
    })
  })

  // Animate the hero line after text reveal
  setTimeout(() => {
    const heroLine = document.querySelector(".hero-line")
    if (heroLine) {
      heroLine.style.width = "100px"
    }
  }, 500)
})

// Script para funcionalidade do carrossel lateral
window.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');

    let currentIndex = 0;

    function updateCarousel() {
        const itemHeight = items[0].getBoundingClientRect().height;
        track.style.transform = `translateY(-${currentIndex * itemHeight}px)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);

    // Inicializar o carrossel na posição correta
    updateCarousel();
});

// Script para inicializar a galeria deslizante
window.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.gallery-track');
    const items = document.querySelectorAll('.gallery-item');

    // Duplicar os itens para criar um loop infinito
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    // Ajustar a largura do track para suportar o loop contínuo
    const totalItems = document.querySelectorAll('.gallery-item').length;
    track.style.width = `${totalItems * 300}px`; // 300px é a largura de cada item
});

// Ajustando a galeria deslizante para recalcular o tamanho com base nas imagens e altura reduzida
window.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.gallery-track');
    const items = document.querySelectorAll('.gallery-item img');

    function adjustGalleryHeight() {
        let maxHeight = 250; // Altura fixa para a galeria
        items.forEach(img => {
            if (img.complete) {
                maxHeight = Math.min(maxHeight, img.naturalHeight);
            } else {
                img.onload = () => {
                    maxHeight = Math.min(maxHeight, img.naturalHeight);
                    track.style.height = `${maxHeight}px`;
                };
            }
        });
        track.style.height = `${maxHeight}px`;
    }

    adjustGalleryHeight();
    window.addEventListener('resize', adjustGalleryHeight);
});
