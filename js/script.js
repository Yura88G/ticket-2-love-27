// script.js — ПОВНА ВЕРСІЯ, ВИПРАВЛЕНА, БЕЗ ПОМИЛОК
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. МОБІЛЬНЕ МЕНЮ — ПРАЦЮЄ З id="nav-toggle" і id="main-nav"
    // =========================================================================
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mainNav.classList.contains('is-open');

            if (isOpen) {
                mainNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('menu-open');
            } else {
                mainNav.classList.add('is-open');
                navToggle.setAttribute('aria-expanded', 'true');
                body.classList.add('menu-open');
            }
        });

        // Закриття при кліку поза меню
        document.addEventListener('click', (e) => {
            if (mainNav.classList.contains('is-open') && 
                !mainNav.contains(e.target) && 
                !navToggle.contains(e.target)) {
                mainNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('menu-open');
            }
        });

        // Закриття при кліку на посилання
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('menu-open');
            });
        });
    }

    // =========================================================================
    // 2. ОНОВЛЕННЯ ЛІЧИЛЬНИКА ОБРАНИХ
    // =========================================================================
    const updateFavoritesCounter = () => {
        let favorites = [];
        try {
            const data = localStorage.getItem('favorites');
            favorites = data ? JSON.parse(data) : [];
        } catch (e) {
            console.warn('localStorage error:', e);
        }

        const count = favorites.length;
        document.querySelectorAll('.favorites-button').forEach(btn => {
            btn.textContent = `Обрані (${count})`;
        });

        const selectCount = document.getElementById('select-count');
        const proceedBtn = document.getElementById('proceed-to-application');
        if (selectCount && proceedBtn) {
            selectCount.textContent = `(${count}/3)`;
            if (count > 0) {
                proceedBtn.classList.remove('disabled');
                proceedBtn.removeAttribute('disabled');
            } else {
                proceedBtn.classList.add('disabled');
                proceedBtn.setAttribute('disabled', 'true');
            }
        }
    };

    // =========================================================================
    // 3. КАТАЛОГ — ФІЛЬТРАЦІЯ, ПАГІНАЦІЯ, ДОДАВАННЯ ДО ОБРАНИХ
    // =========================================================================
    if (document.getElementById('profile-grid')) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentGender = urlParams.get('gender') || '';
        let filteredProfiles = currentGender 
            ? profiles.filter(p => p.gender === currentGender)
            : [...profiles];

        const PROFILES_PER_PAGE = 6;
        let currentPage = 1;

        const renderCatalog = () => {
            const grid = document.getElementById('profile-grid');
            const start = (currentPage - 1) * PROFILES_PER_PAGE;
            const end = start + PROFILES_PER_PAGE;
            const pageProfiles = filteredProfiles.slice(start, end);

            grid.innerHTML = pageProfiles.map(p => {
                const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                const isFavorite = favorites.includes(p.id.toString());
                return `
                    <div class="profile-card" data-id="${p.id}">
                        <div class="card-header-wrapper">
                            <img src="assets/img/${p.img}" alt="${p.name}" class="profile-photo" loading="lazy">
                            <button class="favorite-toggle ${isFavorite ? 'is-favorite' : ''}" data-id="${p.id}">
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

            // Обробка кнопок "сердечко"
            document.querySelectorAll('.favorite-toggle').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.currentTarget.dataset.id;
                    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                    if (favorites.includes(id)) {
                        favorites = favorites.filter(f => f !== id);
                        e.currentTarget.classList.remove('is-favorite');
                    } else if (favorites.length < 3) {
                        favorites.push(id);
                        e.currentTarget.classList.add('is-favorite');
                    } else {
                        alert('Ліміт 3 профілі. Перейдіть до заявки.');
                    }
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    updateFavoritesCounter();
                });
            });
        };

        // Фільтр за віком
        const ageSlider = document.getElementById('age-range');
        if (ageSlider) {
            ageSlider.addEventListener('input', () => {
                const maxAge = ageSlider.value;
                document.getElementById('age-value').textContent = `18–${maxAge}`;
                filteredProfiles = profiles.filter(p => 
                    p.age <= maxAge && (!currentGender || p.gender === currentGender)
                );
                currentPage = 1;
                renderCatalog();
            });
        }

        renderCatalog();
        updateFavoritesCounter();
    }

    // =========================================================================
    // 4. ДЕТАЛЬНИЙ ПРОФІЛЬ
    // =========================================================================
    const profileDetail = document.getElementById('profile-detail');
    if (profileDetail) {
        const urlParams = new URLSearchParams(window.location.search);
        const profileId = urlParams.get('id');
        const profile = profiles.find(p => p.id.toString() === profileId);

        if (profile) {
            document.querySelector('.profile-name-detail').textContent = `${profile.name}, ${profile.age}`;
            document.querySelector('.profile-city-detail').textContent = profile.city;
            document.querySelector('.main-profile-photo').src = `assets/img/${profile.img}`;

            const selectBtn = document.getElementById('select-profile-btn');
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            const isFavorite = favorites.includes(profileId);

            selectBtn.textContent = isFavorite ? 'Вибрано' : `Обрати ${profile.name}`;
            if (isFavorite) selectBtn.classList.add('is-favorite');

            selectBtn.addEventListener('click', () => {
                let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                if (!favorites.includes(profileId) && favorites.length < 3) {
                    favorites.push(profileId);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    updateFavoritesCounter();
                    selectBtn.textContent = 'Вибрано';
                    selectBtn.classList.add('is-favorite');
                    alert(`${profile.name} додано до обраних!`);
                } else if (favorites.includes(profileId)) {
                    alert('Вже обрано.');
                } else {
                    alert('Ліміт 3 профілі.');
                }
            });
        }
    }

    // =========================================================================
    // 5. FAQ АКОРДЕОН
    // =========================================================================
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Закриваємо всі
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Відкриваємо поточний
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // =========================================================================
    // 6. AOS ІНІЦІАЛІЗАЦІЯ (якщо є)
    // =========================================================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-quart',
            once: true,
            offset: 100
        });
    }

    // =========================================================================
    // 7. ОНОВЛЕННЯ ЛІЧИЛЬНИКА ПРИ ЗАВАНТАЖЕННІ
    // =========================================================================
    updateFavoritesCounter();

}); // ← ЦЕЙ ЗАКРИВАЮЧИЙ ЕЛЕМЕНТ БУВ ВТРАЧЕНИЙ!
