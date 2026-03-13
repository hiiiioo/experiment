function donate(project) {
alert("Cảm ơn bạn đã ủng hộ dự án: " + project);
}

function scrollProject() {
document.getElementById("projects").scrollIntoView({
behavior: "smooth",
});
}

document.addEventListener("DOMContentLoaded", function () {

const moreBtn = document.getElementById("showMore");
const collapseBtn = document.getElementById("collapse");

const tabs = document.querySelectorAll(".tab");
const campaigns = document.querySelectorAll(".campaign");

const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchCampaign");
const resetBtn = document.getElementById("resetFilter");

/* =========================
CHỈ HIỆN 9 CHIẾN DỊCH ĐẦU
========================== */

campaigns.forEach((card, index) => {
if (index >= 9) {
card.classList.add("extra", "d-none");
}
});

/* =======================
XEM THÊM / THU GỌN
======================= */

if (moreBtn) {

```
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
    behavior: "smooth"
  });

};
```

}

/* =======================
TAB FILTER (ORG / PERSON)
======================= */

tabs.forEach(tab => {

```
tab.addEventListener("click", function () {

  tabs.forEach(t => t.classList.remove("active"));
  this.classList.add("active");

  let filter = this.dataset.filter;

  campaigns.forEach(card => {

    if (filter === "all") {
      card.style.display = "block";
    }
    else if (card.classList.contains(filter)) {
      card.style.display = "block";
    }
    else {
      card.style.display = "none";
    }

  });

  if (filter === "all") {
    moreBtn.classList.remove("d-none");
  } else {
    moreBtn.classList.add("d-none");
    collapseBtn.classList.add("d-none");
  }

});
```

});

/* =====================
FILTER STATUS + SEARCH
===================== */

function filterCampaigns(){

```
let status = statusFilter.value;
let keyword = searchInput.value.toLowerCase();

campaigns.forEach(card=>{

  let title = card.querySelector("h6").innerText.toLowerCase();

  let matchStatus = status === "all" || card.classList.contains(status);
  let matchSearch = title.includes(keyword);

  if(matchStatus && matchSearch){
    card.style.display = "block";
  }else{
    card.style.display = "none";
  }

});
```

}

statusFilter.addEventListener("change", filterCampaigns);
searchInput.addEventListener("keyup", filterCampaigns);

/* =====================
RESET FILTER
===================== */

resetBtn.addEventListener("click", () => {

```
statusFilter.value = "all";
searchInput.value = "";

campaigns.forEach(card => {
  card.style.display = "block";
});
```

});

});
