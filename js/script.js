let currentStatus = "all";
let currentCategory = "all";
let campaigns = [];

/* ================= DONATE ================= */

function donate(project) {
  alert("Cảm ơn bạn đã ủng hộ dự án: " + project);
}

/* ================= SCROLL ================= */

function scrollProject() {
  document.getElementById("projects").scrollIntoView({
    behavior: "smooth",
  });
}

/* ================= MAIN ================= */

document.addEventListener("DOMContentLoaded", function () {
  const moreBtn = document.getElementById("showMore");
  const collapseBtn = document.getElementById("collapse");

  const tabs = document.querySelectorAll(".tab");
  campaigns = document.querySelectorAll(".campaign");

  const statusFilter = document.getElementById("statusFilter");
  const resetBtn = document.getElementById("resetFilter");
const globalSearch = document.getElementById("globalSearch");

if (globalSearch) {
  globalSearch.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();

      let keyword = this.value.toLowerCase().trim();

      // ===== DANH SÁCH TỪ KHÓA =====
      const orgKeywords = [
        "tổ chức", "to chuc",
        "hội", "quỹ", "foundation", "group"
      ];

      const personKeywords = [
        "cá nhân", "ca nhan",
        "anh", "chị", "em"
      ];

      // ===== KIỂM TRA =====
      const isOrg = orgKeywords.some(k => keyword.includes(k));
      const isPerson = personKeywords.some(k => keyword.includes(k));

      if (isOrg) {
        window.location.href = "ungho/to_chuc_gay_quy.html";
      }
      else if (isPerson) {
        window.location.href = "ungho/ca_nhan_gay_quy.html";
      }
      else {
        alert("Không xác định được 😢 (thử gõ 'tổ chức' hoặc 'cá nhân')");
      }
    }
  });
}

  const categoryBtn = document.getElementById("categoryBtn");
  const categoryMenu = document.getElementById("categoryMenu");

  const mainImg = document.querySelector(".campaign-main-img");
  const rows = document.querySelectorAll(".donor-row");

  /* =======================
ADVANCED FILTER
======================= */

  const advancedBtn = document.getElementById("advancedBtn");
  const advancedFilter = document.getElementById("advancedFilter");

  const applyAdvanced = document.getElementById("applyAdvanced");
  const resetAdvanced = document.getElementById("resetAdvanced");

  const amountFilter = document.getElementById("amountFilter");
  const dateFrom = document.getElementById("dateFrom");
  const dateTo = document.getElementById("dateTo");

  if (applyAdvanced) {
    applyAdvanced.onclick = function () {
      let amount = amountFilter.value;
      let from = dateFrom.value;
      let to = dateTo.value;

      rows.forEach((row) => {
        let moneyText = row.children[1].innerText.replace(/[^\d]/g, "");
        let money = parseInt(moneyText);

        let dateText = row.children[2].innerText.split(" ")[0];

        let parts = dateText.split("/");
        let day = parseInt(parts[0]);
        let month = parseInt(parts[1]) - 1;
        let year = parseInt(parts[2]);

        let date = new Date(year, month, day);

        let show = true;

        /* lọc theo tiền */

        if (amount === "50000") {
          if (money >= 50000) show = false;
        }

        if (amount === "100000") {
          if (money < 50000 || money > 100000) show = false;
        }

        if (amount === "200000") {
          if (money < 100000 || money > 200000) show = false;
        }

        if (amount === "500000") {
          if (money <= 200000) show = false;
        }

        /* lọc theo ngày */

        if (from) {
          let f = new Date(from);
          let fromDate = new Date(f.getFullYear(), f.getMonth(), f.getDate());

          if (date < fromDate) show = false;
        }

        if (to) {
          let t = new Date(to);
          let toDate = new Date(t.getFullYear(), t.getMonth(), t.getDate());

          if (date > toDate) show = false;
        }

        row.dataset.hidden = show ? "false" : "true";
      });

      currentPage = 1;
      showPage(currentPage);

      advancedFilter.classList.add("d-none");
    };
  }

  if (advancedBtn) {
    advancedBtn.onclick = function () {
      advancedFilter.classList.toggle("d-none");
    };
  }

  if (resetAdvanced) {
    resetAdvanced.onclick = function () {
      amountFilter.value = "all";
      dateFrom.value = "";
      dateTo.value = "";

      rows.forEach((row) => {
        row.style.display = "";
      });

      currentPage = 1;
      showPage(currentPage);
    };
  }

  /* =======================
SEARCH DONOR
======================= */

  const donorSearch = document.getElementById("searchDonor");
  const donorRows = document.querySelectorAll(".donor-row");

  if (donorSearch) {
    donorSearch.addEventListener("keyup", function () {
      let keyword = this.value.toLowerCase();

      rows.forEach((row) => {
        let name = row.children[0].innerText.toLowerCase();

        row.style.display = name.includes(keyword) ? "" : "none";
      });

      currentPage = 1;
      showPage(currentPage);
    });
  }

  /* =======================
DONOR PAGINATION
======================= */

  const rowsPerPage = 5;
  let currentPage = 1;

  const pageInfo = document.getElementById("pageInfo");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  function showPage(page) {
    let filteredRows = Array.from(rows).filter(
      (row) => row.dataset.hidden !== "true",
    );

    let start = (page - 1) * rowsPerPage;
    let end = start + rowsPerPage;

    rows.forEach((row) => (row.style.display = "none"));

    filteredRows.slice(start, end).forEach((row) => {
      row.style.display = "";
    });

    let total = Math.ceil(filteredRows.length / rowsPerPage);

    pageInfo.innerText = page + " / " + total;

    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === total;
  }

  if (rows.length) {
    showPage(currentPage);

    prevBtn.onclick = function () {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    };

    nextBtn.onclick = function () {
      let filteredRows = Array.from(rows).filter(
        (row) => row.dataset.hidden !== "true",
      );
      let totalPages = Math.ceil(filteredRows.length / rowsPerPage);

      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      }
    };
  }

  /* =======================
  XEM THÊM / THU GỌN
  ======================= */

  if (moreBtn) {
    moreBtn.onclick = function () {
      document.querySelectorAll(".extra").forEach((e) => {
        e.classList.remove("d-none");
      });

      moreBtn.classList.add("d-none");
      collapseBtn.classList.remove("d-none");
    };

    collapseBtn.onclick = function () {
      document.querySelectorAll(".extra").forEach((e) => {
        e.classList.add("d-none");
      });

      collapseBtn.classList.add("d-none");
      moreBtn.classList.remove("d-none");

      document.querySelector(".container").scrollIntoView({
        behavior: "smooth",
      });
    };
  }

  /* =======================
  TAB FILTER
  ======================= */
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      let filter = this.dataset.filter;

      // thêm dòng này
      currentCategory = filter;

      applyFilter();

      if (filter === "all") {
        if (moreBtn) moreBtn.classList.remove("d-none");
      } else {
        if (moreBtn) moreBtn.classList.add("d-none");
        if (collapseBtn) collapseBtn.classList.add("d-none");
      }
    });
  });

  /* =======================
  STATUS FILTER
  ======================= */

  if (statusFilter) {
    statusFilter.addEventListener("change", function () {
      currentStatus = this.value;
      applyFilter();
    });
  }

  /* =======================
  SEARCH
  ======================= */

  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      applyFilter();
    });
  }

  /* =======================
  RESET FILTER
  ======================= */
  if (resetBtn) {
    resetBtn.onclick = function () {
      currentStatus = "all";
      currentCategory = "all";

      if (searchInput) searchInput.value = "";
      if (statusFilter) statusFilter.value = "all";

      tabs.forEach((t) => t.classList.remove("active"));
      document.querySelector('[data-filter="all"]').classList.add("active");

      if (categoryBtn) {
        categoryBtn.firstChild.textContent = "Danh mục ";
      }

      applyFilter();
    };
  }

  /* =======================
  GALLERY IMAGE
  ======================= */

  if (mainImg) {
    document.querySelectorAll(".campaign-gallery img").forEach((img) => {
      img.addEventListener("click", function () {
        mainImg.src = this.src;

        document
          .querySelectorAll(".campaign-gallery img")
          .forEach((i) => i.classList.remove("active"));

        this.classList.add("active");
      });
    });
  }

  /* =======================
CATEGORY FILTER
======================= */

  if (categoryBtn) {
    categoryBtn.onclick = function () {
      categoryMenu.classList.toggle("d-none");
    };

    document.querySelectorAll(".category-menu-item").forEach((item) => {
      item.onclick = function () {
        currentCategory = this.dataset.filter || "all";

        // lấy text thôi
        let text = this.querySelector("span").innerText;

        // chỉ thay text, giữ icon
        categoryBtn.firstChild.textContent = text + " ";

        applyFilter();

        categoryMenu.classList.add("d-none");
      };
    });
  }

  /* ================= APPLY FILTER ================= */
  function applyFilter() {
    const keyword = searchInput ? searchInput.value.toLowerCase() : "";

    campaigns.forEach((card) => {
      let matchStatus = true;
      let matchCategory = true;
      let matchSearch = true;

      if (currentStatus !== "all") {
        matchStatus = card.classList.contains(currentStatus);
      }

      if (currentCategory !== "all") {
        matchCategory = card.classList.contains(currentCategory);
      }

      if (keyword !== "") {
        const title = card.querySelector("h6").innerText.toLowerCase();
        matchSearch = title.includes(keyword);
      }

      if (matchStatus && matchCategory && matchSearch) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }
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
