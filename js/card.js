document.addEventListener('DOMContentLoaded', () => {
    // Слайдер миниатюр
    const galleryThumbs = new Swiper('.gallery-thumbs', {
      direction: 'vertical', // Миниатюры располагаются вертикально
      spaceBetween: 10, // Отступы между миниатюрами
      slidesPerView: 5, // Видно ровно 5 миниатюр
      freeMode: true, // Свободный режим прокрутки
      mousewheel: true, // Добавляем прокрутку колёсиком мыши
      watchSlidesVisibility: true, // Следим за видимостью
      watchSlidesProgress: true, // Следим за прогрессом
    });
  
    // Основной слайдер
    const galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10, // Отступы между слайдами
      thumbs: {
        swiper: galleryThumbs, // Привязываем миниатюры
      },
    });
  });



  //новый свипер слайдер

  const swiperTwo = new Swiper('.other-models-swiper_container', {
    loop: false, // Зацикливание слайдов
    navigation: {
      nextEl: '.swiper-button-next', // Кнопка "вперед"
      prevEl: '.swiper-button-prev', // Кнопка "назад"
    },
    autoplay: {
      delay: 3000, // Автопрокрутка каждые 3 секунды
      disableOnInteraction: false, // Продолжить после взаимодействия
    },
    slidesPerView: 4, // Количество видимых слайдов
    spaceBetween: 20, // Отступы между слайдами
  });


  document.addEventListener('DOMContentLoaded', () => {
    const galleryTop = document.querySelector('.gallery-top');
    const galleryThumbs = document.querySelector('.gallery-thumbs');
  
    function updateThumbsHeight() {
      if (galleryTop && galleryThumbs) {
        const galleryTopHeight = galleryTop.offsetHeight; // Получаем текущую высоту .gallery-top
        galleryThumbs.style.maxHeight = `${galleryTopHeight}px`; // Устанавливаем ту же высоту для .gallery-thumbs
      }
    }
  
    // Первоначальная установка
    updateThumbsHeight();
  
    // Обновляем при изменении размера окна
    window.addEventListener('resize', updateThumbsHeight);
  });