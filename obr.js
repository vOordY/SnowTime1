
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.modal-close');

        function openModal(imgSrc) {
            modal.style.display = 'flex';
            modalImg.src = imgSrc;
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        document.querySelectorAll('.gallery-zoomable').forEach(img => {
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                openModal(this.src);
            });
        });

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });

        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.stack-item, .equip-card, .step-card, .about-grid > *').forEach(el => {
            observer.observe(el);
        });
// =============================================
// 1. ОБРАБОТКА ФОРМЫ БРОНИРОВАНИЯ НА ГЛАВНОЙ
// =============================================
var rentalForm = document.querySelector('.simple-form');

if (rentalForm) {
    rentalForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var nameInput = rentalForm.querySelector('input[type="text"]');
        var phoneInput = rentalForm.querySelector('input[type="tel"]');
        var datesInput = rentalForm.querySelector('input[placeholder="Даты (например, 15-20 марта)"]');
        var selectInput = rentalForm.querySelector('select');

        var name = nameInput.value.trim();
        var phone = phoneInput.value.trim();
        var dates = datesInput.value.trim();
        var equipment = selectInput.value;

        if (name === '' || phone === '') {
            alert('Внимание! Пожалуйста, заполните имя и телефон.');
            return;
        }

        var phonePattern = /^[\d\s\+\(\)\-]+$/;
        if (!phonePattern.test(phone)) {
            alert('Внимание! Пожалуйста, введите корректный номер телефона (только цифры и знаки).');
            return;
        }

        var message = 'Заявка на бронирование отправлена!\n\n';
        message = message + 'Имя: ' + name + '\n';
        message = message + 'Телефон: ' + phone + '\n';
        message = message + 'Даты: ' + (dates || 'не указаны') + '\n';
        message = message + 'Снаряжение: ' + equipment + '\n\n';
        message = message + 'Скоро с вами свяжется наш менеджер.';

        alert(message);

        rentalForm.reset();
    });
}

// =============================================
// 2. ОБРАБОТКА ФОРМЫ НА СТРАНИЦЕ ОТЗЫВОВ
// =============================================
var reviewForm = document.querySelector('.review-form-card .form-row');
if (reviewForm) {
    reviewForm = reviewForm.parentElement;
}

if (reviewForm) {
    var submitBtn = reviewForm.querySelector('.submit-btn');

    if (submitBtn) {
        submitBtn.addEventListener('click', function(event) {
            event.preventDefault();

            var nameInput = reviewForm.querySelector('input[placeholder="Ваше имя"]');
            var phoneInput = reviewForm.querySelector('input[placeholder="Телефон"]');
            var emailInput = reviewForm.querySelector('input[type="email"]');
            var reviewTextInput = reviewForm.querySelector('textarea');
            var ratingStars = reviewForm.querySelectorAll('.rate-star');

            var name = '';
            var reviewText = '';

            if (nameInput) {
                name = nameInput.value.trim();
            }

            if (reviewTextInput) {
                reviewText = reviewTextInput.value.trim();
            }

            if (name === '' || reviewText === '') {
                alert('Внимание! Пожалуйста, заполните имя и текст отзыва.');
                return;
            }

            var rating = 0;
            if (ratingStars) {
                ratingStars.forEach(function(star) {
                    if (star.classList.contains('active')) {
                        rating = rating + 1;
                    }
                });
            }

            if (rating === 0) {
                alert('Внимание! Пожалуйста, поставьте оценку (от 1 до 5 звёзд).');
                return;
            }

            var message = 'Спасибо за ваш отзыв!\n\n';
            message = message + 'Имя: ' + name + '\n';

            if (phoneInput) {
                message = message + 'Телефон: ' + (phoneInput.value.trim() || 'не указан') + '\n';
            } else {
                message = message + 'Телефон: не указан\n';
            }

            if (emailInput) {
                message = message + 'Email: ' + (emailInput.value.trim() || 'не указан') + '\n';
            } else {
                message = message + 'Email: не указан\n';
            }

            var starsStr = '';
            for (var i = 0; i < rating; i++) {
                starsStr = starsStr + '★';
            }
            for (var j = rating; j < 5; j++) {
                starsStr = starsStr + '☆';
            }
            message = message + 'Оценка: ' + starsStr + '\n';
            message = message + 'Отзыв: ' + reviewText + '\n\n';
            message = message + 'Ваш отзыв поможет другим райдерам.';

            alert(message);

            reviewForm.reset();

            if (ratingStars) {
                ratingStars.forEach(function(star) {
                    star.classList.remove('active');
                });
            }
        });
    }
}

// =============================================
// 3. ИНТЕРАКТИВНОСТЬ ДЛЯ ЗВЁЗД В ФОРМЕ ОТЗЫВА
// =============================================
var starElements = document.querySelectorAll('.rate-star');

starElements.forEach(function(star, index) {
    star.addEventListener('click', function() {
        starElements.forEach(function(s) {
            s.classList.remove('active');
        });

        for (var i = 0; i <= index; i++) {
            starElements[i].classList.add('active');
        }
    });

    star.addEventListener('mouseenter', function() {
        starElements.forEach(function(s, i) {
            if (i <= index) {
                s.style.color = '#6ebddb';
            } else {
                s.style.color = '#2a5568';
            }
        });
    });

    star.addEventListener('mouseleave', function() {
        starElements.forEach(function(s) {
            if (s.classList.contains('active')) {
                s.style.color = '#6ebddb';
            } else {
                s.style.color = '#2a5568';
            }
        });
    });
});

// =============================================
// 4. ОБРАБОТЧИК ДЛЯ КНОПКИ "ПОЛЕЗНЫЙ ОТЗЫВ"
// =============================================
var helpfulBtns = document.querySelectorAll('.helpful-btn');

helpfulBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        var text = btn.textContent;
        var match = text.match(/(\d+)/);

        if (match) {
            var count = parseInt(match[0]) + 1;
            btn.textContent = 'Да (' + count + ')';
            btn.style.background = '#2a5568';
            btn.style.color = '#cdeefc';

            btn.style.transform = 'scale(1.1)';
            setTimeout(function() {
                btn.style.transform = 'scale(1)';
            }, 200);
        }
    });
});

// =============================================
// 5. ПЛАВНАЯ ПРОКРУТКА ПО ЯКОРНЫМ ССЫЛКАМ
// =============================================
var navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        var href = link.getAttribute('href');

        if (href === '#') {
            return;
        }

        var targetElement = document.querySelector(href);

        if (targetElement) {
            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('SnowTime: все обработчики форм успешно добавлены.');