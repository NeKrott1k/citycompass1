// MockApi
document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  let totalPages = 6;
  let data = [];

  const attractionsContainer = document.getElementById('attractions');
  const paginationContainer = document.getElementById('pagination')
  const loader = document.getElementById('loader');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const searchInput = document.getElementById('mySearch');

  const fetchData = async (category = '') => {
    showLoader();
    try {
      const response = await fetch('https://67319f907aaf2a9aff113edb.mockapi.io/attraction')
      data = await response.json();
      totalPages = data.length
      renderSlides(data);
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      hideLoader();
    }
  };


  // Показать лоадер
  function showLoader() {
    loader.classList.add("active")
  }

  // Прятать лоадер
  function hideLoader() {
    loader.classList.remove("active")
  }



  const renderSlides  = (filteredData) => {
    attractionsContainer.innerHTML = '';
    paginationContainer.innerHTML = '';

    filteredData.forEach((attraction, index) => {
      const attractionElement = document.createElement('div');
      attractionElement.classList.add('first_screen__slide');
      attractionElement.innerHTML = `
       <img src="${attraction.imageURL}" alt="${attraction.name}">
      <div class="first_screen__info">
        <h2>${attraction.name}</h2>
        <div class="first_screen__info-button">
          <button id="btn" class="first_screen__info-btn">Подробнее</button>
          <img src="./img/Arrow.svg" alt="arrow">
        </div>
      </div>`;
      attractionElement.querySelector('.first_screen__info-button').addEventListener('click', () => {
        showLoader();
        showModal(attraction);
        setTimeout(hideLoader, 500);
      });
      attractionsContainer.appendChild(attractionElement)


      const paginationElement = document.createElement('div')
      paginationElement.classList.add('first_screen__dot')
      paginationElement.textContent = index + 1
      paginationElement.addEventListener('click', () => {
        showLoader();
        goToPage(index + 1);
        setTimeout(hideLoader, 500);
      });
      paginationContainer.appendChild(paginationElement)
    });
    if (attractionsContainer.children.length > 0) {
      attractionsContainer.children[0].classList.add('active');
      paginationContainer.children[0].classList.add('active');
    }
  
  };


  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    // Удаляем активные классы с текущего слайда и пагинации
    attractionsContainer.children[currentPage - 1].classList.remove('active')
    paginationContainer.children[currentPage - 1].classList.remove('active')

    // добавляем активные классы
    attractionsContainer.children[page - 1].classList.add('active')
    paginationContainer.children[page - 1].classList.add('active')

    currentPage = page
  }

  prevButton.addEventListener('click', () => {
    showLoader();
    goToPage(currentPage - 1);
    setTimeout(hideLoader, 500);
  });


  nextButton.addEventListener('click', () => {
    showLoader();
    goToPage(currentPage + 1);
    setTimeout(hideLoader, 500);
  });


  searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm))
      totalPages = filteredData.length
      renderSlides(filteredData)
  });


  document.querySelector('.first_screen__search-input').addEventListener('input', () => {
    const searchTerm = document.querySelector('.first_screen__search-input').value.toLowerCase();
    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm))
    totalPages = filteredData.length
    renderSlides(filteredData)
});

  fetchData();




//  Фильтр
const filterButton = document.getElementById('filter-button');
const modal_filter = document.getElementById('filter-modal');
const closeModal = document.getElementById('close-modal');
const applyFiltersButton = document.getElementById('apply-filters');
const resetFiltersButton = document.getElementById('reset-filters');
const API_URL = 'https://67319f907aaf2a9aff113edb.mockapi.io/attraction'


// Показать лоадер
function showLoader() {
  loader.classList.add("active")
}

// Убрать лоадер
function hideLoader() {
  loader.classList.remove("active")
}



// Функция для отображения модального окна
filterButton.addEventListener('click', () => {
    modal_filter.classList.toggle('active');
    // loadFilters();
});


// Функция для отображения модального окна (for phones)
document.querySelector('.first_screen__filter-button').addEventListener('click', () => {
  document.querySelector('.first_screen__modal').classList.toggle('active');
  // loadFilters();
});



// Функция для закрытия модального окна
closeModal.addEventListener('click', () => {
    modal_filter.classList.toggle('active');
});


// Функция для закрытия модального окна (for phones)
document.querySelector('.first_screen__close').addEventListener('click', () => {
  document.querySelector('.first_screen__modal').classList.toggle('active');
});



// Обнаружение клика за пределами модального окна
window.addEventListener("click", (event) => {
    if (event.target === document.querySelector('.first_screen__modal')) {
        document.querySelector('.first_screen__modal').classList.toggle('active');
    }
});
     

// Обнаружение клика за пределами модального окна (for phones)
window.addEventListener("click", (event) => {
  if (event.target === modal_filter) {
      modal_filter.classList.toggle('active');
  }
});





// Применение фильтров
applyFiltersButton.addEventListener('click', function() {
  const selectedFilters = Array.from(modal_filter.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
  fetchFilteredAttractions(selectedFilters);
  modal_filter.classList.toggle('active');
})



// Применение фильтров (for phones)
document.querySelector('.first_screen__filter-btn-apply').addEventListener('click', function() {
  const selectedFilters = Array.from(document.querySelector('.first_screen__modal').querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
  fetchFilteredAttractions(selectedFilters);
  document.querySelector('.first_screen__modal').classList.toggle('active');
})



// Сброс фильтров
resetFiltersButton.addEventListener("click", () => {
  fetchFilteredAttractions([]);
  modal_filter.classList.toggle('active');
})


// Сброс фильтров (for phones)
document.querySelector('.first_screen__filter-btn-reset').addEventListener("click", () => {
  fetchFilteredAttractions([]);
  document.querySelector('.first_screen__modal').classList.toggle('active');
})




// Фильтрация контента
function fetchFilteredAttractions(filters) {
  showLoader();
  let url = `${API_URL}`;

  if (filters.length > 0) {
      url += `?category=${filters.join('&category=')}`;
  }

  fetch(url)
      .then(response => response.json())
      .then(data => {
          renderSlides(data);
          hideLoader();
      })
      .catch(error => {
          console.error('Error fetching attractions:', error);
          hideLoader();
      });


}
fetchFilteredAttractions([]);


// Строка поиска (для красивой анимации)
const icon = document.getElementById('search-icon');
const search = document.getElementById('search-div');
const seacrhInp = document.getElementById('mySearch')
const clear = document.getElementById('search-clear');

    // отображение анимации поиска
    icon.addEventListener('click', function() {
        search.classList.toggle('active');
    });

    // отображение анимации поиска (for phones)
    document.querySelector('.first_screen__icon').addEventListener('click', function() {
      document.querySelector('.first_screen__search').classList.toggle('active');
    });

    // очистка инпута 
    clear.addEventListener('click', function() {
      seacrhInp.value = '';
      totalPages = data.length
      renderSlides(data);
    });

    // очистка инпута (for phones)  
    document.querySelector('.first_screen__clear').addEventListener('click', function() {
      document.querySelector('.first_screen__search-input').value = '';
      totalPages = data.length
      renderSlides(data);
    });

});


// Модальное окно достопримечательности
const modal_place = document.getElementById('modal');
const modalDetails = document.getElementById('modal-details');
const closeBtn = document.querySelector('.modal__close');

    // Функция для получения данных с сервера
    async function fetchAttractions1() {
        const response = await fetch('https://67319f907aaf2a9aff113edb.mockapi.io/attraction');
        const data = await response.json();
        return data;
    }


// Отображение модального окна с подробным описанием достопримечательности
function showModal(attraction) {
  modalDetails.innerHTML = `
      <h2>${attraction.name}</h2>
    <div class=modal__text-content>
      <p class="modal__desc-text">${attraction.description}</p>

      <div class=modal__location>
        <img class="modal__loc-img" src="./img/img-loc.svg">
        <p class="modal__loc-text">${attraction.location}</p>
      </div>
    
    </div>
      <div id="photos">
          <img class="modal__place-img" src="${attraction.image_for_page1}" alt="${attraction.name}">
          <img class="modal__place-img" src="${attraction.image_for_page2}" alt="${attraction.name}">
      </div>
      <img class="modal__place-img1" src="${attraction.image_for_page3}" alt="${attraction.name}">
      <div id="map">
        ${attraction.map_iframe}
      </div>
  `;

  modal_place.style.display = 'block';

  // Добавление query параметра в URL
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('attraction', attraction.id);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
}


 // Закрытие модального окна
function closeModalPlace () {
  modal_place.style.display = 'none'
}

// обработчик на кнопку закрытия (крестик)
closeBtn.addEventListener('click', closeModalPlace);
window.addEventListener('click', (event) => {
  if (event.target === modal_place) {
      closeModalPlace();
  }
});


// Проверка query параметра при загрузке страницы
function checkQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const attractionId = urlParams.get('attraction');
  if (attractionId) {
      fetchAttractions1().then(attractions => {
          const attraction = attractions.find(a => a.id === attractionId);
          if (attraction) {
              showModal(attraction);
          }
      });
  }
}


// Burger menu
document.addEventListener("DOMContentLoaded", function() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');

    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
    });
});
