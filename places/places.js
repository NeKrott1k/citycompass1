






















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





// Burger menu
document.addEventListener("DOMContentLoaded", function() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');

    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
    });
});
