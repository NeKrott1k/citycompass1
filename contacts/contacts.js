let modalBg = document.querySelector('.modal');


document.getElementById("open-modal-btn").addEventListener("click", function () {
    document.getElementById("my-modal").classList.add("open")
})

document.getElementById("close-my-modal-btn").addEventListener("click", function () {
    document.getElementById("my-modal").classList.remove("open")
})

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if(e.target === modalBg) { // Если цель клика - фот, то:
        document.getElementById("my-modal").classList.remove("open")
    }
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