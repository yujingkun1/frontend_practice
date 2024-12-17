// 为图片添加拖拽事件处理程序
function addDragAndDropHandlers() {
    const images = document.querySelectorAll(".draggable-image");

    images.forEach((img) => {
        img.addEventListener("dragstart", handleDragStart);
        img.addEventListener("dragover", handleDragOver);
        img.addEventListener("drop", handleDrop);
        img.addEventListener("dragend", handleDragEnd);
    });
}

let draggedImage = null; // 保存当前拖拽的图片

function handleDragStart(event) {
    draggedImage = event.target; // 保存拖拽的图片
    event.dataTransfer.effectAllowed = "move";
    event.target.classList.add("dragging");
}

function handleDragOver(event) {
    event.preventDefault(); // 阻止默认行为

    const target = event.target;

    // 确保拖拽目标是正确的图片元素
    if (target && target !== draggedImage && target.classList.contains("draggable-image")) {
        const rect = target.getBoundingClientRect();
        const middleY = rect.top + rect.height / 2;

        if (event.clientY < middleY) {
            target.parentNode.insertBefore(draggedImage, target); // 拖拽到目标图片之前
        } else {
            target.parentNode.insertBefore(draggedImage, target.nextSibling); // 拖拽到目标图片之后
        }
    }
}

function handleDrop(event) {
    event.preventDefault(); // 阻止浏览器默认行为
    event.stopPropagation(); // 阻止事件冒泡
}

function handleDragEnd(event) {
    event.target.classList.remove("dragging");
    draggedImage = null; // 清空拖拽状态

    // 在此可以添加额外的恢复或清理操作，确保拖拽后的元素状态恢复
}
