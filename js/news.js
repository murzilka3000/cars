document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper-container', {
      loop: true, // Зацикливание слайдов
      slidesPerView: 3, // Отображать один слайд
      spaceBetween: 10, // Расстояние между слайдами
      navigation: {
        nextEl: '.swiper-next', // Кнопка "Вперёд"
        prevEl: '.swiper-prev', // Кнопка "Назад"
      },
      autoplay: {
        delay: 3000, // Автопрокрутка каждые 3 секунды
        disableOnInteraction: false, // Продолжать прокрутку после взаимодействия
      },
    });
  });




document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.getElementById('news');
  const paginationContainer = document.getElementById('pagination');
  const productsPerPage = 9;

  const allProducts = Array.from(productsContainer.children);

  // Функция отображения карточек на текущей странице
  function showPage(page) {
    const start = (page - 1) * productsPerPage;
    const end = page * productsPerPage;
    const paginatedProducts = allProducts.slice(start, end);

    allProducts.forEach(product => (product.style.display = 'none'));
    paginatedProducts.forEach(product => (product.style.display = ''));

    updatePagination(page);
  }

  // Функция обновления пагинации
  function updatePagination(currentPage) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(allProducts.length / productsPerPage);

    const createPageButton = (page, label = null, active = false) => {
      const button = document.createElement('div');
      button.textContent = label || page;
      button.classList.add('page-item');
      if (active) button.classList.add('active');
      button.addEventListener('click', () => showPage(page));
      return button;
    };

    paginationContainer.appendChild(createPageButton(1, '1', currentPage === 1));

    if (currentPage > 2) {
      const dots = document.createElement('div');
      dots.textContent = '...';
      dots.classList.add('page-item');
      paginationContainer.appendChild(dots);
    }

    if (currentPage > 1 && currentPage < totalPages) {
      paginationContainer.appendChild(createPageButton(currentPage, currentPage, true));
    }

    if (currentPage < totalPages - 1) {
      const dots = document.createElement('div');
      dots.textContent = '...';
      dots.classList.add('page-item');
      paginationContainer.appendChild(dots);
    }
    if (totalPages > 1) {
      paginationContainer.appendChild(createPageButton(totalPages, totalPages, currentPage === totalPages));
    }

    if (currentPage < totalPages) {
      const nextButton = createPageButton(currentPage + 1, 'Далее >>');
      paginationContainer.appendChild(nextButton);
    }
  }

  // Инициализация
  showPage(1);
});
