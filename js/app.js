document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.getElementById('burger-icon');
    const menuContent = document.getElementById('menu-content');
    const body = document.body;
  
    // Открытие/закрытие меню
    burgerIcon.addEventListener('click', () => {
      const isMenuOpen = menuContent.classList.contains('open');
  
      if (isMenuOpen) {
        menuContent.classList.remove('open'); // Закрываем меню
        body.classList.remove('no-scroll'); // Включаем прокрутку
      } else {
        menuContent.classList.add('open'); // Открываем меню
        body.classList.add('no-scroll'); // Отключаем прокрутку
      }
    });
  
    // Закрытие меню при клике вне области меню
    document.addEventListener('click', (event) => {
      if (!burgerIcon.contains(event.target) && !menuContent.contains(event.target)) {
        menuContent.classList.remove('open'); // Закрываем меню
        body.classList.remove('no-scroll'); // Включаем прокрутку
      }
    });
  });