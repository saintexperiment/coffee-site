// JavaScript для интерактивности сайта Coffee Corner

// Мобильное меню
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Закрытие мобильного меню при клике на ссылку
if (mobileMenu) {
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Красивая анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Применяем анимацию ко всем секциям
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Обработка формы бронирования
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Получаем данные формы
        const name = bookingForm.querySelector('input[type="text"]').value;
        const phone = bookingForm.querySelector('input[type="tel"]').value;
        const date = bookingForm.querySelector('input[type="date"]').value;
        const time = bookingForm.querySelector('input[type="time"]').value;
        const guests = bookingForm.querySelector('select').value;
        
        // В реальном проекте здесь была бы отправка на сервер
        console.log('Форма отправлена:', { name, phone, date, time, guests });
        
        // Показываем сообщение об успехе с анимацией
        const successMessage = document.getElementById('form-success');
        successMessage.classList.remove('hidden');
        successMessage.style.animation = 'slideIn 0.5s ease-out';
        
        // Очищаем форму
        bookingForm.reset();
        
        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            successMessage.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 500);
        }, 5000);
    });
}

// Изменение навигации при скролле
const nav = document.querySelector('nav');

if (nav) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('shadow-md');
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            nav.classList.remove('shadow-md');
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Красивая анимация счётчиков
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Запуск анимации счётчиков при появлении секции
const statsSection = document.querySelector('#about');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.text-4xl');
            counters.forEach(counter => {
                const text = counter.textContent;
                const number = parseInt(text);
                const suffix = text.replace(/[0-9]/g, '');
                counter.dataset.suffix = suffix;
                animateCounter(counter, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Валидация телефона с красивым форматированием
const phoneInput = document.querySelector('input[type="tel"]');

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = value.substring(1);
            }
            
            let formatted = '+7';
            
            if (value.length > 0) {
                formatted += ' (' + value.substring(0, 3);
            }
            if (value.length >= 3) {
                formatted += ') ' + value.substring(3, 6);
            }
            if (value.length >= 6) {
                formatted += '-' + value.substring(6, 8);
            }
            if (value.length >= 8) {
                formatted += '-' + value.substring(8, 10);
            }
            
            e.target.value = formatted;
        }
    });
}

// Анимация для карточек при наведении
document.querySelectorAll('.bg-gradient-to-br').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(217, 119, 6, 0.2)';
        card.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'none';
    });
});

// Анимация для изображений в галерее
document.querySelectorAll('#gallery img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'transform 0.4s ease';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Параллакс эффект для hero секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Добавляем анимацию загрузки страницы
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
