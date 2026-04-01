let user = null;

// ===== MOCK DATA =====
function loadUser() {
  user = {
    name: "Lê Minh Quân",
    email: "quan@gmail.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    totalDonate: 2500000,

    joinedCampaigns: [
      { title: "Ủng hộ trẻ em", money: 500000, percent: 70, img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d" },
      { title: "Cứu trợ lũ lụt", money: 300000, percent: 50, img: "https://images.unsplash.com/photo-1469571486292-b53601020b7c" }
    ],

    createdCampaigns: [
      { title: "Xây trường học", money: 1200000, percent: 80, img: "https://images.unsplash.com/photo-1497493292307-31c376b6e479" }
    ]
  };

  renderUser();
}

// ===== RENDER USER =====
function renderUser() {
  document.getElementById("name").innerText = user.name;
  document.getElementById("email").innerText = user.email;
  document.getElementById("avatar").src = user.avatar;

  document.getElementById("totalDonate").innerText =
    user.totalDonate.toLocaleString("vi-VN") + "₫";

  document.getElementById("joined").innerText =
    user.joinedCampaigns.length;

  document.getElementById("created").innerText =
    user.createdCampaigns.length;

  renderCampaigns(user.joinedCampaigns, "joinedList");
  renderCampaigns(user.createdCampaigns, "createdList");
}

// ===== RENDER CAMPAIGN =====
function renderCampaigns(list, id) {
  const container = document.getElementById(id);
  container.innerHTML = "";

  list.forEach(c => {
    const div = document.createElement("div");
    div.className = "profile-card";

    div.innerHTML = `
      <img class="card-img" src="${c.img}">
      <div class="card-body">
        <div class="card-title">${c.title}</div>
        <small>${c.money.toLocaleString("vi-VN")}₫</small>

        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${c.percent}%"></div>
        </div>
      </div>
    `;

    // click sang trang chi tiết
    div.onclick = () => {
      window.location.href = "/campaign.html";
    };

    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", loadUser);