const sliderData = [
    {url:'photo/other_photo/equipments/HASSELBLAD-907X.png',color:'rgb(100, 67, 68)'},
    {url:'photo/other_photo/equipments/HASSELBLAD-X2D.png', color:'rgb(43, 35, 26)'},
    {url:'photo/other_photo/equipments/HASSELBLAD-XCD.png', color:'rgb(36, 31, 33)'},
    {url:'photo/other_photo/equipments/HASSELELAB-X2D.100C.png',color:'rgb(67,90,92)'},
    ]

// get element
const img = document.querySelector('.slider-wrapper img')
const next = document.querySelector('.next')
const footer = document.querySelector('.slider-footer')
let i = 0
// 1.next button
next.addEventListener('click', function(){
    i++
    // ensure photo circulation
    if (i >= sliderData.length) {
        i = 0
    }
    toggle()
})

// 2.prev button
const prev = document.querySelector('.prev')
prev.addEventListener('click', function(){
    i--
    // ensure photo circulation
    if (i < 0) {
        i = sliderData.length - 1
    }
    toggle()
       
})

// Declares a rendering function as a reuse
function toggle() {
    // change photo
    img.src = sliderData[i].url
    // change color
    footer.style.backgroundColor = sliderData[i].color
    // change active dots
    document.querySelector('.slider-indicator .active').classList.remove('active')
    document.querySelector(`.slider-indicator li:nth-child(${i + 1})`).classList.add('active')
}
    
// auto play
let timerId = setInterval(function(){
    // automatically use toggle button
    next.click()
}, 2000);

// stop timer when mouse passes
const slider = document.querySelector('.slider')
slider.addEventListener('mouseenter', function () {
    clearInterval(timerId)
})

// start timer when mouse leave
slider.addEventListener('mouseleave', function () {
    clearInterval(timerId)
    // start timer
    timerId = setInterval(function(){
    // automatically use toggle button
    next.click()
    }, 2000)
})



        
    