// 获取 URL 参数
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 设置按钮的 active 状态
function setActiveButton(activeButton) {
    // 获取同一组内的所有按钮，清除它们的 'active' 类
    const allButtons = document.querySelectorAll(".category-btn");
    allButtons.forEach(btn => btn.classList.remove("active"));

    // 为当前按钮添加 'active' 类
    if (activeButton) {
        activeButton.classList.add("active");
    }
}

// 加载内容并设置按钮状态
function loadContentByURLParameter(pageType) {
    const defaultCategory = "People"
    const category = getURLParameter("category") || defaultCategory;

    if (pageType === "gallery") {
        loadImages(category); // 加载 Gallery 页面内容

        // 获取对应分类的按钮并设置为 active
        const activeButton = document.querySelector(`.category-btn[data-category="${category}"]`);
        setActiveButton(activeButton);
    } else if (pageType === "equipment") {
        loadProducts(category); // 加载 Equipment 页面内容

        // 获取对应分类的按钮并设置为 active
        const activeButton = document.querySelector(`.product-nav-item[data-category="${category}"]`);
        setActiveButton(activeButton);
    }
}

// 监听主导航栏的点击事件
function setupDropdownNavigation() {
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(item => {
        item.addEventListener("click", (event) => {
            const targetHref = item.getAttribute("href");
            const category = new URL(targetHref, window.location.origin).searchParams.get("category");

            if (category) {
                const activeButton = document.querySelector(`.category-btn[data-category="${category}"]`);
                setActiveButton(activeButton);
            }
        });
    });
}

// 页面加载完成时初始化逻辑
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.includes("Gallery.html")
        ? "gallery"
        : window.location.pathname.includes("equipments.html")
        ? "equipment"
        : null;

    if (currentPage) {
        loadContentByURLParameter(currentPage);
    }

    setupDropdownNavigation();
});
