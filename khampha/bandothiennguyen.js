document.addEventListener("DOMContentLoaded", function () {

const detailName = document.getElementById("detailName");
const detailDesc = document.getElementById("detailDesc");
const detailValue = document.getElementById("detailValue");
const detailType = document.getElementById("detailType");
const detailImage = document.getElementById("detailImage");

// ===== MAP =====
var map = L.map('map', {
    zoomControl: false
}).setView([16.0, 108.0], 6);


L.control.zoom({
    position: 'topright'
}).addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO'
}).addTo(map);

// ===== LABEL BIỂN =====
const hoangSaLabel = L.tooltip({
    permanent: true,
    direction: "center",
    className: "sea-label"
})
.setLatLng([16.5, 112.0])
.setContent("Quần đảo Hoàng Sa");

const truongSaLabel = L.tooltip({
    permanent: true,
    direction: "center",
    className: "sea-label"
})
.setLatLng([10.0, 115.0])
.setContent("Quần đảo Trường Sa");

// 👉 add lần đầu
hoangSaLabel.addTo(map);
truongSaLabel.addTo(map);

// 👉 xử lý lúc load ban đầu
if (map.getZoom() < 6) {
    map.removeLayer(hoangSaLabel);
    map.removeLayer(truongSaLabel);
}

let lastZoom = map.getZoom();

map.on("moveend", function () {

    let zoom = map.getZoom();

    // 👉 nếu zoom nhỏ hơn 6 thì ẩn
    if (zoom < 6) {
        map.removeLayer(hoangSaLabel);
        map.removeLayer(truongSaLabel);
    } 
    // 👉 còn lại thì hiện
    else {
        hoangSaLabel.addTo(map);
        truongSaLabel.addTo(map);
    }

});

// ===== DATA =====
var points = [

    {
        lat: 21.0285, lng: 105.8542,
        value: 320,
        name: "Hà Nội - Cứu trợ lũ",
        type: "Thiên tai",
        desc: "Hỗ trợ người dân vùng lũ miền Bắc",
        img: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807",
        progress: 80
    },

    {
        lat: 16.0471, lng: 108.2062,
        value: 120,
        name: "Đà Nẵng - Trẻ em",
        type: "Trẻ em",
        desc: "Giúp trẻ em có hoàn cảnh khó khăn",
        img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
        progress: 55
    },

    {
        lat: 10.8231, lng: 106.6297,
        value: 450,
        name: "TP.HCM - Y tế",
        type: "Y tế",
        desc: "Gây quỹ hỗ trợ bệnh nhân nghèo",
        img: "https://images.unsplash.com/photo-1584515933487-779824d29309",
        progress: 90
    },

    {
        lat: 20.85, lng: 106.68,
        value: 80,
        name: "Hải Phòng - Hộ nghèo",
        type: "Xóa nghèo",
        desc: "Hỗ trợ các hộ gia đình khó khăn",
        img: "https://images.unsplash.com/photo-1469571486292-b53601010376",
        progress: 40
    },

    {
        lat: 21.59, lng: 105.85,
        value: 60,
        name: "Thái Nguyên - Trẻ em vùng cao",
        type: "Trẻ em",
        desc: "Giúp trẻ em vùng cao có điều kiện học tập",
        img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
        progress: 35
    },

    {
        lat: 18.67, lng: 105.68,
        value: 200,
        name: "Nghệ An - Thiên tai",
        type: "Thiên tai",
        desc: "Khắc phục hậu quả bão lũ",
        img: "https://images.unsplash.com/photo-1523978591478-c753949ff840",
        progress: 70
    },

    {
        lat: 12.25, lng: 109.19,
        value: 140,
        name: "Nha Trang - Y tế",
        type: "Y tế",
        desc: "Hỗ trợ chi phí điều trị",
        img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289",
        progress: 65
    },

    {
        lat: 10.04, lng: 105.78,
        value: 90,
        name: "Cần Thơ - Sinh kế",
        type: "Xóa nghèo",
        desc: "Hỗ trợ người dân phát triển kinh tế",
        img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        progress: 50
    },

    {
        lat: 14.35, lng: 108.0,
        value: 70,
        name: "Gia Lai - Trẻ em dân tộc",
        type: "Trẻ em",
        desc: "Hỗ trợ trẻ em dân tộc thiểu số",
        img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
        progress: 45
    },

    {
        lat: 11.56, lng: 108.14,
        value: 50,
        name: "Lâm Đồng - Hộ nghèo",
        type: "Xóa nghèo",
        desc: "Giúp đỡ các hộ nghèo vùng núi",
        img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        progress: 30
    }

];

// ===== TYPE MAP (FIX FILTER) =====
const typeMap = {
    "trẻ em": "Trẻ em",
    "xóa nghèo": "Xóa nghèo",
    "khác": "Khác"
};

// ===== ICON =====
function getColor(value) {
    if (value > 200) return "#ff2d00";
    if (value > 100) return "#ff6a00";
    return "#ff9e3d";
}

function createIcon(number) {

    let size = 30;

    if (number > 300) size = 60;
    else if (number > 150) size = 50;
    else if (number > 80) size = 40;

    return L.divIcon({
        className: "custom-marker",
        html: `<div class="marker-inner" style="
            width:${size}px;
            height:${size}px;
            background:${getColor(number)}
        ">${number}</div>`,
        iconSize: [size, size],
        iconAnchor: [size/2, size/2]
    });
}

// ===== MARKER CLUSTER =====
var markers = L.markerClusterGroup();
var group = new L.featureGroup();

// ===== RENDER MARKER (CHUẨN PRO) =====
function renderMarkers(list) {

    markers.clearLayers();
    group.clearLayers();

    list.forEach(p => {

        var marker = L.marker([p.lat, p.lng], {
            icon: createIcon(p.value)
        });

marker.on("click", () => {

    document.getElementById("detailPanel").classList.add("active");
    document.getElementById("mapOverlay").classList.add("active");

    detailName.innerText = p.name;
    detailDesc.innerText = p.desc;
    detailValue.innerText = p.value;
    detailType.innerText = p.type;
    detailImage.src = p.img;

const bar = document.querySelector(".map-progress-fill")

// clear animation cũ
bar.style.transition = "none";
bar.style.width = "0%";

// force repaint
bar.offsetHeight;

// bật lại transition
bar.style.transition = "width 0.6s ease";

const percent = p.progress;

// đổi màu
if (percent < 40) bar.style.background = "#f9f500";
else if (percent < 70) bar.style.background = "#ff8400";
else bar.style.background = "#ff3700";

// animate
bar.style.width = percent + "%";

console.log(percent);
    document.getElementById("progressText").innerText = p.progress + "% đã đạt";

    map.flyTo([p.lat, p.lng], 8, { duration: 0.8 });
});

        markers.addLayer(marker);
        group.addLayer(L.marker([p.lat, p.lng]));
    });

    map.addLayer(markers);
}

document.getElementById("mapOverlay").onclick = () => {
    document.getElementById("detailPanel").classList.remove("active");
    document.getElementById("mapOverlay").classList.remove("active");
};

document.querySelector(".close-btn").onclick = () => {
    document.getElementById("detailPanel").classList.remove("active");
    document.getElementById("mapOverlay").classList.remove("active");
};

// render lần đầu
renderMarkers(points);

// ===== SEARCH =====
let searchTimeout;

document.querySelector(".map-search-box input")
?.addEventListener("keyup", function () {

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
        let keyword = this.value.toLowerCase();

        let found = points.find(p =>
            p.name.toLowerCase().includes(keyword)
        );

        if (found) {
            map.flyTo([found.lat, found.lng], 10, {
                duration: 1.5
            });
        }
    }, 400);
});

// ===== FILTER =====
document.querySelectorAll(".map-filter span").forEach(btn => {
    btn.addEventListener("click", () => {

        // UI active
        document.querySelectorAll(".map-filter span")
            .forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        let key = btn.innerText.toLowerCase();
        let type = typeMap[key];

        let filtered = points.filter(p => !type || p.type === type);

        renderMarkers(filtered);

        // zoom theo filter
        if (filtered.length > 0) {
            let tempGroup = new L.featureGroup(
                filtered.map(p => L.marker([p.lat, p.lng]))
            );
            map.fitBounds(tempGroup.getBounds().pad(0.3));
        }
    });
});

// ===== SIDEBAR CLICK =====
document.querySelectorAll(".map-campaign-item").forEach(item => {
    item.addEventListener("click", () => {
        let lat = item.dataset.lat;
        let lng = item.dataset.lng;

        map.flyTo([lat, lng], 10, { duration: 1.5 });
    });
});

// ===== RESET MAP =====
document.querySelector(".btn-reset-map")
?.addEventListener("click", () => {
    map.fitBounds(group.getBounds().pad(0.3));

});

map.on("click", () => {
    document.getElementById("detailPanel").classList.remove("active");
    document.getElementById("mapOverlay").classList.remove("active");
});
});

