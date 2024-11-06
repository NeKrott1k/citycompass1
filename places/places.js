// Строка поиска

const icon = document.querySelector('.menu__icon');
const search = document.querySelector('.menu__search');
const clear = document.querySelector('.menu__clear');

icon.onclick = function() {
    search.classList.toggle('active');
};

clear.onclick = function() {
    document.getElementById('mySearch').value = '';
};

// Реализуем поиск по странице 
document.addEventListener('DOMContentLoaded', () => {
    const mySearch = document.getElementById('mySearch');
    const blocks = document.querySelectorAll('.first_screen__slide');

    mySearch.addEventListener('input', () => {
        const searchTerm = mySearch.value.toLowerCase();

        blocks.forEach(first_screen__slide => {
            if (first_screen__slide.textContent.toLowerCase().includes(searchTerm)) {
                first_screen__slide.style.display = 'block'; // Показываем блок
            } else {
                first_screen__slide.style.display = 'none'; // Скрываем блок
            }
        });
    });
});


// Slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.first_screen__slider');
    const slides = document.querySelectorAll('.first_screen__slide');
    const dots = document.querySelectorAll('.first_screen__dot');
    const prevBtn = document.querySelector('.first_screen__prev-btn');
    const nextBtn = document.querySelector('.first_screen__next-btn');

    let currentIndex = 0,
        sliderWidth;

        sliderWidth = document.querySelector('.first_screen__slider-container').offsetWidth;

    // Функция для обновления слайдера
    function updateSlider() {
        // Вычисляем смещение слайдера на основе текущего индекса
        const off_set = -currentIndex * sliderWidth;
        // Применяем смещение к слайдеру
        slider.style.transform = `translateX(${off_set}px)`;

        // Обновляем активный dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }


    // Обработчик клика на кнопку "Предыдущий"
    prevBtn.addEventListener('click', () => {
        // Уменьшаем индекс текущего слайда, если он больше 0
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Обработчик клика на кнопку "Следующий"
    nextBtn.addEventListener('click', () => {
        // Увеличиваем индекс текущего слайда, если он меньше количества слайдов минус один
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    // Обработчик клика на dot
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Устанавливаем текущий индекс на индекс выбранного dot
            currentIndex = index;
            updateSlider();
        });
    });

    // Инициализация слайдера
    updateSlider();



   
});



//  Фильтр

const filterButton = document.getElementById('filter-button');
const modal = document.getElementById('filter-modal');
const closeModal = document.getElementById('close-modal');
const applyFiltersButton = document.getElementById('apply-filters');
const resetFiltersButton = document.getElementById('reset-filters');
const contentItems = document.querySelectorAll('.first_screen__slide');

// Функция для отображения модального окна
filterButton.onclick = function() {
    modal.style.display = 'block';
    loadFilters();
}

// Функция для закрытия модального окна
closeModal.onclick = function() {
    modal.style.display = 'none';
}

// Обнаружение клика за пределами модального окна
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Загрузка выбранных фильтров из localStorage
function loadFilters() {
    const filters = JSON.parse(localStorage.getItem('filters')) || [];
    const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = filters.includes(checkbox.value);
    });
}

// Применение фильтров
applyFiltersButton.onclick = function() {
    const selectedFilters = Array.from(modal.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    localStorage.setItem('filters', JSON.stringify(selectedFilters));
    filterContent(selectedFilters);
    modal.style.display = 'none';
}

// Сброс фильтров

resetFiltersButton.onclick = function() {
    localStorage.removeItem('filters');
    filterContent([]);
    modal.style.display = 'none';
}

// Фильтрация контента
function filterContent(filters) {
    contentItems.forEach(item => {
        if (filters.length === 0 || filters.includes(item.getAttribute('data-category'))) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Вызываем фильтрацию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const filters = JSON.parse(localStorage.getItem('filters')) || [];
    filterContent(filters);
});


// Burger menu

document.addEventListener("DOMContentLoaded", function() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');

    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
    });
});