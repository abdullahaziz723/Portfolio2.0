  function scrollToProjects() {
  const section = document.getElementById("projects");
  section.scrollIntoView({ behavior: "smooth" });
}




// <!-- Initialize Swiper -->

  var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


// <!-- ========================= AOS INIT (Required for About Section) ========================= -->


  AOS.init({
    duration: 1100,
    once: true,
    easing: "ease-out-cubic"
  });


// <!-- ========================= Mouse Follow Glow (Premium Cards) ========================= -->

  document.querySelectorAll(".premium-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    });
  });


// <!-- ========================= Theme Toggle Handler ========================= -->

(() => {
  const THEME_KEY = "theme";
  const htmlEl = document.documentElement;

  const toggleBtn = document.getElementById("themeToggleBtn");
  const sunIcon = document.querySelector(".feather-sun");
  const moonIcon = document.querySelector(".feather-moon");

  const metaThemeColor = document.getElementById("meta-theme-color");

  function applyTheme(isDark) {
    if (isDark) {
      htmlEl.classList.add("dark");
      sunIcon && sunIcon.classList.add("hidden");
      moonIcon && moonIcon.classList.remove("hidden");
      metaThemeColor && metaThemeColor.setAttribute("content", "#0f0f11");
    } else {
      htmlEl.classList.remove("dark");
      sunIcon && sunIcon.classList.remove("hidden");
      moonIcon && moonIcon.classList.add("hidden");
      metaThemeColor && metaThemeColor.setAttribute("content", "#ffffff");
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark") applyTheme(true);
    else if (saved === "light") applyTheme(false);
    else applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  function toggleTheme() {
    const newDark = !htmlEl.classList.contains("dark");
    applyTheme(newDark);
    localStorage.setItem(THEME_KEY, newDark ? "dark" : "light");
  }

  initTheme();
  toggleBtn && toggleBtn.addEventListener("click", toggleTheme);

  // If user didn’t choose, follow OS
  const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  if (mq && !localStorage.getItem(THEME_KEY)) {
    mq.addEventListener("change", e => applyTheme(e.matches));
  }
})();


// <!-- ========================= Modal Script (unchanged) ========================= -->

  const openBtn = document.getElementById("openAbout");
  const closeBtn = document.getElementById("closeAbout");
  const modal = document.getElementById("aboutModal");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      }
    });
  }


// <!-- ========================= Tech Filter Active State ========================= -->
  
const buttons = document.querySelectorAll(".tech-filter");

  buttons.forEach(btn =>
    btn.addEventListener("click", () => {
      document.querySelector(".tech-filter.active")?.classList.remove("active");
      btn.classList.add("active");
    })
  );









// <!-- ========================= Tech Card Mouse Move Effect ========================= -->
document.querySelectorAll(".tech-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", x + "%");
    card.style.setProperty("--my", y + "%");
  });
});



  function scrollToProjects() {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }