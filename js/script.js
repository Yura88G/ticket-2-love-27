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
    // =========================================================================
    
    // === ЛОГІКА АНІМАЦІЇ FADE-IN ПРИ СКРОЛІНГУ ===
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
   
        const navToggle = document.querySelector('.nav-toggle');
        const mainNav = document.querySelector('.main-nav');

        if (navToggle && mainNav) {
            navToggle.addEventListener('click', () => {
                const isOpen = mainNav.classList.toggle('is-open');
                navToggle.classList.toggle('is-open', isOpen);
                navToggle.setAttribute('aria-expanded', isOpen);

                // Закриття при повторному кліку або кліку поза меню
                if (isOpen) {
                    document.addEventListener('click', closeMenuOnOutsideClick);
                } else {
                    document.removeEventListener('click', closeMenuOnOutsideClick);
                }
            });

            // Функція для закриття меню при кліку поза ним
            function closeMenuOnOutsideClick(e) {
                if (!mainNav.contains(e.target) && e.target !== navToggle) {
                    mainNav.classList.remove('is-open');
                    navToggle.classList.remove('is-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.removeEventListener('click', closeMenuOnOutsideClick);
                }
            }
        }
    });


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
    // =========================================================================

    console.log("Ticket 2 Love: Проект ініціалізовано.");

    // === ФУНКЦІЯ ОНОВЛЕННЯ ЛІЧИЛЬНИКА ОБРАНИХ ===
    // Ця функція оновлює текст кнопок "Обрані" та стан кнопки "Перейти до заявки".
    const updateFavoritesCounter = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
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
    };


    updateFavoritesCounter();
    
    // === ПРИХОВУВАННЯ ХЕДЕРА ПРИ СКРОЛІНГУ ===
    // Додає клас 'hidden' до хедера при прокручуванні вниз.
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    });

    // =========================================================================
    // 3. ЛОГІКА КАТАЛОГУ (catalogue.html: ФІЛЬТРАЦІЯ ТА ВІДОБРАЖЕННЯ)
    // Керує відображенням карток профілів залежно від вибраної статі в URL.
    // =========================================================================
    
    const catalogueSection = document.getElementById('profile-catalogue');

    if (catalogueSection) {
        
        // 1. Отримання параметру gender з URL
        const urlParams = new URLSearchParams(window.location.search);
        const selectedGender = urlParams.get('gender'); 
        
        // 2. Фільтрація профілів
        let filteredProfiles = [];
        let catalogueTitle = 'Каталог Профілів';
        
        if (selectedGender === 'men') {
            filteredProfiles = profiles.filter(p => p.gender === 'men'); 
            catalogueTitle = 'Каталог Чоловічих Профілів 🤵';
        } else if (selectedGender === 'women') {
            filteredProfiles = profiles.filter(p => p.gender === 'women'); 
            catalogueTitle = 'Каталог Жіночих Профілів 🌹';
        } else {
            // За замовчуванням показуємо жінок, якщо перехід був не з головної
            filteredProfiles = profiles.filter(p => p.gender === 'women');
            catalogueTitle = 'Каталог Жіночих Профілів 🌹 (Оберіть стать на Головній)';
        }

        // 3. Оновлення заголовка сторінки
        const catalogueH1 = document.getElementById('catalogue-title');
        if(catalogueH1) {
             catalogueH1.textContent = catalogueTitle;
        }

        const profileGrid = document.getElementById('profile-grid');
        
        if (profileGrid) {
            
            filteredProfiles.forEach(profile => {
                
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const isFavorite = favorites.includes(profile.id.toString());
                const favoriteClass = isFavorite ? 'is-favorite' : '';
                
                const profileCard = document.createElement('div');
                profileCard.className = 'profile-card';
                profileCard.innerHTML = `
                    <div class="card-header-wrapper">
                         <img src="assets/img/${profile.img}" alt="Фото ${profile.name}" class="profile-photo">
                         <button class="favorite-toggle ${favoriteClass}" data-id="${profile.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                    <div class="card-content">
                        <h2 class="profile-name">${profile.name}, ${profile.age}</h2>
                        <p class="profile-city">${profile.city}</p>
                        <p class="profile-description">${profile.description}</p>
                        <a href="profile.html?id=${profile.id}" class="view-profile-btn cta-her">Переглянути</a>
                    </div>
                `;
                profileGrid.appendChild(profileCard);
            });
            
            // Додавання обробників подій для кнопок "Обрати"
            document.querySelectorAll('.favorite-toggle').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const id = e.currentTarget.dataset.id;
                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    
                    if (favorites.includes(id)) {
                        // Видалити з обраних
                        favorites = favorites.filter(favId => favId !== id);
                        e.currentTarget.classList.remove('is-favorite');
                    } else {
                        // Додати до обраних (з лімітом 3)
                        if (favorites.length < 3) {
                            favorites.push(id);
                            e.currentTarget.classList.add('is-favorite');
                        } else {
                            alert('Ви досягли ліміту (3 профілі). Будь ласка, перейдіть до оформлення заявки.');
                        }
                    }
                    
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    updateFavoritesCounter();
                });
            });
        }
        
        // Логіка переходу до заявки
        const proceedButton = document.getElementById('proceed-to-application');
        if (proceedButton) {
            proceedButton.addEventListener('click', () => {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                if (favorites.length > 0) {
                    alert(`Перехід до форми заявки. Обрані ID: ${favorites.join(', ')}`);
                } else {
                    alert('Будь ласка, оберіть хоча б один профіль.');
                }
            });
        }
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


});

// =
