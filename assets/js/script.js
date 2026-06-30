const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Menü öffnen");
    });
  });
}

/* ============================================================
   PROJECT SIZE SECTION — interactive selector
   Append this block to the bottom of assets/js/script.js
   ============================================================ */

(function () {
  var optionsContainer = document.getElementById('projectSizeOptions');
  if (!optionsContainer) return;

  optionsContainer.addEventListener('click', function (e) {
    var btn = e.target.closest('.project-size__option');
    if (!btn) return;

    // Deselect all, select clicked
    optionsContainer.querySelectorAll('.project-size__option').forEach(function (el) {
      el.classList.remove('project-size__option--selected');
    });
    btn.classList.add('project-size__option--selected');
  });

  // "Weiter" button — wire up as needed
  var submitBtn = document.getElementById('projectSizeSubmit');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      var selected = optionsContainer.querySelector('.project-size__option--selected');
      var size = selected ? selected.getAttribute('data-size') : '';
      // Replace the line below with your real next-step logic:
      console.log('Selected project size:', size);
    });
  }
})();

/* ── RISKS SLIDER ── */
(function () {
  var track = document.getElementById('risksTrack');
  var trackWrap = document.getElementById('risksTrackWrap');
  var prevBtn = document.getElementById('risksPrev');
  var nextBtn = document.getElementById('risksNext');

  if (!track || !prevBtn || !nextBtn) return;

  var slides = track.querySelectorAll('.risks-slider__slide');
  var total = slides.length;
  var currentIndex = total - 1;
  var GAP = 20;

  function setSlideSize() {
    var h = trackWrap.clientHeight;
    if (h <= 0) h = 500;
    slides.forEach(function (s) {
      s.style.width = h + 'px';
      s.style.height = h + 'px';
    });
  }

  function updateTrack() {
    var size = slides[0] ? slides[0].offsetHeight : 500;
    var wrapWidth = trackWrap.offsetWidth;
    var offset = -(currentIndex * (size + GAP)) + (wrapWidth - size);
    track.style.transform = 'translateX(' + offset + 'px)';
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= total - 1;
  }

  function init() {
    setSlideSize();
    updateTrack();
  }

  prevBtn.addEventListener('click', function () {
    if (currentIndex > 0) { currentIndex--; updateTrack(); }
  });

  nextBtn.addEventListener('click', function () {
    if (currentIndex < total - 1) { currentIndex++; updateTrack(); }
  });

  window.addEventListener('resize', function () {
    setSlideSize();
    updateTrack();
  });

  setTimeout(init, 50);
})();

/* ── TESTIMONIALS CAROUSEL ── */
(function () {
  var stage = document.getElementById('testimonialsStage');
  var dotsContainer = document.getElementById('testimonialsDots');

  if (!stage || !dotsContainer) return;

  var cards = stage.querySelectorAll('.testimonials__card');
  var dots = dotsContainer.querySelectorAll('.testimonials__dot');
  var total = cards.length;
  var current = 0;
  var timer;

  function goTo(index) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
    goTo((current + 1) % total);
  }

  function startTimer() {
    timer = setInterval(next, 5000);
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      clearInterval(timer);
      goTo(parseInt(this.getAttribute('data-index')));
      startTimer();
    });
  });

  startTimer();
})();

/* ── PROZESS CAROUSEL ── */
(function () {
  var outer = document.querySelector('.prozess__carousel-outer');
  var track = document.getElementById('prozessTrack');
  var prevBtn = document.getElementById('prozessPrev');
  var nextBtn = document.getElementById('prozessNext');

  if (!outer || !track || !prevBtn || !nextBtn) return;

  var cards = track.querySelectorAll('.prozess__card');
  var total = cards.length;
  var current = 0;
  var CARD_WIDTH_RATIO = 0.58;
  var GAP = 16;

  function updateTrack() {
    var cardW = outer.clientWidth * CARD_WIDTH_RATIO;
    var offset = current * (cardW + GAP);
    track.style.transform = 'translateX(-' + offset + 'px)';
    prevBtn.disabled = current <= 0;
    nextBtn.disabled = current >= total - 1;
  }

  prevBtn.addEventListener('click', function () {
    if (current > 0) { current--; updateTrack(); }
  });

  nextBtn.addEventListener('click', function () {
    if (current < total - 1) { current++; updateTrack(); }
  });

  window.addEventListener('resize', updateTrack);
  updateTrack();
})();

/* ── SCROLL REVEAL ── */
(function () {
  var selector = [
    '.risks-slider__header',
    '.risks-slider__track-wrap',
    '.risks-slider__mobile-stack',
    '.risks-slider__bottom',
    '.how-it-works__header',
    '.how-it-works__video-wrap',
    '.how-it-works__cards',
    '.testimonials__title-wrap',
    '.testimonials__grid',
    '.testimonials__logos-mobile',
    '.prozess__left',
    '.prozess__carousel-outer',
    '.prozess__mobile .prozess__title-wrap',
    '.prozess__mobile .prozess__subtitle',
    '.prozess__mobile-scroll',
    '.data-protection__title-wrap',
    '.data-protection__subtitle',
    '.data-protection__card'
  ].join(', ');

  var elements = document.querySelectorAll(selector);

  if (!elements.length || !('IntersectionObserver' in window)) {
    // Fallback: just make everything visible
    elements.forEach(function (el) { el.classList.add('scroll-reveal-visible'); });
    return;
  }

  elements.forEach(function (el) {
    el.classList.add('scroll-reveal');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ── FLEXIBILITAET CAROUSEL ── */
(function () {
  var outer = document.querySelector('.flexibilitaet__carousel-outer');
  var track = document.getElementById('flexTrack');
  var prevBtn = document.getElementById('flexPrev');
  var nextBtn = document.getElementById('flexNext');

  if (!outer || !track || !prevBtn || !nextBtn) return;

  var slides = track.querySelectorAll('.flexibilitaet__slide');
  var total = slides.length;
  var current = 0;
  var CARD_WIDTH_RATIO = 0.75;
  var GAP = 16;

  function updateTrack() {
    var cardW = outer.clientWidth * CARD_WIDTH_RATIO;
    var offset = current * (cardW + GAP);
    track.style.transform = 'translateX(-' + offset + 'px)';
    prevBtn.disabled = current <= 0;
    nextBtn.disabled = current >= total - 1;
  }

  prevBtn.addEventListener('click', function () {
    if (current > 0) { current--; updateTrack(); }
  });

  nextBtn.addEventListener('click', function () {
    if (current < total - 1) { current++; updateTrack(); }
  });

  window.addEventListener('resize', updateTrack);
  updateTrack();
})();

/* ── BROCHURE VIDEO ── */
(function () {
  var playBtn = document.getElementById('brochurePlayBtn');
  var iframe = document.getElementById('brochureIframe');

  if (!playBtn || !iframe) return;

  playBtn.addEventListener('click', function () {
    iframe.src = iframe.getAttribute('data-src');
    iframe.classList.add('active');
    playBtn.style.display = 'none';
  });
})();

/* ── FAQ ACCORDION ── */
(function () {
  var items = document.querySelectorAll('.faq__item');

  items.forEach(function (item) {
    var trigger = item.querySelector('.faq__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Close all
      items.forEach(function (i) {
        i.classList.remove('is-open');
        var t = i.querySelector('.faq__trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ============================================================
   SOLAR HERO — assets/js/script.js  (add-on / replacement)

   INSTRUCTIONS:
   • Keep all your existing script.js code EXCEPT for any old
     hero-message, mobile-stat, and counter blocks you may have.
   • The counter code below replaces any existing counter code.
   • Paste this entire block at the BOTTOM of your script.js.
   ============================================================ */

/* ── COUNTERS (animates all [data-target] elements on scroll-in) ── */
(function () {
  var counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  var formatNumber = function (value) {
    return new Intl.NumberFormat('de-DE').format(value);
  };

  var animateCounter = function (element, target, duration) {
    duration = duration || 2000;
    var hasAnimated = false;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || hasAnimated) return;
        hasAnimated = true;

        var startTime = performance.now();

        var updateCounter = function (now) {
          var elapsed = now - startTime;
          var progress = Math.min(elapsed / duration, 1);
          var easeProgress = 1 - Math.pow(1 - progress, 3);
          var currentValue = Math.floor(target * easeProgress);
          element.textContent = formatNumber(currentValue);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            element.textContent = formatNumber(target);
          }
        };

        requestAnimationFrame(updateCounter);
        observer.unobserve(element);
      });
    }, { threshold: 0.1 });

    observer.observe(element);
  };

  counters.forEach(function (counter) {
    var target = Number(counter.dataset.target || 0);
    animateCounter(counter, target, 2000);
  });
})();

/* ── SOLAR HERO CAROUSEL (desktop auto-scroll + height match; mobile native scroll) ── */
(function () {
  var outer = document.querySelector('.solar-hero__carousel-outer');
  var track = document.getElementById('solarTrack');

  if (!outer || !track) return;

  var slides = track.querySelectorAll('.solar-hero__slide');
  var total = slides.length;
  var current = 0;
  var autoTimer = null;
  var CARD_WIDTH_RATIO = 0.80;
  var GAP = 16;

  /* On desktop: match slide height to left column so cards fill the full hero height */
  function matchHeight() {
    if (window.innerWidth < 768) return;
    var leftCol = document.querySelector('.solar-hero__left');
    if (!leftCol) return;
    var h = leftCol.offsetHeight;
    slides.forEach(function (s) {
      s.style.height = h + 'px';
      s.style.minHeight = h + 'px';
    });
  }

  function isMobile() {
    return window.innerWidth < 768;
  }

  /* Slide the track so the next card is partially visible to the right */
  function updateTrack() {
    if (isMobile()) return; /* native scroll handles mobile */
    var cardW = outer.clientWidth * CARD_WIDTH_RATIO;
    var offset = current * (cardW + GAP);
    track.style.transform = 'translateX(-' + offset + 'px)';
  }

  function goNext() {
    current = (current + 1) % total;
    updateTrack();
  }

  function startAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(function () {
      if (!isMobile()) goNext();
    }, 5000);
  }

  window.addEventListener('resize', function () {
    matchHeight();
    if (!isMobile()) updateTrack();
  });

  matchHeight();
  updateTrack();
  startAuto();
})();

// ── Solarenergie carousel ──
(function () {
  const track = document.getElementById('solarTrack');
  const prevBtn = document.getElementById('solarPrev');
  const nextBtn = document.getElementById('solarNext');
  if (!track || !prevBtn || !nextBtn) return;

  let index = 0;
  const slides = track.querySelectorAll('.solarenergie__slide');
  const total = slides.length;

  function getSlideWidth() {
    return slides[0].offsetWidth + 16; // slide width + gap
  }

  function update() {
    track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === total - 1;
  }

  prevBtn.addEventListener('click', () => { if (index > 0) { index--; update(); } });
  nextBtn.addEventListener('click', () => { if (index < total - 1) { index++; update(); } });

  update();
})();
