// Function to get URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Load images based on category
function loadImagesByURLParameter() {
    const category = getURLParameter("category") || defaultCategory; // 获取分类参数，默认为 People
    loadImages(category); // 调用已有的加载函数
    const defaultButton = document.querySelector(`[data-category="${category}"]`);
    if (defaultButton) {
        setActiveButton(defaultButton); // 设置按钮为激活状态
    }
}

// 页面加载时解析参数并加载对应内容
document.addEventListener("DOMContentLoaded", () => {
    loadImagesByURLParameter(); // 根据 URL 参数加载内容
});
