// Исходные данные по слайдеру
const sliderImages = document.querySelectorAll('.slider__img'),
    sliderLine = document.querySelector('.slider__line'),
    sliderDots = document.querySelectorAll('.slider__dot'),
    sliderBtnNext = document.querySelector('.slider__btn-next'),
    sliderBtnPrev = document.querySelector('.slider__btn-prev');

// Переменные
let sliderCount = 0,
    sliderWidth;

// Адаптивность слайдера
window.addEventListener('resize', showSlide);


// Кнопки листания слайдов вперед и назад
sliderBtnNext.addEventListener('click', nextSlide);
sliderBtnPrev.addEventListener('click', prevSlide);


// Автоматичское листание слайдов
// setInterval(() => {
//     nextSlide()
// }, 3000);


// Функции
// Задает нужную ширину картинке 
function showSlide() {
    sliderWidth = document.querySelector('.slider').offsetWidth;
    sliderLine.style.width = sliderWidth * sliderImages.length + 'px';
    sliderImages.forEach(item => item.style.width = sliderWidth + 'px');

    rollSlider();
}
showSlide();

//Перелистывает слайд вперед
function nextSlide() {
    sliderCount++;
    if (sliderCount >= sliderImages.length) sliderCount = 0;

    rollSlider ();
    thisSlide(sliderCount);
}

// Перелистывает слайд назад
function prevSlide() {
    sliderCount--;
    if (sliderCount < 0) sliderCount = sliderImages.length -1;

    rollSlider();
    thisSlide(sliderCount);
}

//Задает шаг перемещения слайдов
function rollSlider() {
    sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

//Указывает какой слайд по счету активен
function thisSlide(index) {
    sliderDots.forEach(item => item.classicList.remove('active-dot'));
    sliderDots[index].classList.add('active-dot');

}

//Вешает клик на dots

sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sliderCount = index;
        rollSlider();
        thisSlide(sliderCount);
    })

})

// Burger menu

document.addEventListener("DOMContentLoaded", function() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');

    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
    });
});