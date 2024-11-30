document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        loop: true, // Зацикливание слайдов
        navigation: {
            nextEl: '.swiper-button-next', // Кнопка "вперед"
            prevEl: '.swiper-button-prev', // Кнопка "назад"
        },
        autoplay: {
            delay: 3000, // Автопрокрутка каждые 3 секунды
            disableOnInteraction: false, // Продолжить после взаимодействия
        },
        slidesPerView: 1, // Количество видимых слайдов
        spaceBetween: 20, // Отступы между слайдами
    });
});