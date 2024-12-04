//слфйдер

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Swiper
    const logoSwiper = new Swiper('.logo-swiper', {
      slidesPerView: 8, // Видно 5 слайдов в каждой строке
      grid: {
        rows: 2, // Две строки логотипов
        fill: 'row', // Заполняем по строкам
      },
      spaceBetween: 20, // Отступы между слайдами
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true, // Зацикливание слайдов
      autoplay: {
        delay: 3000, // Автопрокрутка каждые 3 секунды
        disableOnInteraction: false, // Продолжать автопрокрутку после взаимодействия
      },
    });
  });

  // Фильтрация продуктов

  document.getElementById('search-button').addEventListener('click', function () {
    // Получаем все выбранные фильтры
    const selectedEnergies = Array.from(document.querySelectorAll('.energy-filter:checked')).map(input => input.value);
    const selectedBrand = document.getElementById('brands').value;
    const selectedModel = document.getElementById('models').value;

    // Фильтруем продукты
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
      const productEnergy = product.dataset.energy;
      const productBrand = product.dataset.brand;
      const productModel = product.dataset.model;

      // Проверяем совпадение фильтров
      const matchesEnergy = selectedEnergies.length === 0 || selectedEnergies.includes(productEnergy) || selectedEnergies.includes('All Energy');
      const matchesBrand = selectedBrand === 'All' || selectedBrand === productBrand;
      const matchesModel = selectedModel === 'All' || selectedModel === productModel;

      // Показываем или скрываем продукт
      if (matchesEnergy && matchesBrand && matchesModel) {
        product.style.display = '';
      } else {
        product.style.display = 'none';
      }
    });
  });


  document.addEventListener('DOMContentLoaded', () => {
    // Обновление количества моделей для каждого типа энергии
    function updateEnergyCounts() {
      const products = document.querySelectorAll('.product-card');
  
      // Создаём объект для подсчёта
      const energyCounts = {};
  
      // Считаем количество продуктов каждого типа энергии
      products.forEach(product => {
        const energy = product.dataset.energy;
        energyCounts[energy] = (energyCounts[energy] || 0) + 1;
      });
  
      // Обновляем DOM
      document.querySelectorAll('.energy-count').forEach(countElement => {
        const energyType = countElement.dataset.energy;
        countElement.textContent = energyCounts[energyType] || 0;
      });
    }
  
    // Фильтрация продуктов
    document.getElementById('search-button').addEventListener('click', function () {
      const selectedEnergies = Array.from(document.querySelectorAll('.energy-filter:checked')).map(input => input.value);
      const selectedBrand = document.getElementById('brands').value;
      const selectedModel = document.getElementById('models').value;
  
      const products = document.querySelectorAll('.product-card');
      products.forEach(product => {
        const productEnergy = product.dataset.energy;
        const productBrand = product.dataset.brand;
        const productModel = product.dataset.model;
  
        const matchesEnergy = selectedEnergies.length === 0 || selectedEnergies.includes(productEnergy) || selectedEnergies.includes('All Energy');
        const matchesBrand = selectedBrand === 'All' || selectedBrand === productBrand;
        const matchesModel = selectedModel === 'All' || selectedModel === productModel;
  
        if (matchesEnergy && matchesBrand && matchesModel) {
          product.style.display = '';
        } else {
          product.style.display = 'none';
        }
      });
  
      // Обновляем цифры в скобках
      updateEnergyCounts();
    });

  
    // Инициализация подсчёта при загрузке
    updateEnergyCounts();
  });


  document.addEventListener('DOMContentLoaded', () => {
    const customSelects = document.querySelectorAll('.custom-select');
  
    customSelects.forEach(select => {
      const trigger = select.querySelector('.custom-select-trigger');
      const options = select.querySelectorAll('.custom-option');
      const span = trigger.querySelector('span');
  
      // Открытие/закрытие выпадающего списка
      trigger.addEventListener('click', () => {
        select.classList.toggle('active');
      });
  
      // Выбор элемента
      options.forEach(option => {
        option.addEventListener('click', () => {
          options.forEach(opt => opt.classList.remove('selected'));
          option.classList.add('selected');
          span.textContent = option.textContent; // Обновляем отображаемое значение
          select.classList.remove('active');
        });
      });
  
      // Закрытие при клике вне выпадающего списка
      document.addEventListener('click', e => {
        if (!select.contains(e.target)) {
          select.classList.remove('active');
        }
      });
    });
  });


 


  document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const paginationContainer = document.getElementById('pagination');
    const productsPerPage = 18; // Количество карточек на странице
  
    // Получаем все карточки продуктов
    const products = Array.from(productsContainer.children);
  
    // Рассчитываем общее количество страниц
    const totalPages = Math.ceil(products.length / productsPerPage);
  
    // Функция для отображения карточек на текущей странице
    function showPage(page) {
      // Скрываем все карточки
      products.forEach((product, index) => {
        product.style.display = 'none';
        if (index >= (page - 1) * productsPerPage && index < page * productsPerPage) {
          product.style.display = '';
        }
      });
  
      // Обновляем пагинацию
      updatePagination(page);
    }
  
    // Функция для обновления пагинации
    function updatePagination(currentPage) {
      paginationContainer.innerHTML = '';
  
      // Кнопка первой страницы
      const firstPage = document.createElement('div');
      firstPage.textContent = '1';
      firstPage.classList.add('page-item');
      if (currentPage === 1) firstPage.classList.add('active');
      firstPage.addEventListener('click', () => showPage(1));
      paginationContainer.appendChild(firstPage);
  
      // Кнопка текущей или следующей страницы (если мы не на первой странице)
      if (currentPage > 1 && currentPage < totalPages) {
        const currentPageButton = document.createElement('div');
        currentPageButton.textContent = currentPage;
        currentPageButton.classList.add('page-item', 'active');
        paginationContainer.appendChild(currentPageButton);
      } else if (currentPage === 1 && totalPages > 1) {
        const secondPageButton = document.createElement('div');
        secondPageButton.textContent = '2';
        secondPageButton.classList.add('page-item');
        secondPageButton.addEventListener('click', () => showPage(2));
        paginationContainer.appendChild(secondPageButton);
      }
  
      // Троеточие (если текущая страница далеко от последней)
      if (totalPages > 3 && currentPage < totalPages - 1) {
        const dots = document.createElement('div');
        dots.textContent = '...';
        dots.classList.add('page-item');
        dots.style.cursor = 'default';
        paginationContainer.appendChild(dots);
      }
  
      // Кнопка последней страницы (если она не совпадает с текущей)
      if (totalPages > 1 && currentPage !== totalPages) {
        const lastPage = document.createElement('div');
        lastPage.textContent = totalPages;
        lastPage.classList.add('page-item');
        if (currentPage === totalPages) lastPage.classList.add('active');
        lastPage.addEventListener('click', () => showPage(totalPages));
        paginationContainer.appendChild(lastPage);
      }
  
      // Кнопка "Далее"
      if (currentPage < totalPages) {
        const nextButton = document.createElement('div');
        nextButton.textContent = 'Далее >>';
        nextButton.classList.add('page-item');
        nextButton.addEventListener('click', () => showPage(currentPage + 1));
        paginationContainer.appendChild(nextButton);
      }
    }
  
    // Инициализация
    showPage(1);
  });

  
  

    