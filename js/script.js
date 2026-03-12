function donate(project) {
alert("Cảm ơn bạn đã ủng hộ dự án: " + project);
}

function scrollProject() {
document.getElementById("projects").scrollIntoView({
behavior: "smooth",
});
}

document.addEventListener("DOMContentLoaded", function () {

let moreBtn = document.getElementById("showMore");
let collapseBtn = document.getElementById("collapse");

const tabs = document.querySelectorAll(".tab");
const campaigns = document.querySelectorAll(".campaign");

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
    behavior: "smooth"
  });

};

}

/* =======================
TAB FILTER
======================= */

tabs.forEach(tab => {

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
  card.classList.remove("d-none"); 
}
    else {
      card.style.display = "none";
    }

  });

  /* chỉ tab Tất cả mới có nút */
  if (filter === "all") {
    moreBtn.classList.remove("d-none");
  } else {
    moreBtn.classList.add("d-none");
    collapseBtn.classList.add("d-none");
  }

});

});

});
