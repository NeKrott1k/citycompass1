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
    // sliderImages.forEach(item => item.style.height = '1140px');
    rollSlider();
}
showSlide();

//Перелистывает слайд вперед
function nextSlide() {
    sliderCount++;
    if (sliderCount >= sliderImages.length) sliderCount = 0;

    rollSlider ();
    // thisSlide(sliderCount);
}

// Перелистывает слайд назад
function prevSlide() {
    sliderCount--;
    if (sliderCount < 0) sliderCount = sliderImages.length -1;

    rollSlider();
    // thisSlide(sliderCount);
}

//Задает шаг перемещения слайдов
function rollSlider() {
    sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}


//Вешает клик на dots

sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sliderCount = index;
        rollSlider();
        // thisSlide(sliderCount);
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


// calendar

const events = {
    1: "Новый год",
    7: "Рождество",
    14: "День святого Валентина",
    22: "Международный день водных ресурсов"
};

let currentDate = new Date();
const monthLabel = document.getElementById('monthLabel');
const daysContainer = document.getElementById('daysContainer');
const bubble = document.getElementById('bubble');

function renderCalendar() {
    daysContainer.innerHTML = '';
    monthLabel.innerText = currentDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Добавляем пустые ячейки для дней до первого дня месяца
    for (let i = 1; i < firstDay.getDay(); i++) {
        daysContainer.innerHTML += '<div class="day"></div>';
    }

    // Добавляем дни месяца
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement('div');
        day.classList.add('calend__day');
        day.innerText = i;

        day.addEventListener('click', function () {
            if (day.classList.contains('enlarged')) {
                day.classList.remove('enlarged');
                day.querySelector('.event-details').style.display = 'none';
            } else {
                day.classList.add('enlarged');
                const details = day.querySelector('.event-details') || createEventDetails(day, i);
                details.style.display = 'block';
            }
        });

    day.innerHTML += '<div class="event-details">' + (events[i] || '') + '</div>';
    daysContainer.appendChild(day);
    }
}

    function createEventDetails(day, date) {
    const events = document.createElement('div');
    events.classList.add('event-details');
    document.querySelector('.calend__day').textContent = '';
    events.innerText = events[date] || '';
    day.appendChild(events);
    return events;
    }

    function changeMonth(increment) {
    currentDate.setMonth(currentDate.getMonth() + increment);
    renderCalendar();
    }

const prevButton = document.createElement('button');
prevButton.classList.add('calend__button')
prevButton.innerText = '<';
prevButton.onclick = () => changeMonth(-1);

const nextButton = document.createElement('button');
nextButton.classList.add('calend__button')
nextButton.innerText = '>';
nextButton.onclick = () => changeMonth(1);

document.querySelector('.calend__btns').append(prevButton);
document.querySelector('.calend__btns').append(nextButton);

renderCalendar();
