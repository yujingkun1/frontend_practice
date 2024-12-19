// 拖拽上传相关逻辑
const uploadArea = document.querySelector(".upload-area");
const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");
const submitButton = document.getElementById("submitButton");
const imgContainer = document.querySelector(".container");

let uploadedImageSrc = null; // 用于存储上传图片的路径

// 拖拽上传功能
uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault(); // 阻止浏览器默认行为（如打开文件）
    e.stopPropagation(); // 阻止事件进一步传播
    uploadArea.classList.add("hover");
});

uploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault(); // 阻止默认行为
    e.stopPropagation();
    uploadArea.classList.remove("hover");
});

uploadArea.addEventListener("drop", (e) => {
    e.preventDefault(); // 阻止浏览器打开文件
    e.stopPropagation();
    uploadArea.classList.remove("hover");

    const file = e.dataTransfer.files[0];
    handleFile(file); // 处理文件
});

// 点击上传区域触发文件选择
uploadArea.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    handleFile(file);
});

// 处理文件函数
function handleFile(file) {
    // 支持的文件类型
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    // 检查文件类型是否符合要求
    if (file && allowedFileTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImageSrc = e.target.result; // 保存图片数据
            previewImage.src = uploadedImageSrc; // 显示预览
            previewImage.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid image file (JPG, PNG, GIF, or WebP).");
    }
}


// 提交图片
submitButton.addEventListener("click", () => {
    if (uploadedImageSrc) {
        const img = document.createElement("img");
        img.src = uploadedImageSrc;
        img.alt = "Uploaded photo";
        imgContainer.appendChild(img); // 添加到瀑布流

        // 重置预览和文件输入
        previewImage.style.display = "none";
        previewImage.src = "";
        uploadedImageSrc = null;
        fileInput.value = "";
    } else {
        alert("Please upload an image first.");
    }
});
