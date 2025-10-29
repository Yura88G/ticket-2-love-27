// Повний код js/script.js, оновлений для анімації WOW Intro
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. ДАНІ ПРОФІЛІВ (ОБ'ЄКТИ)
    // Ці дані використовуються для відображення карток профілів на сторінках.
    // =========================================================================
    const profiles = [
        // ЖІНОЧІ ПРОФІЛІ
        { id: 1, name: 'Анна', age: 32, city: 'Київ', description: 'Архітектор, любить скандинавський дизайн та гірські походи.', img: 'placeholder-woman-1.jpg', gender: 'women' },
        { id: 2, name: 'Олена', age: 28, city: 'Львів', description: 'Художниця, цінує класичну музику та тихі вечори.', img: 'placeholder-woman-2.jpg', gender: 'women' },
        { id: 3, name: 'Софія', age: 35, city: 'Одеса', description: 'Маркетолог, шукає партнера для спільних подорожей та активного відпочинку.', img: 'placeholder-woman-3.jpg', gender: 'women' },
        
        // ЧОЛОВІЧІ ПРОФІЛІ
        { id: 4, name: 'Дмитро', age: 37, city: 'Київ', description: 'IT-підприємець, захоплюється дайвінгом та інвестиціями.', img: 'placeholder-man-1.jpg', gender: 'men' },
        { id: 5, name: 'Олександр', age: 30, city: 'Дніпро', description: 'Фітнес-тренер, цінує здоровий спосіб життя та щирість.', img: 'placeholder-man-2.jpg', gender: 'men' },
        { id: 6, name: 'Максим', age: 41, city: 'Харків', description: 'Адвокат, любить джаз та філософські розмови.', img: 'placeholder-man-3.jpg', gender: 'men' }
    ];

    // =========================================================================
    // 2. БАЗОВА ФУНКЦІОНАЛЬНІСТЬ (Анімації, Меню, Лічильник, Скролінг)
// === ЛОГІКА АНІМАЦІЇ FADE-IN ПРИ СКРОЛІНГУ ===
// Ця секція управляє появою елементів із класом .fade-in при скролінгу
const fadeInElements = document.querySelectorAll('.fade-in');
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(el => observer.observe(el));

// === ЛОГІКА МОБІЛЬНОГО МЕНЮ ===
// === ЛОГІКА МОБІЛЬНОГО МЕНЮ ===
// Ця секція управляє кнопкою гамбургера та відкриванням/закриттям навігаційного меню
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
    // === ФУНКЦІЯ ЗАКРИТТЯ МЕНЮ ===
    const closeMenu = () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeMenuOnOutsideClick);
    };

    // === КЛІК ПО КНОПЦІ ГАМБУРГЕР ===
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !mainNav.classList.contains('is-open');
        
        mainNav.classList.toggle('is-open', isOpen);
        navToggle.classList.toggle('is-open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);

        if (isOpen) {
            document.addEventListener('click', closeMenuOnOutsideClick);
        } else {
            closeMenu();
        }
    });

    // === КЛІК ПО ПУНКТУ МЕНЮ (усі <a>) ===
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Зупиняємо перехід
            const href = link.getAttribute('href');

            // Закриваємо меню
            closeMenu();

            // Плавний скрол до секції (якщо це якір)
            if (href && href.startsWith('#') && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: target.offsetTop - 80, // Відступ під хедер
                            behavior: 'smooth'
                        });
                    }, 300); // Чекаємо, поки меню закриється
                }
            }
        });
    });

    // === КЛІК ПОЗА МЕНЮ ===
    function closeMenuOnOutsideClick(e) {
        if (!mainNav.contains(e.target) && e.target !== navToggle) {
            closeMenu();
        }
    }

    // === ДОДАЄМО ОБРОБНИК ПІСЛЯ ВІДКРИТТЯ (опціонально, для надійності) ===
    // Якщо пункти меню додаються динамічно — це не потрібно
}
// =========================================================================
// 💥 НОВА СЕКЦІЯ: ЛОГІКА WOW INTRO АНІМАЦІЇ 💥
// Керує послідовним запуском анімації заголовків після зникнення логотипу.
// --- ЛОГІКА WOW INTRO АНІМАЦІЇ (ФІНАЛЬНИЙ ОПТИМАЛЬНИЙ БАЛАНС) ---
const logoIntro = document.querySelector('.hero-logo-intro');
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');

// Запускаємо послідовність після 1.5 секунди (коли друк логотипу завершено і контейнер починає зникати).
setTimeout(() => {
    // 1. Запускаємо анімацію Головного заголовка (його фактична затримка: 1.8с)
    if (heroTitle) {
        heroTitle.classList.add('animate-in'); 
    }

    // 2. Запускаємо анімацію Підзаголовка (його фактична затримка: 2.4с)
    if (heroSubtitle) {
        heroSubtitle.classList.add('animate-in');
    }
}, 1500); // Змінено на 1500 мс (1.5 секунди)
// -------------------------------------------------------------------
// -------------------------------------------------------------------

console.log("Ticket 2 Love: Проект ініціалізовано.");

// === ФУНКЦІЯ ОНОВЛЕННЯ ЛІЧИЛЬНИКА ОБРАНИХ ===
// Ця функція оновлює текст кнопок "Обрані" та стан кнопки "Перейти до заявки".
// Ця функція оновлює текст кнопок "Обрані" та стан кнопки "Перейти до заявки".
const updateFavoritesCounter = () => {
    let favorites = [];
    try {
        const data = localStorage.getItem('favorites');
        favorites = data ? JSON.parse(data) : [];
    } catch (e) {
        console.warn('localStorage недоступний або пошкоджений:', e);
        favorites = [];
    }
    
    const count = favorites.length;
    const favoritesButtons = document.querySelectorAll('.favorites-button');
    
    favoritesButtons.forEach(button => {
        button.textContent = `Обрані (${count})`;
    });
    
           const selectCountSpan = document.getElementById('select-count');
        if (selectCountSpan) {
            selectCountSpan.textContent = `(${count}/3)`;
            const proceedButton = document.getElementById('proceed-to-application');
            if (proceedButton) {
                if (count > 0) {
                    proceedButton.classList.remove('disabled');
                    proceedButton.removeAttribute('disabled');
                } else {
                    proceedButton.classList.add('disabled');
                    proceedButton.setAttribute('disabled', 'true');
                }
            }
        }
    }
});

// =========================================================================
// 3. ЛОГІКА КАТАЛОГУ (catalogue.html: ФІЛЬТРАЦІЯ, ПАГІНАЦІЯ, HOVER)
// =========================================================================
// =========================================================================
// 3. ЛОГІКА КАТАЛОГУ (catalogue.html: ФІЛЬТРАЦІЯ, ПАГІНАЦІЯ, HOVER)
// =========================================================================
// Оновлення відображення віку
const updateAgeValue = (value) => {
    const ageValueEl = document.getElementById('age-value');
    if (ageValueEl) ageValueEl.textContent = `18–${value}`;
};

// Рендер карток
const renderCatalog = () => {
    const grid = document.getElementById('profile-grid');
    if (!grid) return;

    const start = (currentPage - 1) * PROFILES_PER_PAGE;
    const end = start + PROFILES_PER_PAGE;
    const pageProfiles = filteredProfiles.slice(start, end);

    grid.innerHTML = pageProfiles.map(p => {
        let favorites = [];
        try {
            const data = localStorage.getItem('favorites');
            favorites = data ? JSON.parse(data) : [];
        } catch (e) {
            console.warn('localStorage error:', e);
        }
        const isFavorite = favorites.includes(p.id.toString());
        const favoriteClass = isFavorite ? 'is-favorite' : '';

        return `
            <div class="profile-card" data-id="${p.id}">
                <div class="card-header-wrapper">
                    <img src="assets/img/${p.img}" alt="${p.name}" class="profile-photo" loading="lazy">
                    <button class="favorite-toggle ${favoriteClass}" data-id="${p.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
                <div class="card-content">
                    <h2 class="profile-name">${p.name}, ${p.age}</h2>
                    <p class="profile-city">${p.city}</p>
                    <p class="profile-description">${p.description}</p>
                    <a href="profile.html?id=${p.id}" class="view-profile-btn cta-her">Переглянути</a>
                </div>
            </div>
        `;
    }).join('');

    renderPagination();
    attachFavoriteHandlers();
};

// Пагінація
const renderPagination = () => {
    const totalPages = Math.ceil(filteredProfiles.length / PROFILES_PER_PAGE);
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn';
        btn.textContent = i;
        if (i === currentPage) btn.classList.add('active');
        btn.onclick = () => {
            currentPage = i;
            renderCatalog();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        pagination.appendChild(btn);
    }
};

// Обробники кнопок "Обрати"
const attachFavoriteHandlers = () => {
    document.querySelectorAll('.favorite-toggle').forEach(button => {
        button.onclick = (e) => {
            e.preventDefault();
            const id = e.currentTarget.dataset.id;

            let favorites = [];
            try {
                const data = localStorage.getItem('favorites');
                favorites = data ? JSON.parse(data) : [];
            } catch (err) {
                console.warn('localStorage error:', err);
            }

            if (favorites.includes(id)) {
                favorites = favorites.filter(f => f !== id);
                e.currentTarget.classList.remove('is-favorite');
            } else if (favorites.length < 3) {
                favorites.push(id);
                e.currentTarget.classList.add('is-favorite');
            } else {
                alert('Ліміт 3 профілі. Перейдіть до заявки.');
            }

            try {
                localStorage.setItem('favorites', JSON.stringify(favorites));
            } catch (err) {
                console.warn('Save error:', err);
            }

            updateFavoritesCounter();
        };
    });
};

// Ініціалізація каталогу
if (document.getElementById('profile-grid')) {
    const urlParams = new URLSearchParams(window.location.search);
    currentGender = urlParams.get('gender') || '';

    // Фільтр за статтю (з головної)
    if (currentGender) {
        filteredProfiles = profiles.filter(p => p.gender === currentGender);
    }

    // Заголовок
    const titleEl = document.getElementById('catalogue-title');
    if (titleEl) {
        if (currentGender === 'men') {
            titleEl.textContent = 'Каталог Чоловічих Профілів 🤵';
        } else if (currentGender === 'women') {
            titleEl.textContent = 'Каталог Жіночих Профілів 🌹';
        } else {
            titleEl.textContent = 'Каталог Профілів';
        }
    }

    // Фільтр по віку
    const ageSlider = document.getElementById('age-range');
    if (ageSlider) {
        ageSlider.addEventListener('input', () => {
            const maxAge = ageSlider.value;
            updateAgeValue(maxAge);
            filteredProfiles = profiles.filter(p => 
                p.age <= maxAge && (!currentGender || p.gender === currentGender)
            );
            currentPage = 1;
            renderCatalog();
        });
        updateAgeValue(ageSlider.value);
    }

    renderCatalog();
}
    // =========================================================================
    // 4. ЛОГІКА СТОРІНКИ ДЕТАЛЬНОГО ПРОФІЛЮ (profile.html)
    // Відображає деталі конкретного профілю за ID з URL.
    // =========================================================================
    
    // Функція для отримання даних профілю за ID
    const getProfileData = (id) => {
        return profiles.find(p => p.id.toString() === id);
    };

    const profileDetailSection = document.getElementById('profile-detail');
    if (profileDetailSection) {
        const urlParams = new URLSearchParams(window.location.search);
        const profileId = urlParams.get('id'); 
        const profile = getProfileData(profileId);
        
        if (profile) {
            const profileNameDetail = document.querySelector('.profile-name-detail');
            const profileCityDetail = document.querySelector('.profile-city-detail');
            const mainProfilePhoto = document.querySelector('.main-profile-photo');
            const selectProfileBtn = document.getElementById('select-profile-btn');

            if (profileNameDetail) profileNameDetail.textContent = `${profile.name}, ${profile.age}`;
            if (profileCityDetail) profileCityDetail.textContent = profile.city;
            if (mainProfilePhoto) mainProfilePhoto.src = `assets/img/${profile.img}`;

            if (selectProfileBtn) {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const isFavorite = favorites.includes(profileId);
                
                selectProfileBtn.textContent = isFavorite ? `Вибрано ✅` : `Обрати ${profile.name}`;
                if (isFavorite) selectProfileBtn.classList.add('is-favorite');
                
                selectProfileBtn.addEventListener('click', () => {
                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    
                    if (!favorites.includes(profileId)) {
                        if (favorites.length < 3) {
                            favorites.push(profileId);
                            localStorage.setItem('favorites', JSON.stringify(favorites));
                            updateFavoritesCounter();
                            
                            selectProfileBtn.textContent = `Вибрано ✅`;
                            selectProfileBtn.classList.add('is-favorite');
                            alert(`${profile.name} додано до Ваших обраних! ✅`);
                        } else {
                            alert('Ви досягли ліміту (3 профілі). Будь ласка, перейдіть до оформлення заявки.');
                        }
                    } else {
                        alert(`${profile.name} вже у Ваших обраних.`);
                    }
                });
            }

        } else {
             if (profileDetailSection) {
                 profileDetailSection.innerHTML = '<p class="error-message">Профіль не знайдено.</p>';
             }
        }
    }


    // =========================================================================
    // 5. ЛОГІКА МОДАЛЬНОГО ВІКНА (ФІЛЬТРИ) 
    // Керує відображенням модального вікна та взаємодією з елементами фільтрації.
    // =========================================================================
    const openFiltersBtn = document.getElementById('open-filters');
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    // Вміст модального вікна
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Фільтри Профілів</h3>
                <button class="close-btn">&times;</button>
            </div>
            <form id="filter-form">
                <div class="filter-group">
                    <label for="age-range">Вік (20 - 45)</label>
                    <input type="range" id="age-range" min="18" max="55" value="30">
                    <span id="age-value" style="font-family: var(--font-sans);">30 років</span>
                </div>
                <div class="filter-group">
                    <label for="height-range">Зріст (160 - 190 см)</label>
                    <input type="range" id="height-range" min="150" max="210" value="175">
                    <span id="height-value" style="font-family: var(--font-sans);">175 см</span>
                </div>
                <button type="submit" class="cta-button cta-her" style="width: 100%; margin-top: 15px;">Застосувати Фільтри</button>
            </form>
        </div>
    `;

    if (document.getElementById('open-filters')) {
        document.body.appendChild(modalOverlay);
    }
    

    const closeBtn = modalOverlay.querySelector('.close-btn');
    const ageRange = document.getElementById('age-range');
    const ageValue = document.getElementById('age-value');
    const heightRange = document.getElementById('height-range');
    const heightValue = document.getElementById('height-value');

    if (openFiltersBtn) {
        openFiltersBtn.addEventListener('click', () => {
            modalOverlay.classList.add('is-open');
        });
    }

    const closeModal = () => {
        modalOverlay.classList.remove('is-open');
    };
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal(); 
            }
        });
    }

    if (ageRange && heightRange) {
        ageRange.addEventListener('input', () => {
            ageValue.textContent = `${ageRange.value} років`;
        });
        heightRange.addEventListener('input', () => {
           heightValue.textContent = `${heightRange.value} см`;
  });
    }






















