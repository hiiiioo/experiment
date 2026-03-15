fetch("/layout/header.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;
  });

fetch("/layout/footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

// =======================
// Campaign Slider
// =======================

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector("#campaignSlider");

  if (slider) {
    new bootstrap.Carousel(slider, {
      interval: 4000,
      ride: "carousel",
    });
  }
});

// =======================
// Scroll Category
// =======================

function scrollCat(value) {
  const category = document.getElementById("categoryList");

  if (category) {
    category.scrollBy({
      left: value,
      behavior: "smooth",
    });
  }
}

// ===== COUNT WHEN SCROLL =====

const counters = document.querySelectorAll(".count");
let started = false;

function startCount() {
  if (started) return;
  started = true;

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");

    let current = 0;

    const update = () => {
      const increment = target / 500;

      if (current < target) {
        current += increment;
        counter.innerText = Math.ceil(current).toLocaleString("vi-VN");
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString("vi-VN");
      }
    };

    update();
  });
}

// observer

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      startCount();
    }
  });
});

const targets = document.querySelectorAll(".animate");

targets.forEach((el) => {
  observer.observe(el);
});

