const modalBg = document.querySelector('.modal');
const submit = document.querySelector('.modal__btn');
const input = document.getElementById('inpField')


document.getElementById("open-modal-btn").addEventListener("click", function () {
    document.getElementById("my-modal").classList.add("open")
})

document.getElementById("close-my-modal-btn").addEventListener("click", function () {
    document.getElementById("my-modal").classList.remove("open")
    document.getElementById('errorMessage').style.display = 'none'
})

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if(e.target === modalBg) { // Если цель клика - фот, то:
        document.getElementById("my-modal").classList.remove("open")
        document.getElementById('errorMessage').style.display = 'none'
    }
});


submit.addEventListener('click', (event) => {
    event.preventDefault();

    if(input.value.trim() === '') {
        document.getElementById('errorMessage').style.display = 'block'
    } else {
        alert('Спасибо за завяку, в течении 2-х часов с вами свяжется менеджер')
        document.getElementById('errorMessage').style.display = 'none'
        document.getElementById("my-modal").classList.remove("open")
    }
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