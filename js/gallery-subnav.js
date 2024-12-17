const imageData = {
    People: [
        "photo/gallery_photo/people/img1.jpg" ,
        "photo/gallery_photo/people/img2.jpg" ,
        "photo/gallery_photo/people/img3.jpg" ,
        "photo/gallery_photo/people/img4.jpg" ,
        "photo/gallery_photo/people/img5.jpg" ,
        "photo/gallery_photo/people/img6.jpg" ,
        "photo/gallery_photo/people/img7.jpg" ,
        "photo/gallery_photo/people/img8.jpg" ,
        "photo/gallery_photo/people/img9.jpg" ,
        "photo/gallery_photo/people/img10.jpg",
        "photo/gallery_photo/people/img11.jpg",
        "photo/gallery_photo/people/img12.jpg",
        "photo/gallery_photo/people/img13.jpg",
        "photo/gallery_photo/people/img14.jpg",
        "photo/gallery_photo/people/img15.jpg",
        "photo/gallery_photo/people/img16.jpg",
        "photo/gallery_photo/people/img17.jpg",
        "photo/gallery_photo/people/img18.jpg",
        "photo/gallery_photo/people/img19.jpg",
        "photo/gallery_photo/people/img20.jpg",
        "photo/gallery_photo/people/img21.jpg",
        "photo/gallery_photo/people/img22.jpg",
        "photo/gallery_photo/people/img23.jpg",
        "photo/gallery_photo/people/img24.jpg",
        "photo/gallery_photo/people/img25.jpg",
        "photo/gallery_photo/people/img26.jpg",
        "photo/gallery_photo/people/img27.jpg",
    ],
    Environment: [
        "photo/gallery_photo/environment/img1.jpg" ,
        "photo/gallery_photo/environment/img2.jpg" ,
        "photo/gallery_photo/environment/img3.jpg" ,
        "photo/gallery_photo/environment/img4.jpg" ,
        "photo/gallery_photo/environment/img5.jpg" ,
        "photo/gallery_photo/environment/img6.jpg" ,
        "photo/gallery_photo/environment/img7.jpg" ,
        "photo/gallery_photo/environment/img8.jpg" ,
        "photo/gallery_photo/environment/img9.jpg" ,
        "photo/gallery_photo/environment/img10.jpg" ,
        "photo/gallery_photo/environment/img11.jpg" ,
        "photo/gallery_photo/environment/img12.jpg" ,
        "photo/gallery_photo/environment/img13.jpg" ,
        "photo/gallery_photo/environment/img14.jpg" ,
        "photo/gallery_photo/environment/img15.jpg" ,
        "photo/gallery_photo/environment/img16.jpg" ,
        "photo/gallery_photo/environment/img17.jpg" ,
        "photo/gallery_photo/environment/img18.jpg" ,
        "photo/gallery_photo/environment/img19.jpg" ,
        "photo/gallery_photo/environment/img20.jpg" ,
        "photo/gallery_photo/environment/img21.jpg" ,
        "photo/gallery_photo/environment/img22.jpg" ,
        "photo/gallery_photo/environment/img23.jpg" ,
        "photo/gallery_photo/environment/img24.jpg" ,
        "photo/gallery_photo/environment/img25.jpg" ,

    ],
    Other: [
        "photo/gallery_photo/other/img1.jpg" ,
        "photo/gallery_photo/other/img2.jpg" ,
        "photo/gallery_photo/other/img3.jpg" ,
        "photo/gallery_photo/other/img4.jpg" ,
        "photo/gallery_photo/other/img5.jpg" ,
        "photo/gallery_photo/other/img6.jpg" ,
        "photo/gallery_photo/other/img7.jpg" ,
        "photo/gallery_photo/other/img8.jpg" ,
        "photo/gallery_photo/other/img9.jpg" ,
        "photo/gallery_photo/other/img10.jpg",
        "photo/gallery_photo/other/img11.jpg",
        "photo/gallery_photo/other/img12.jpg",
        "photo/gallery_photo/other/img13.jpg",
        "photo/gallery_photo/other/img14.jpg",
        "photo/gallery_photo/other/img15.jpg",
        "photo/gallery_photo/other/img16.jpg",
        "photo/gallery_photo/other/img17.jpg",
        "photo/gallery_photo/other/img18.jpg",
        "photo/gallery_photo/other/img19.jpg",
        "photo/gallery_photo/other/img20.jpg",
        "photo/gallery_photo/other/img21.jpg",
        "photo/gallery_photo/other/img22.jpg",
        "photo/gallery_photo/other/img23.jpg",
        "photo/gallery_photo/other/img24.jpg",
        "photo/gallery_photo/other/img25.jpg",
        "photo/gallery_photo/other/img26.jpg",
    ],
}

const categoryButtons = document.querySelectorAll(".category-btn");
const container = document.querySelector(".container");
const defaultCategory = "People"; // 默认分类

// 加载图片的函数
function loadImages(category) {
    container.innerHTML = ""; // 清空已有图片

    if (imageData[category]) {
        imageData[category].forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `${category} photo`;

            img.classList.add("draggable-image"); // 使图片可拖动
            img.setAttribute("draggable", "true");
            container.appendChild(img);
        });
    } else {
        container.innerHTML = "<p>No images available for this category.</p>";
    }

    // 重新绑定拖拽事件
    addDragAndDropHandlers();
}

// 设置活动按钮的样式
function setActiveButton(activeButton) {
    categoryButtons.forEach(button => button.classList.remove("active")); // 清除所有按钮的活动样式
    if (activeButton) {
        activeButton.classList.add("active"); // 为当前按钮添加活动样式
    }
}

// 点击分类按钮事件
categoryButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const category = button.getAttribute("data-category");
        loadImages(category);
        setActiveButton(button); // 设置当前按钮为 active
        history.pushState(null, "", `Gallery.html?category=${category}`); // 更新 URL
    });
});

// 页面加载时默认加载分类
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get("category") || defaultCategory; // 获取 URL 中的 category 参数

    loadImages(categoryFromUrl); // 加载图片

    // 设置默认按钮为 active
    const defaultButton = document.querySelector(`.category-btn[data-category="${categoryFromUrl}"]`);
    setActiveButton(defaultButton);
});
