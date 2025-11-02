// Повний код js/script.js, оновлений для анімації WOW Intro
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. ДАНІ ПРОФІЛІВ (ОБ'ЄКТИ)
   
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
// КОМПЛЕКСНЕ ВИПРАВЛЕННЯ: МОБІЛЬНЕ МЕНЮ (ПРАВИЛЬНА ВЕРСІЯ)
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;

    if (!navToggle || !mainNav) {
        console.warn('Меню не знайдено: перевір id="nav-toggle" і id="main-nav"');
        return;
    }

    const openMenu = () => {
        mainNav.classList.add('is-open');
        navToggle.setAttribute('aria-expanded', 'true');
        body.classList.add('menu-open');
    };

    const closeMenu = () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
    };

    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mainNav.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Закриття при кліку поза меню
    document.addEventListener('click', (e) => {
        if (mainNav.classList.contains('is-open') && 
            !mainNav.contains(e.target) && 
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // Закриття при кліку на посилання
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
});
// =========================================================================
// 3. ЛОГІКА КАТАЛОГУ (catalogue.html: ФІЛЬТРАЦІЯ, ПАГІНАЦІЯ, HOVER)
// =========================================================================
// 3. ЛОГІКА КАТАЛОГУ (catalogue.html: ФІЛЬТРАЦІЯ, ПАГІНАЦІЯ, HOVER)
// =========================================================================

// ГЛОБАЛЬНІ ЗМІННІ — НА ПОЧАТОКУ!
const PROFILES_PER_PAGE = 6;
let currentPage = 1;
let filteredProfiles = [];
let currentGender = '';

// ПЕРЕВІРКА: чи є profiles
if (typeof profiles === 'undefined') {
    console.error('js/profiles.js не підключено!');
    document.body.innerHTML += '<p style="color:red; text-align:center;">ПОМИЛКА: js/profiles.js не знайдено.</p>';
    throw new Error('profiles.js not loaded');
}

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

// ІНІЦІАЛІЗАЦІЯ КАТАЛОГУ
if (document.getElementById('profile-grid')) {
    const urlParams = new URLSearchParams(window.location.search);
    currentGender = urlParams.get('gender') || '';

    // Фільтр за статтю
    filteredProfiles = currentGender 
        ? profiles.filter(p => p.gender === currentGender)
        : [...profiles];

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

    // Слайдер віку
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
// ========================================
// 4.3. FAQ АКОРДЕОН — розкриття питань
// ========================================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Закриваємо всі інші
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Відкриваємо поточний (якщо не був активний)
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});
