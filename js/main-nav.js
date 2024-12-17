// Function to get URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to handle button active state
function setActiveButton(buttonSelector, activeClass = "active") {
    const allButtons = document.querySelectorAll(buttonSelector);
    allButtons.forEach(btn => btn.classList.remove(activeClass));
    if (buttonSelector) {
        const button = document.querySelector(buttonSelector);
        if (button) {
            button.classList.add(activeClass);
        }
    }
}

// Function to load content based on URL parameters
function loadContentByURLParameter(pageType) {
    const category = getURLParameter("category") || defaultCategory;

    if (pageType === "gallery") {
        loadImages(category); // 加载 Gallery 页面内容
        setActiveButton(`.category-btn[data-category="${category}"]`);
    } else if (pageType === "equipment") {
        loadProducts(category); // 加载 Equipment 页面内容
        setActiveButton(`.product-nav-item[data-category="${category}"]`);
    }
}

// Add event listeners to dropdown items
const dropdownItems = document.querySelectorAll(".dropdown-item");
dropdownItems.forEach(item => {
    item.addEventListener("click", (event) => {
        const currentPage = window.location.pathname.includes("equipments.html");
        const targetHref = item.getAttribute("href");
        const category = targetHref.split("category=")[1];

        if (currentPage && targetHref.includes("equipments.html") && category) {
            // 当前是 equipments 页面，并且点击的是 Equipments 下拉项
            event.preventDefault(); // 阻止默认跳转
            history.pushState(null, "", targetHref); // 更新 URL

            // 加载对应分类的内容
            loadProducts(category);

            // 更新 subnav 按钮的 active 状态
            const subnavButtons = document.querySelectorAll(".product-nav-item");
            subnavButtons.forEach((btn) => btn.classList.remove("active"));

            const activeSubnavButton = Array.from(subnavButtons).find(
                (btn) => btn.textContent.trim() === category
            );
            if (activeSubnavButton) {
                activeSubnavButton.classList.add("active");
            }
        } else {
            // 非 equipments 页面或者点击非 Equipments 下拉项
            // 允许正常跳转
            window.location.href = targetHref;
        }
    });
});



// 页面加载时解析 URL 并加载对应内容
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage.includes("Gallery.html")) {
        loadContentByURLParameter("gallery");
    } else if (currentPage.includes("equipments.html")) {
        loadContentByURLParameter("equipment");
    }
});

