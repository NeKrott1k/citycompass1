document.addEventListener('DOMContentLoaded', () => {
  const category_sort = document.getElementById('category-sort')
  const cards_container = document.getElementById('cards-container')
  const current_page_span = document.getElementById('current-page')
  const prev_page_button = document.getElementById('prev-page')
  const next_page_button = document.getElementById('next-page')
  const search_input = document.getElementById('mySearch')
  const category_filter = document.getElementById('category-filter')
  const loader = document.getElementById('loader')
  const show_more_btn = document.getElementById('show-more')

  let current_page = 1
  let items_per_page = 8
  const base_url = 'https://67319f907aaf2a9aff113edb.mockapi.io/attraction'
  let is_pagination_used = false


// Забирает данные с mockapi
  class data_loader {
    constructor(base_url, items_per_page) {
      this.base_url = base_url, 
      this.items_per_page = items_per_page
    }

    async load_data(page, search, category, sort_by) {
      this.show_loader()
      try {
        let url = `${this.base_url}?page=${page}&limit=${this.items_per_page}`
        if (search) url += `&search=${search}`
        if (category) url += `&search=${category}`
        if (sort_by) url += `&sortBy=${sort_by}`

        const response = await fetch(url)
        const data = await response.json()
        return Array.isArray(data) ? data : [data]
      } catch (error) {
        console.error('Ошибка получения данных', error);
        
      } finally {
        setTimeout(() => {
          this.hide_loader()
        }, 700);
      }
    }


    hide_loader() {
      loader.classList.remove('active')
    }

    show_loader() {
      loader.classList.add('active')
    }
 }

 const Data_loader = new data_loader(base_url, items_per_page, sort_by = '')
 Data_loader.load_data(current_page).then(data => {
  setTimeout(() => {
    display_cards(data)
  }, 800);
 })

  function display_cards(data) {
    if (is_pagination_used) {
      cards_container.innerHTML= ''
    }
    data.forEach((attraction) => {
      const card = document.createElement('div')
      card.classList.add('first_screen__card')
      card.innerHTML = `
      <img class="first_screen__cards-img" src="${attraction.imageURL}" alt="${attraction.name_place}">
      <div class="first_screen__info">
        <h2 class="first_screen__card-title">${attraction.name_place}</h2>
        <div class="first_screen__info-button">
          <button id="btn" class="first_screen__info-btn">Подробнее</button>
          <img src="./img/Arrow.svg" alt="arrow">
        </div>
      </div>
      `
      card.querySelector('.first_screen__info-btn').addEventListener('click', () => {
        Data_loader.show_loader()
        show_modal(attraction.id)
        display_reviews(localStorage.getItem('attraction_id'))
        setTimeout(() => {
          Data_loader.hide_loader()
        }, 700);
      })
      cards_container.appendChild(card)

      // const pagination_element = document.createElement('div')
      // pagination_element.classList.add('first_screen__dot')
      // pagination_element.textContent = index + 1
      // pagination_element.addEventListener('click', () => {
      //   is_pagination_used = true
      //   current_page_span.textContent = current_page
      //   load_data(current_page, search_input.value, category_filter.value).then(data => {
      //     display_cards(data)
      //     update_pagination(current_page)
      //   })
      // })
      // dot_container.appendChild(pagination_element)
    })
 }

 function update_pagination(current_page) {
  current_page.textContent = current_page
  prev_page_button.disabled = current_page === 1
 }

 show_more_btn.addEventListener('click', () => {
  current_page++
  is_pagination_used = false
  current_page_span.textContent = current_page
  Data_loader.load_data(current_page, search_input.value, category_filter.value).then(data => {
    if (data.length > 0) {
      setTimeout(() => {
        display_cards(data)
      }, 800);
    } else {
      show_more_btn.style.display = 'none'
    }
  })
 })

 next_page_button.addEventListener('click', () => {
    current_page++
    is_pagination_used = true
    current_page_span.textContent = current_page
    Data_loader.load_data(current_page, search_input.value, category_filter.value).then(data => {
      setTimeout(() => {
        display_cards(data)
      }, 800);
      update_pagination(current_page)
    })

 })
 

 prev_page_button.addEventListener('click', () => {
  if (current_page > 1) {
    current_page--
    is_pagination_used = true
    current_page_span.textContent = current_page
    Data_loader.load_data(current_page, search_input.value, category_filter.value).then(data => {
      setTimeout(() => {
        display_cards(data)
      }, 800);
      update_pagination(current_page)
    })
  }
 })

 category_filter.addEventListener('change', () => {
  current_page = 1
  is_pagination_used = true
  Data_loader.load_data(current_page, search_input.value, category_filter.value).then(data => {
    setTimeout(() => {
      display_cards(data)
    }, 800);
    update_pagination(current_page)
  }) 
 })


 
 search_input.addEventListener('change', () => {
  current_page = 1
  is_pagination_used = true
  Data_loader.load_data(current_page, search_input.value, category_filter.value, 'name_place').then(data => {
    setTimeout(() => {
      display_cards(data)
    }, 800);
    update_pagination(current_page)
  }) 
 })

 
 category_sort.addEventListener('click', () => {
  current_page = 1
  is_pagination_used = true
  category_sort.classList.add('active')
  Data_loader.load_data(current_page, search_input.value, category_filter.value, 'name_place').then(data => {
    setTimeout(() => {
      display_cards(data)
    }, 800);
    update_pagination(current_page)
  }) 
 })

 // Модал(Очка)
 const modal = document.getElementById('modal')
 const modal_close = document.querySelector('.modal__close')
 const modal_details = document.getElementById('modal-details')


async function fetch_attractions_modal(id) {
  const response = await fetch(`https://67319f907aaf2a9aff113edb.mockapi.io/attraction/${id}`)
  const data = await response.json()
  return data
}

function show_modal(id) {
  fetch_attractions_modal(id).then(attraction => {
    modal_details.innerHTML = `
    <h2>${attraction.name_place}</h2>
  <div class=modal__text-content>
    <p class="modal__desc-text">${attraction.description}</p>

    <div class=modal__location>
      <img class="modal__loc-img" src="img/img-loc.svg">
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
    `
    modal.classList.add('active') 
    localStorage.setItem('attraction_id', id)
  })

  const url = new URL(window.location.origin + `/places/places.html/attraction/${id}`)
  window.history.pushState({}, document.title, url)
}

modal_close.addEventListener('click', () => {
  modal.style.display = 'none'
  const url = new URL(window.location.origin + '/places/places.html')
  window.history.pushState({}, '', url)

  // localStorage.removeItem('attraction_id')
})

// Галлерея
const gallery = document.getElementById('gallery-modal')
const gallery_imgs = document.getElementById('image-gallery')
const gallery_prev = document.getElementById('gallery-prev')
const gallery_next = document.getElementById('gallery-next')
const gallery_close = document.getElementById('gallery-close')
let current_index_img = 0
let images = []
console.log(gallery_close);

function open_gallery(image_urls) {
  images = image_urls
  current_index_img = 0
  gallery_imgs.src = images[current_index_img]
  gallery.classList.add('active')
}

gallery_close.addEventListener('click', () => {
  gallery.classList.remove('active')
})

document.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    gallery.classList.remove('active') 
  }

  if (event.code === 'ArrowLeft') {
    current_index_img = (current_index_img - 1 + images.length) % images.length
    gallery_imgs.src = images[current_index_img]
  }

  if (event.code === 'ArrowRight') {
    current_index_img = (current_index_img + 1) % images.length
    gallery_imgs.src = images[current_index_img]
  }
  
})


gallery_next.addEventListener('click', () => {
  current_index_img = (current_index_img + 1) % images.length
  gallery_imgs.src = images[current_index_img]
})

gallery_prev.addEventListener('click', () => {
  current_index_img = (current_index_img - 1 + images.length) % images.length
  gallery_imgs.src = images[current_index_img]
})

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal__place-img') || event.target.classList.contains('modal__place-img1')) {
    const attraction_id = localStorage.getItem('attraction_id')
    fetch_attractions_modal(attraction_id).then(attraction => {
      const image_urls = [
        attraction.image_for_page1,
        attraction.image_for_page2,
        attraction.image_for_page3,
      ]
      open_gallery(image_urls)
    })
  }

})



// Отзывы
const stars = document.querySelectorAll('.modal__reviews-star')
const review_form = document.querySelector('.modal__reviews')
let selected_rating = 0

stars.forEach(star => {
  star.addEventListener('click', () => {
    selected_rating = parseInt(star.getAttribute('data-value'), 10)
    stars.forEach((s, index) => {
      if (index < selected_rating) {
        s.classList.add('selected')
      } else {
        s.classList.remove('selected')
      }
    })
  console.log(selected_rating);
  })
})



review_form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const review_text = document.getElementById('review-text').value.trim()
  const user = document.getElementById('user-input').value.trim()
  const email = document.getElementById('email-input').value.trim()
  const attraction_id = localStorage.getItem('attraction_id')

  const review_data = {
    attraction_id: attraction_id,
    user: user,
    email: email,
    rating: Number(selected_rating), 
    text: review_text
  }
  if (selected_rating === 0) {
    alert('Выбери рейтинг')
    return 
  }
  try {
    const response = axios.post('https://67319f907aaf2a9aff113edb.mockapi.io/reviews', review_data)

    alert('Спасибо за отзыв!')
    review_form.reset()
    stars.forEach(s => s.classList.remove('selected'))
    selected_rating = 0
    display_reviews(attraction_id)
  } catch(error) {
    console.error('Ошибка:', error);
    alert('Ошибка при отправке отзыва')
  }
})


// async function fetch_reviews(id) {
//   try {
//     const response = await axios.get(`https://67319f907aaf2a9aff113edb.mockapi.io/reviews/${id}`)
//     return response.data
//     return Array.isArray(response) ? response : [response]
//   } catch(error) {
//     console.error('Ошибка получения отзывов', error);
//     return []
//   }

// } 

function display_reviews(attraction_id) {
  const reviews_container = document.getElementById('reviews-container')
  reviews_container.innerHTML = ''
    axios.get(`https://67319f907aaf2a9aff113edb.mockapi.io/reviews?attraction_id=${attraction_id}`).then((response) =>{
      for(i=0; i < response.data.length; i++){
        console.log(response.data[i]);
        let item = response.data[i]

        const review_element = document.createElement('div')
        review_element.classList.add('modal__review-container')
        review_element.innerHTML = `
          <p><strong>Оценка:</strong> ${item.rating} ★</p>
          <p><strong>Имя:</strong> ${item.user}</p>
          <p><strong>Email:</strong> ${item.email}</p>
          <p><strong>Отзыв:</strong> ${item.text}</p>
          <button class="modal__delete-review" data-id="${item.id}">Удалить</button>
          <hr>
        `
        reviews_container.appendChild(review_element)
      }
    })
}
async function delete_reviews(review_id) {
  try {
    const response = await axios.delete(`https://67319f907aaf2a9aff113edb.mockapi.io/reviews/${review_id}`)
    if (response.status === 200) {
      alert('Отзыв удален')
    } else {
      alert('Отзыв не удален :(')
    }
  } catch (error) {
    console.error('Ошибка при удалении отзыва:', error);
  }

}

document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('modal__delete-review')) {
    const review_id = event.target.getAttribute('data-id')
    await delete_reviews(review_id)
    const attraction_id = localStorage.getItem('attraction_id')
    display_reviews(attraction_id)
  }


document.addEventListener('DOMContentLoaded', () => {
  const attraction_id = localStorage.getItem('attraction_id')
  if (attraction_id) {
    display_reviews(attraction_id)
  }
})
  



  // Строка поиска (для красивой анимации)
const icon = document.getElementById('search-icon');
const search = document.getElementById('search-div');
const seacrhInp = document.getElementById('mySearch')
const clear = document.getElementById('search-clear');

    // отображение анимации поиска
    icon.addEventListener('click', () => {
        search.classList.toggle('active');
    });

    // очистка инпута 
    clear.addEventListener('click', () => {
      seacrhInp.value = '';
      Data_loader.load_data(current_page).then(data => {
        Data_loader.show_loader()
        setTimeout(() => {
          display_cards(data)
        }, 800);
        update_pagination(current_page)
        Data_loader.hide_loader()
      })
    });


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
