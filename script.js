/* =========================================================
   UNISEX GYM SAKTI — MAIN SCRIPT (FINAL / ERROR-FREE)
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     ⚠️ APNA WHATSAPP NUMBER YAHAN BADLEIN
     Format: Country code + Number (bina +, bina space)
     Example: "919123456789"
     ========================================================= */
  var GYM_NUMBER = "919123456789";

  /* =========================================================
     PRELOADER — GUARANTEED HIDE (no window.load dependency)
     Ye pehle atak jata tha, ab 1 second baad khud hat jayega.
     ========================================================= */
  function hidePreloader() {
    var preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hide");
      setTimeout(function () {
        preloader.style.display = "none";
      }, 600);
    }
  }

  // Hide after 1 second (guaranteed)
  setTimeout(hidePreloader, 1000);

  // Also hide on window load (whichever comes first)
  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader);
  }

  // Safety fallback — 3 second baad zabardasti hatao
  setTimeout(hidePreloader, 3000);

  /* ---------- YEAR IN FOOTER ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- STICKY HEADER + BACK TO TOP ---------- */
  var header = document.getElementById("header");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (header) {
      if (y > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }

    if (toTop) {
      if (y > 500) toTop.classList.add("show");
      else toTop.classList.remove("show");
    }

    updateActiveNav();
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- MOBILE MENU ---------- */
  var hamburger = document.getElementById("hamburger");
  var nav = document.getElementById("nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        nav.classList.remove("open");
      });
    });
  }

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  var navLinks = document.querySelectorAll(".nav-link");
  var sections = [];

  navLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.charAt(0) === "#") {
      var sec = document.querySelector(id);
      if (sec) sections.push({ link: link, section: sec });
    }
  });

  function updateActiveNav() {
    var pos = (window.scrollY || window.pageYOffset) + 130;
    var current = null;

    sections.forEach(function (item) {
      if (pos >= item.section.offsetTop) current = item.link;
    });

    if (current) {
      navLinks.forEach(function (l) {
        l.classList.remove("active");
      });
      current.classList.add("active");
    }
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- COUNTER ANIMATION ---------- */
  var counters = document.querySelectorAll(".counter");
  var counterDone = false;

  function runCounters() {
    counters.forEach(function (counter) {
      var target = parseInt(counter.getAttribute("data-target"), 10) || 0;
      var current = 0;
      var step = Math.max(1, Math.floor(target / 60));

      var timer = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = current;
      }, 25);
    });
  }

  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var counterObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !counterDone) {
              counterDone = true;
              runCounters();
              counterObserver.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );

      var heroStats = document.querySelector(".hero-stats");
      if (heroStats) counterObserver.observe(heroStats);
    } else {
      runCounters();
    }
  }

  /* ---------- BMI CALCULATOR ---------- */
  var bmiForm = document.getElementById("bmiForm");
  var bmiValue = document.getElementById("bmiValue");
  var bmiCategory = document.getElementById("bmiCategory");
  var bmiAdvice = document.getElementById("bmiAdvice");
  var bmiCircle = document.querySelector(".bmi-circle");

  if (bmiForm) {
    bmiForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var hEl = document.getElementById("height");
      var wEl = document.getElementById("weight");
      var height = parseFloat(hEl.value);
      var weight = parseFloat(wEl.value);

      if (!height || !weight || height < 80 || weight < 20) {
        bmiCategory.textContent = "Invalid input";
        bmiAdvice.textContent = "Kripya sahi height aur weight daalein.";
        bmiValue.textContent = "--";
        return;
      }

      var bmi = weight / Math.pow(height / 100, 2);
      bmi = Math.round(bmi * 10) / 10;

      bmiValue.textContent = bmi;

      var cat, advice, color;

      if (bmi < 18.5) {
        cat = "Underweight";
        advice = "Aapko weight gain plan chahiye. Protein-rich diet aur strength training best rahega.";
        color = "#3b82f6";
      } else if (bmi < 25) {
        cat = "Normal ✅";
        advice = "Great! Aap fit hain. Regular workout se ise maintain karein.";
        color = "#22c55e";
      } else if (bmi < 30) {
        cat = "Overweight";
        advice = "Cardio + strength training aur controlled diet se fat loss possible hai.";
        color = "#f59e0b";
      } else {
        cat = "Obese";
        advice = "Personal training aur proper diet plan ki zaroorat hai. Hum madad karenge.";
        color = "#ef4444";
      }

      bmiCategory.textContent = cat;
      bmiAdvice.textContent = advice;

      var deg = Math.min(360, (bmi / 40) * 360);
      if (bmiCircle) {
        bmiCircle.style.background =
          "conic-gradient(" + color + " " + deg + "deg, #222 " + deg + "deg)";
      }

      bmiValue.style.color = color;
    });
  }

  /* ---------- CONTACT FORM → WHATSAPP ---------- */
  var contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameEl = document.getElementById("name");
      var phoneEl = document.getElementById("phone");
      var goalEl = document.getElementById("goal");
      var msgEl = document.getElementById("message");

      var name = nameEl ? nameEl.value.trim() : "";
      var phone = phoneEl ? phoneEl.value.trim() : "";
      var goal = goalEl ? goalEl.value : "";
      var message = msgEl ? msgEl.value.trim() : "";

      if (!name || !phone) {
        alert("Kripya naam aur mobile number bharein.");
        return;
      }

      var text =
        "🏋️ *Unisex Gym Sakti — Free Trial Request*%0A%0A" +
        "*Naam:* " + encodeURIComponent(name) + "%0A" +
        "*Mobile:* " + encodeURIComponent(phone) + "%0A" +
        "*Goal:* " + encodeURIComponent(goal) + "%0A" +
        "*Message:* " + encodeURIComponent(message || "—");

      var url = "https://wa.me/" + GYM_NUMBER + "?text=" + text;

      window.open(url, "_blank");

      contactForm.reset();
    });
  }

  /* ---------- TESTIMONIAL SLIDER ---------- */
  var track = document.getElementById("sliderTrack");
  var dotsWrap = document.getElementById("sliderDots");

  if (track && dotsWrap) {
    var slides = track.querySelectorAll(".slide");
    var total = slides.length;
    var index = 0;
    var autoTimer;

    if (total > 0) {
      for (var i = 0; i < total; i++) {
        (function (n) {
          var dot = document.createElement("button");
          dot.setAttribute("aria-label", "Slide " + (n + 1));
          if (n === 0) dot.classList.add("active");
          dot.addEventListener("click", function () {
            goTo(n);
            resetAuto();
          });
          dotsWrap.appendChild(dot);
        })(i);
      }

      var dots = dotsWrap.querySelectorAll("button");

      var goTo = function (n) {
        index = (n + total) % total;
        track.style.transform = "translateX(-" + index * 100 + "%)";
        dots.forEach(function (d, i) {
          d.classList.toggle("active", i === index);
        });
      };

      var next = function () {
        goTo(index + 1);
      };

      var resetAuto = function () {
        clearInterval(autoTimer);
        autoTimer = setInterval(next, 5500);
      };

      resetAuto();

      var startX = 0;
      track.addEventListener(
        "touchstart",
        function (e) {
          startX = e.touches[0].clientX;
        },
        { passive: true }
      );

      track.addEventListener("touchend", function (e) {
        var diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 50) {
          if (diff < 0) goTo(index + 1);
          else goTo(index - 1);
          resetAuto();
        }
      });
    }
  }

  /* ---------- GALLERY LIGHTBOX ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  var galleryItems = document.querySelectorAll(".g-item");

  if (lightbox && lbImg && galleryItems.length) {
    galleryItems.forEach(function (img) {
      img.addEventListener("click", function () {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });

    var closeLightbox = function () {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    };

    if (lbClose) lbClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
      }
    });
  }

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top =
          target.getBoundingClientRect().top +
          (window.scrollY || window.pageYOffset) -
          offset;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });
})();      ke liye motivate kare. <strong>Unisex Gym Sakti</strong> — jahan results bolte hain.
    </p>

    <div class="hero-btns reveal">
      <!-- ✅ NUMBER CHANGED: WhatsApp -->
      <a href="https://wa.me/919123456789?text=Hi%20Unisex%20Gym%20Sakti%2C%20mujhe%20admission%20ke%20baare%20mein%20jaankari%20chahiye."
         target="_blank" rel="noopener" class="btn btn-primary">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.6-.9-2.2-.2-.6-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.8 2.9 4.4 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>
        Free Trial Book Karein
      </a>
      <a href="#pricing" class="btn btn-ghost">Membership Dekhein</a>
    </div>

    <div class="hero-stats reveal">
      <div class="stat">
        <h3><span class="counter" data-target="500">0</span>+</h3>
        <p>Happy Members</p>
      </div>
      <div class="stat">
        <h3><span class="counter" data-target="12">0</span>+</h3>
        <p>Expert Trainers</p>
      </div>
      <div class="stat">
        <h3><span class="counter" data-target="60">0</span>+</h3>
        <p>Modern Machines</p>
      </div>
      <div class="stat">
        <h3><span class="counter" data-target="7">0</span>+</h3>
        <p>Years Experience</p>
      </div>
    </div>
  </div>

  <a href="#about" class="scroll-down" aria-label="Scroll down">
    <span></span>
  </a>
</section>

<!-- ================= MARQUEE STRIP ================= -->
<div class="strip">
  <div class="strip-track">
    <span>STRENGTH</span><i>✦</i><span>CARDIO</span><i>✦</i>
    <span>CROSSFIT</span><i>✦</i><span>ZUMBA</span><i>✦</i>
    <span>WEIGHT LOSS</span><i>✦</i><span>BODY BUILDING</span><i>✦</i>
    <span>STRENGTH</span><i>✦</i><span>CARDIO</span><i>✦</i>
    <span>CROSSFIT</span><i>✦</i><span>ZUMBA</span><i>✦</i>
    <span>WEIGHT LOSS</span><i>✦</i><span>BODY BUILDING</span><i>✦</i>
  </div>
</div>

<!-- ================= ABOUT ================= -->
<section class="section" id="about">
  <div class="container grid-2">

    <div class="about-imgs reveal">
      <img class="img-main"
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80"
        alt="Unisex Gym Sakti training floor" loading="lazy" />
      <img class="img-small"
        src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80"
        alt="Members working out" loading="lazy" />
      <div class="exp-badge">
        <strong>7+</strong>
        <span>Years of<br>Excellence</span>
      </div>
    </div>

    <div class="about-text reveal">
      <span class="eyebrow">About Us</span>
      <h2 class="section-title">Sakti Ka Sabse <span class="grad-text">Bharosemand</span> Gym</h2>
      <p>
        <strong>Unisex Gym Sakti</strong> sirf ek gym nahi — ek family hai. Hum 2018 se
        Sakti, Chhattisgarh ke logon ko fit, strong aur confident banane ka kaam kar rahe hain.
        Hamara gym <strong>100% unisex</strong> hai — ladies aur gents dono ke liye
        comfortable, safe aur hygienic environment.
      </p>
      <p>
        Yahan aapko milega imported cardio machines, heavy-weight strength zone,
        functional training area, aur certified trainers jo aapki body ke hisaab se
        personalised workout + diet plan banate hain.
      </p>

      <ul class="check-list">
        <li>✅ Separate Ladies Timing &amp; Changing Room</li>
        <li>✅ Certified &amp; Experienced Trainers</li>
        <li>✅ Free Diet &amp; Body Composition Plan</li>
        <li>✅ AC Hall + Power Backup + Parking</li>
        <li>✅ Hygienic, Sanitized &amp; Safe Environment</li>
      </ul>

      <a href="#contact" class="btn btn-primary">Aaj Hi Visit Karein</a>
    </div>

  </div>
</section>

<!-- ================= PROGRAMS ================= -->
<section class="section section-alt" id="programs">
  <div class="container">

    <div class="section-head reveal">
      <span class="eyebrow">Our Programs</span>
      <h2 class="section-title">Aapke Har Goal Ke Liye <span class="grad-text">Ek Plan</span></h2>
      <p class="section-sub">Weight loss ho, muscle gain ho ya sirf fit rehna — humare paas har level ka program hai.</p>
    </div>

    <div class="cards-grid">

      <article class="card reveal">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6.5 6.5v11M3.5 9v5M17.5 6.5v11M20.5 9v5M6.5 12h11"/></svg>
        </div>
        <h3>Strength &amp; Weight Training</h3>
        <p>Heavy iron zone, free weights, squat racks aur plate-loaded machines ke saath real strength banao.</p>
      </article>

      <article class="card reveal">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <h3>Cardio &amp; Fat Loss</h3>
        <p>Treadmill, cross-trainer, spin bike aur HIIT sessions se tezi se fat burn karein.</p>
      </article>

      <article class="card reveal">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg>
        </div>
        <h3>CrossFit &amp; Functional</h3>
        <p>Kettlebell, battle rope, plyo box aur bodyweight workouts se overall fitness upgrade karein.</p>
      </article>

      <article class="card reveal">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </div>
        <h3>Zumba &amp; Aerobics</h3>
        <p>Music ke saath full-body workout — mazedaar, energetic aur ladies-friendly batches.</p>
      </article>

      <article class="card reveal">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
        </div>
        <h3>Personal Training</h3>
        <p>1-on-1 dedicated trainer, custom workout chart aur weekly progress tracking ke saath.</p>
      </article>

      <article class="card reveal">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 3v18h18"/><path d="M18 8l-5 5-3-3-4 4"/></svg>
        </div>
        <h3>Diet &amp; Nutrition</h3>
        <p>Indian home-food based diet plan — bina extra kharch, bina bhookhe rahe, results paayein.</p>
      </article>

    </div>
  </div>
</section>

<!-- ================= WHY US ================= -->
<section class="section" id="why">
  <div class="container grid-2 reverse">

    <div class="why-text reveal">
      <span class="eyebrow">Why Choose Us</span>
      <h2 class="section-title">Kyun Log Humein <span class="grad-text">Trust</span> Karte Hain</h2>

      <div class="why-item">
        <span class="why-num">01</span>
        <div>
          <h4>Unisex &amp; Safe Environment</h4>
          <p>Ladies ke liye alag timing, CCTV surveillance aur female staff support.</p>
        </div>
      </div>

      <div class="why-item">
        <span class="why-num">02</span>
        <div>
          <h4>Modern Imported Equipment</h4>
          <p>Har 6 mahine mein naye machines aur regular maintenance.</p>
        </div>
      </div>

      <div class="why-item">
        <span class="why-num">03</span>
        <div>
          <h4>Affordable Membership</h4>
          <p>Sakti ke sabse competitive rates — koi hidden charge nahi.</p>
        </div>
      </div>

      <div class="why-item">
        <span class="why-num">04</span>
        <div>
          <h4>Result Guarantee</h4>
          <p>90 din mein visible transformation — warna extra 1 month FREE.</p>
        </div>
      </div>
    </div>

    <div class="why-img reveal">
      <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80"
           alt="Modern gym equipment at Unisex Gym Sakti" loading="lazy" />
    </div>

  </div>
</section>

<!-- ================= PRICING ================= -->
<section class="section section-alt" id="pricing">
  <div class="container">

    <div class="section-head reveal">
      <span class="eyebrow">Membership</span>
      <h2 class="section-title">Simple <span class="grad-text">Pricing</span>, No Hidden Charges</h2>
      <p class="section-sub">Koi bhi plan choose karein — admission fee ₹500 (one time) sabhi plans mein.</p>
    </div>

    <div class="pricing-grid">

      <div class="price-card reveal">
        <h3>Monthly</h3>
        <div class="price">₹800<span>/month</span></div>
        <ul>
          <li>✅ Full Gym Access</li>
          <li>✅ Cardio + Strength Zone</li>
          <li>✅ Basic Workout Chart</li>
          <li>✅ Locker Facility</li>
        </ul>
        <!-- ✅ NUMBER CHANGED -->
        <a href="https://wa.me/919123456789?text=Hi%2C%20mujhe%20Monthly%20plan%20lena%20hai." target="_blank" rel="noopener" class="btn btn-ghost full">Join Now</a>
      </div>

      <div class="price-card popular reveal">
        <span class="ribbon">Most Popular</span>
        <h3>Quarterly</h3>
        <div class="price">₹1999<span>/3 months</span></div>
        <ul>
          <li>✅ Sab kuch Monthly plan ka</li>
          <li>✅ FREE Diet Plan</li>
          <li>✅ Monthly Body Measurement</li>
          <li>✅ Zumba / Aerobics Included</li>
          <li>✅ 1 Personal Training Session FREE</li>
        </ul>
        <!-- ✅ NUMBER CHANGED -->
        <a href="https://wa.me/919123456789?text=Hi%2C%20mujhe%20Quarterly%20plan%20lena%20hai." target="_blank" rel="noopener" class="btn btn-primary full">Join Now</a>
      </div>

      <div class="price-card reveal">
        <h3>Yearly</h3>
        <div class="price">₹5999<span>/year</span></div>
        <ul>
          <li>✅ Sab kuch Quarterly plan ka</li>
          <li>✅ 2 Months Absolutely FREE</li>
          <li>✅ Unlimited Personal Training</li>
          <li>✅ Supplement Guidance</li>
          <li>✅ Priority Support</li>
        </ul>
        <!-- ✅ NUMBER CHANGED -->
        <a href="https://wa.me/919123456789?text=Hi%2C%20mujhe%20Yearly%20plan%20lena%20hai." target="_blank" rel="noopener" class="btn btn-ghost full">Join Now</a>
      </div>

    </div>
  </div>
</section>

<!-- ================= BMI CALCULATOR ================= -->
<section class="section" id="bmi">
  <div class="container bmi-wrap">

    <div class="bmi-info reveal">
      <span class="eyebrow">Free Tool</span>
      <h2 class="section-title">Apna <span class="grad-text">BMI</span> Check Karein</h2>
      <p>BMI (Body Mass Index) se pata chalta hai aapka weight aapki height ke hisaab se
         sahi hai ya nahi. Result ke hisaab se hum aapko best workout plan suggest karenge.</p>

      <form class="bmi-form" id="bmiForm">
        <div class="field">
          <label for="height">Height (cm)</label>
          <input type="number" id="height" placeholder="e.g. 170" min="80" max="250" required />
        </div>
        <div class="field">
          <label for="weight">Weight (kg)</label>
          <input type="number" id="weight" placeholder="e.g. 70" min="20" max="300" required />
        </div>
        <button type="submit" class="btn btn-primary full">Calculate BMI</button>
      </form>
    </div>

    <div class="bmi-result reveal" id="bmiResult">
      <div class="bmi-circle">
        <span id="bmiValue">--</span>
        <small>BMI</small>
      </div>
      <h3 id="bmiCategory">Enter your details</h3>
      <p id="bmiAdvice">Height aur weight daal kar button dabayein.</p>
      <!-- ✅ NUMBER CHANGED -->
      <a href="https://wa.me/919123456789?text=Hi%2C%20mujhe%20apne%20BMI%20ke%20hisab%20se%20workout%20plan%20chahiye."
         target="_blank" rel="noopener" class="btn btn-ghost">Free Plan Ke Liye WhatsApp Karein</a>
    </div>

  </div>
</section>

<!-- ================= GALLERY ================= -->
<section class="section section-alt" id="gallery">
  <div class="container">

    <div class="section-head reveal">
      <span class="eyebrow">Our Gallery</span>
      <h2 class="section-title">Andar Ki Ek <span class="grad-text">Jhalak</span></h2>
      <p class="section-sub">Real photos, real machines, real results — Unisex Gym Sakti.</p>
    </div>

    <div class="gallery">
      <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" alt="Gym floor" loading="lazy" class="g-item">
      <img src="https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=800&q=80" alt="Dumbbell rack" loading="lazy" class="g-item">
      <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80" alt="Treadmill zone" loading="lazy" class="g-item">
      <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80" alt="Strength training" loading="lazy" class="g-item">
      <img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80" alt="Ladies fitness" loading="lazy" class="g-item">
      <img src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=800&q=80" alt="CrossFit area" loading="lazy" class="g-item">
      <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80" alt="Personal training" loading="lazy" class="g-item">
      <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80" alt="Workout session" loading="lazy" class="g-item">
    </div>

  </div>
</section>

<!-- ================= TRAINERS ================= -->
<section class="section" id="trainers">
  <div class="container">

    <div class="section-head reveal">
      <span class="eyebrow">Our Team</span>
      <h2 class="section-title">Meet Your <span class="grad-text">Trainers</span></h2>
      <p class="section-sub">Certified, experienced aur friendly — jo aapke sapno ki body banane mein madad karenge.</p>
    </div>

    <div class="trainers-grid">

      <div class="trainer reveal">
        <div class="trainer-img">
          <img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=700&q=80" alt="Head Trainer" loading="lazy">
        </div>
        <h3>Rahul Verma</h3>
        <p class="role">Head Trainer — Strength &amp; Bodybuilding</p>
        <p class="exp">8+ years experience · Certified Personal Trainer</p>
      </div>

      <div class="trainer reveal">
        <div class="trainer-img">
          <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80" alt="Ladies Fitness Coach" loading="lazy">
        </div>
        <h3>Priya Sharma</h3>
        <p class="role">Ladies Fitness &amp; Zumba Coach</p>
        <p class="ex
