// 获取 DOM 元素
const navItems = document.querySelectorAll(".product-nav-item");
const sectionTitleEntry = document.querySelector(".entry-title");
const sectionTitleFlagship = document.querySelector(".flagship-title");
const productContainer = document.querySelector(".product-section .container");
const mainNavItems = document.querySelectorAll(".nav-item .nav-link"); // 大导航栏的链接

// 定义不同分类的数据
const productsData = {
  Cameras: {
    titles: { entryLevel: "Entry-Level Products", flagship: "Flagship Products" },
    entryLevel: [
      { name: "Canon R100", price: "$519.00", image: "photo/other_photo/equipments/CanonR100.png" },
      { name: "Nikon Z30", price: "$655.00", image: "photo/other_photo/equipments/NikonZ30.png" },
      { name: "Sony A6300", price: "$421.00", image: "photo/other_photo/equipments/SonyA6300.png" },
      { name: "Fujifilm XT30", price: "$1023.00", image: "photo/other_photo/equipments/FujiXT30.png" },
    ],
    flagship: [
      { name: "Canon R5", price: "$3369.00", image: "photo/other_photo/equipments/CanonR5.png" },
      { name: "LEICA SL3", price: "$6379.00", image: "photo/other_photo/equipments/LEICA-SL3.png" },
      { name: "Sony A93", price: "$6317.00", image: "photo/other_photo/equipments/SonyA93.png" },
      { name: "Nikon Z9", price: "$4589.00", image: "photo/other_photo/equipments/NikonZ9.png" },
    ],
  },
  Lenses: {
    titles: { entryLevel: "Telephoto length", flagship: "Wide angle lens" },
    entryLevel: [
      { name: "Nikon 200-500mm", price: "$603.00", image: "photo/other_photo/equipments/Nikon200-500mm.png" },
      { name: "Sigma 150-600mm", price: "$553.00", image: "photo/other_photo/equipments/Sigma150-600mm.png" },
      { name: "Fujifilm 70-300mm", price: "$771.00", image: "photo/other_photo/equipments/Fuji70-300mm.png" },
      { name: "Canon 70-300mm", price: "$1023.00", image: "photo/other_photo/equipments/Canon70-300.png" },
    ],
    flagship: [
      { name: "Fujifilm 16-55mm", price: "$1121.00", image: "photo/other_photo/equipments/Fuji16-55mm.png" },
      { name: "Sony 10-18mm", price: "$209.00", image: "photo/other_photo/equipments/Sony10-18mm.png" },
      { name: "Sigma 15mm F1.4", price: "$406.00", image: "photo/other_photo/equipments/Sigma15mmF1.4.png" },
      { name: "Sony 16-35mm Gmaster", price: "$840.00", image: "photo/other_photo/equipments/Sony16-35mm.png" },
    ],
  },
  Accessories: {
    titles: { entryLevel: "Essential accessories", flagship: "Premium accessories" },
    entryLevel: [
      { name: "Difun GT422C tripod", price: "$51.00", image: "photo/other_photo/equipments/Difun-GT422C-tripod.png" },
      { name: "DJI RS3 stabilizer", price: "$457.00", image: "photo/other_photo/equipments/DJI-RS3-stabilizer.png" },
      { name: "Godox V860 flash", price: "$124.00", image: "photo/other_photo/equipments/GodoxV860-flash.png" },
      { name: "Godox IVMS2 microphone", price: "$33.00", image: "photo/other_photo/equipments/IVM-S2-microphone.png" },
    ],
    flagship: [],
  },
};

// Function to get URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 加载产品内容
function loadProducts(category) {
    const data = productsData[category];
    if (!data) return;

    // 清空产品内容区域，但保留标题元素
    const existingRows = productContainer.querySelectorAll(".row");
    existingRows.forEach((row) => row.remove());

    // 更新标题文本
    sectionTitleEntry.textContent = data.titles.entryLevel;
    sectionTitleFlagship.textContent = data.titles.flagship;

    // 渲染 Entry-Level 产品
    const entryRow = document.createElement("div");
    entryRow.className = "row gx-4";
    data.entryLevel.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-md-3 mb-4";
        col.innerHTML = `
            <div class="card product-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <p class="product-name card-title">${product.name}</p>
                    <p class="product-price card-text">${product.price}</p>
                </div>
            </div>
        `;
        entryRow.appendChild(col);
    });

    // 将 Entry-Level 产品插入到标题后
    productContainer.insertBefore(entryRow, sectionTitleFlagship);

    // 仅渲染 Flagship 产品，如果有数据
    if (data.flagship.length > 0) {
        const flagshipRow = document.createElement("div");
        flagshipRow.className = "row gx-4";
        data.flagship.forEach((product) => {
            const col = document.createElement("div");
            col.className = "col-md-3 mb-4";
            col.innerHTML = `
                <div class="card product-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <p class="product-name card-title">${product.name}</p>
                        <p class="product-price card-text">${product.price}</p>
                    </div>
                </div>
            `;
            flagshipRow.appendChild(col);
        });

        // 将 Flagship 产品插入到 Flagship 标题后
        productContainer.appendChild(flagshipRow);
    } else {
        // 如果没有 Flagship 产品，移除标题
        sectionTitleFlagship.style.display = 'none';
    }
}

// 页内导航点击事件
navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();

        // 获取分类名称
        const category = item.textContent.trim();

        // 切换激活状态
        navItems.forEach((nav) => nav.classList.remove("active"));
        item.classList.add("active");

        // 加载对应内容
        loadProducts(category);
    });
});

// 页面加载时根据 URL 参数加载内容
document.addEventListener("DOMContentLoaded", () => {
    const category = getURLParameter("category") || "Cameras"; // 获取 URL 中的分类参数
    loadProducts(category);

    // 设置对应分类按钮为激活状态
    navItems.forEach((nav) => nav.classList.remove("active"));
    const activeNav = Array.from(navItems).find(nav => nav.textContent.trim() === category);
    if (activeNav) {
        activeNav.classList.add("active");
    }
});