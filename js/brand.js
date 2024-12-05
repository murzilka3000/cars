//слайдер

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация Swiper
  const logoSwiper = new Swiper('.logo-swiper', {
    slidesPerView: 8, // Количество видимых слайдов
    grid: {
      rows: 2, // По умолчанию 2 строки
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
    breakpoints: {
      600: {
        slidesPerView: 5, // Уменьшаем количество видимых слайдов
        grid: {
          rows: 2, // На мобильных устройствах 3 строки
        },
        spaceBetween: 15, // Уменьшаем отступы
      },
      0: {
        slidesPerView: 3, // Ещё меньше видимых слайдов
        grid: {
          rows: 3, // 3 строки для маленьких экранов
        },
        spaceBetween: 10, // Ещё меньше отступы
      },
    },
  });
});




















  //count energy


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








  //custom select

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
    const productsPerPage = 18;
  
    const allProducts = Array.from(productsContainer.children);
    let filteredProducts = [...allProducts];
  
    // Обновление количества моделей
    function updateModelCount() {
      const modelCountElement = document.getElementById('model-count');
      if (modelCountElement) { // Проверяем, существует ли элемент
        modelCountElement.textContent = filteredProducts.length; // Устанавливаем количество отфильтрованных карточек
      }
    }
  
    function setupCustomSelects() {
      document.querySelectorAll('.custom-select').forEach(select => {
        const trigger = select.querySelector('.custom-select-trigger');
        const options = select.querySelectorAll('.custom-option');
  
        trigger.addEventListener('click', () => {
          select.classList.toggle('open');
        });
  
        options.forEach(option => {
          option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            trigger.querySelector('span').textContent = option.textContent;
            select.classList.remove('open');
          });
        });
  
        document.addEventListener('click', e => {
          if (!select.contains(e.target)) {
            select.classList.remove('open');
          }
        });
      });
    }
  
    function getCustomSelectValue(id) {
      const selectedOption = document.querySelector(`#${id} .custom-option.selected`);
      return selectedOption ? selectedOption.getAttribute('data-value') : 'All';
    }
  
    function showPage(page) {
      const start = (page - 1) * productsPerPage;
      const end = page * productsPerPage;
      const paginatedProducts = filteredProducts.slice(start, end);
  
      allProducts.forEach(product => (product.style.display = 'none'));
      paginatedProducts.forEach(product => (product.style.display = ''));
  
      updatePagination(page);
    }
  
    function updatePagination(currentPage) {
      paginationContainer.innerHTML = '';
      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
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
  
    function filterProducts() {
      const selectedEnergies = Array.from(document.querySelectorAll('.energy-filter:checked')).map(input => input.value);
      const selectedBrand = getCustomSelectValue('brands');
      const selectedModel = getCustomSelectValue('models');
  
      filteredProducts = allProducts.filter(product => {
        const productEnergy = product.dataset.energy;
        const productBrand = product.dataset.brand;
        const productModel = product.dataset.model;
  
        const matchesEnergy =
          selectedEnergies.length === 0 ||
          selectedEnergies.includes(productEnergy) ||
          selectedEnergies.includes('All Energy');
        const matchesBrand = selectedBrand === 'All' || selectedBrand === productBrand;
        const matchesModel = selectedModel === 'All' || selectedModel === productModel;
  
        return matchesEnergy && matchesBrand && matchesModel;
      });
    }
  
    document.getElementById('search-button').addEventListener('click', () => {
      filterProducts();
      updateModelCount();
      showPage(1);
    });
  
    setupCustomSelects();
    filterProducts();
    updateModelCount();
    showPage(1);
  });

