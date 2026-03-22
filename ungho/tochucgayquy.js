const data = [
    {
        name: "Hội chữ thập đỏ Hà Nội",
        user: "@hanoirc",
        tag: "Y tế",
        money: "28.788.538₫",
        progress: 65,
        target: "45.000.000₫",
        donate: "1.245",
        img: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
    },
    {
        name: "Quỹ học bổng Ánh Sáng",
        user: "@anhsang",
        tag: "Giáo dục",
        money: "12.450.000₫",
        progress: 40,
        target: "30.000.000₫",
        donate: "532",
        img: "https://cdn-icons-png.flaticon.com/512/201/201623.png"
    },
    {
        name: "Xanh Việt Nam",
        user: "@xanhvn",
        tag: "Môi trường",
        money: "8.900.000₫",
        progress: 25,
        target: "35.000.000₫",
        donate: "210",
        img: "https://cdn-icons-png.flaticon.com/512/427/427735.png"
    }
];

const container = document.getElementById("org-list");

container.innerHTML = data.map(item => `
    <div class="col-md-4">
        <div class="org-card h-100" data-tag="${item.tag}">
            <div class="tag">${item.tag}</div>

            <div class="org-header">
                <img src="${item.img}">
                <div>
                    <h5>${item.name}</h5>
                    <span>${item.user}</span>
                </div>
            </div>

            <div class="org-body">
                <p class="desc">Chiến dịch gây quỹ cộng đồng</p>

                <p class="money">${item.money}</p>

                <div class="progress custom-progress">
                    <div class="progress-bar" style="width: ${item.progress}%"></div>
                </div>

                <div class="meta">
                    <span>🎯 ${item.target}</span><br>
                    <span>👥 ${item.donate} lượt</span>
                </div>
            </div>

            <button class="btn-view">Ủng hộ ngay</button>
        </div>
    </div>
`).join("");
document.querySelectorAll(".org-card").forEach(card => {
    card.onclick = (e) => {
    if (e.target.closest(".btn-view")) return;
    alert("Đi tới trang chi tiết tổ chức");
};
});

let keyword = "";
let currentTag = "Tất cả";

function renderFilter() {
    document.querySelectorAll(".org-card").forEach(card => {
        const name = card.querySelector("h5").innerText.toLowerCase();
        const tag = card.dataset.tag;

        const matchSearch = name.includes(keyword);
        const matchTag = (currentTag === "Tất cả" || tag === currentTag);

        card.parentElement.style.display =
            (matchSearch && matchTag) ? "block" : "none";
    });
}

// SEARCH
let timeout;
document.querySelector(".search-inner input")
.addEventListener("input", function() {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        keyword = this.value.toLowerCase();
        renderFilter();
    }, 300);
});

// FILTER
document.querySelectorAll(".filter-bar button").forEach(btn => {
    btn.onclick = function() {
        document.querySelectorAll(".filter-bar button")
        .forEach(b => b.classList.remove("active"));

        this.classList.add("active");

        currentTag = this.innerText;
        renderFilter();
    };
});

let visible = 3;

function renderLimit() {
    let count = 0;

    document.querySelectorAll("#org-list .col-md-4")
    .forEach((card) => {
        if (card.style.display !== "none") {
            count++;
            card.style.display = count <= visible ? "block" : "none";
        }
    });
}

renderLimit();

document.querySelector(".load-more").onclick = () => {
    visible += 3;
    renderLimit();

    const total = document.querySelectorAll("#org-list .col-md-4").length;

    if (visible >= total) {
        document.querySelector(".load-more").style.display = "none";
    }
};