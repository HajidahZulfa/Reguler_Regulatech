document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-form input[type="text"]');
    const cardListContainer = document.querySelector('.card-list');

    async function fetchAndDisplayRegulations(query = '', category = '') {
        let url = 'http://localhost:5500/api/search';
        const params = new URLSearchParams();
        if (query) {
            params.append('q', query);
        }
        if (category) {
            params.append('category', category);
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        } else {
            url = 'http://localhost:5500/api/regulations';
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const regulations = await response.json();
            displayRegulations(regulations);
        } catch (error) {
            console.error('Error fetching regulations:', error);
            cardListContainer.innerHTML = '<p>Gagal memuat regulasi. Silakan coba lagi nanti.</p>';
        }
    }

    function displayRegulations(regulations) {
        cardListContainer.innerHTML = '';

        if (regulations.length === 0) {
            cardListContainer.innerHTML = '<p>Tidak ada regulasi yang ditemukan.</p>';
            return;
        }

        regulations.forEach(reg => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="regulasi pict.jpg" alt="Regulasi"/>
                <h3>
                    <a href="detail-regulasi.html?id=${reg.id}">${reg.title}</a>
                </h3>
                <p><strong>${reg.category}</strong></p>
                <p>${reg.summary.substring(0, 150)}${reg.summary.length > 150 ? '...' : ''}</p>
                <a href="detail-regulasi.html?id=${reg.id}">Baca Selengkapnya</a>
            `;
            cardListContainer.appendChild(card);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value;
                fetchAndDisplayRegulations(searchTerm);
            }
        });
    }

    async function populateQuizTopics() {
        const topikSelect = document.getElementById('topik');
        if (!topikSelect) return;

        try {
            const response = await fetch('http://localhost:5500/api/categories');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const categories = await response.json();

            topikSelect.innerHTML = '<option value="">Pilih Topik</option>';

            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                topikSelect.appendChild(option);
            });

            const othersOption = document.createElement('option');
            othersOption.value = "Lainnya...";
            othersOption.textContent = "Lainnya...";
            topikSelect.appendChild(othersOption);

        } catch (error) {
            console.error('Error fetching categories for quiz:', error);
            topikSelect.innerHTML = '<option value="">Gagal memuat topik</option>';
        }
    }

    fetchAndDisplayRegulations();
    populateQuizTopics();
});