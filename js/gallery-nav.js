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

// get elements
const categoryButtons = document.querySelectorAll(".category-btn");
const container = document.querySelector(".container");
const defaultCategory = "People"

// Function to load images dynamically
function loadImages(category) {
    // Clear existing images
    container.innerHTML = "";

    // Load new images
    if (imageData[category]) {
        imageData[category].forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `${category} photo`;

            // Set photo to be draggable
            img.classList.add("draggable-image");
            img.setAttribute("draggable", "true");
            container.appendChild(img);
        });

        addDragAndDropHandlers();
    } else {
        container.innerHTML = "<p>No images available for this category.</p>";
    }
}

// Function to handle button active state
function setActiveButton(button) {
    // Remove 'active' class from all buttons
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    // Add 'active' class to the clicked button
    button.classList.add("active");
}

// Add event listeners to category buttons
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        loadImages(category);
        setActiveButton(button);
    });
});

// Load the default category on page load
document.addEventListener("DOMContentLoaded", () => {
    const initialImages = imageData[defaultCategory];

    if (initialImages) {
        initialImages.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `${defaultCategory} photo`;

            // Let the initial image to be dragged
            img.classList.add("draggable-image");
            img.setAttribute("draggable", "true");
            container.appendChild(img);
        });

        addDragAndDropHandlers()
    }

    const defaultButton = document.querySelector(`[data-category="${defaultCategory}"]`);
    if (defaultButton) {
        setActiveButton(defaultButton);
    }
});






// Let photo to be draggable
function addDragAndDropHandlers() {
    const images = document.querySelectorAll(".draggable-image");

    images.forEach(img => {
        img.addEventListener("dragstart", handleDragStart);
        img.addEventListener("dragover", handleDragOver);
        img.addEventListener("drop", handleDrop);
        img.addEventListener("dragend", handleDragEnd);
    });
}

let draggedImage = null;

function handleDragStart(event) {
    draggedImage = event.target; // 保存当前拖拽的图片
    event.dataTransfer.effectAllowed = "move";
    event.target.classList.add("dragging");
}

function handleDragOver(event) {
    event.preventDefault(); // 阻止浏览器默认行为（如打开图片）
    const target = event.target;

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
}

