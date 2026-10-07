let heroSlideIndex = 0;
const heroSlideCount = 3;
let heroAutoTimer;

function switchHeroSlide(index) {
    for (let i = 0; i < heroSlideCount; i++) {
        const slide = document.getElementById('hero-slide-' + i);
        const dot = document.getElementById('hero-dot-' + i);

        if (i === index) {
            slide.classList.remove('hidden');
            slide.classList.add('grid');
            dot.className = 'cursor-pointer w-8 h-2 rounded-full bg-gradient-to-r from-[#9ACF88] to-[#AAD39C] shadow-md transition-all';
        } else {
            slide.classList.add('hidden');
            slide.classList.remove('grid');
            dot.className = 'cursor-pointer w-2 h-2 rounded-full bg-[#fff] transition-all';
        }
    }
    heroSlideIndex = index;
}

function startHeroAutoRotate() {
    heroAutoTimer = setInterval(() => {
        const next = (heroSlideIndex + 1) % heroSlideCount;
        switchHeroSlide(next);
    }, 5000);
}

switchHeroSlide(0);
// startHeroAutoRotate();


// filter + pagination
let currentFilter = 'All';
let currentPage = 1;
const cardsPerPage = 12;

function filterResources(category) {
    currentFilter = category;
    currentPage = 1;

    // Update tab active states
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        if (tab.dataset.filter === category) {
            tab.classList.remove('border-transparent', 'text-[#9a9a92]');
            tab.classList.add('border-[#7fb35c]', 'text-[#3a3a3a]');
        } else {
            tab.classList.remove('border-[#7fb35c]', 'text-[#3a3a3a]');
            tab.classList.add('border-transparent', 'text-[#9a9a92]');
        }
    });

    renderPage();
}

function getFilteredCards() {
    const allCards = Array.from(document.querySelectorAll('.resource-card'));
    if (currentFilter === 'All') return allCards;
    return allCards.filter(card => card.dataset.category === currentFilter);
}

function renderPage() {
    const allCards = Array.from(document.querySelectorAll('.resource-card'));
    const filteredCards = getFilteredCards();
    const totalPages = Math.max(1, Math.ceil(filteredCards.length / cardsPerPage));

    // Clamp currentPage within valid range
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const visibleCards = filteredCards.slice(start, end);

    // Hide all cards, then show only the ones for this page + filter
    allCards.forEach(card => {
        card.style.display = visibleCards.includes(card) ? '' : 'none';
    });

    renderPaginationNumbers(totalPages);

    // Update prev/next disabled state
    document.getElementById('pag-prev').style.opacity = currentPage === 1 ? '0.4' : '1';
    document.getElementById('pag-prev').style.pointerEvents = currentPage === 1 ? 'none' : 'auto';
    document.getElementById('pag-next').style.opacity = currentPage === totalPages ? '0.4' : '1';
    document.getElementById('pag-next').style.pointerEvents = currentPage === totalPages ? 'none' : 'auto';
}

function renderPaginationNumbers(totalPages) {
    const container = document.getElementById('pag-numbers');
    container.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.onclick = () => goToPage(i);
        btn.className = i === currentPage
            ? 'text-[14px] cursor-pointer font-medium text-[#959085]'
            : 'text-[14px] cursor-pointer text-[#959085] hover:text-[#3f9a20] transition';
        container.appendChild(btn);
    }
}

function goToPage(page) {
    currentPage = page;
    renderPage();
    document.getElementById('resource-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initialize on load — check URL for a filter param
function getFilterFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('filter') || 'All';
}

const initialFilter = getFilterFromURL();
filterResources(initialFilter);

//featured insights
const slides = [
    {
        category: "Insight",
        heading: "ABA Rate Cuts State Tracker: Where Cuts Are Happening and How Providers Are Responding",
        description: "Seven states have implemented or proposed ABA rate reductions totaling $486 million in annualized revenue loss. Here is what is happening, what it means for your practice, and what you can do about it.",
        image: "./img/GrowthPartners.png",
        link: "#"
    },
    {
        category: "Insight",
        heading: "The ABA Audit Wave: What's Happening, Why Now, and What Comes Next",
        description: "The OIG audit wave has begun. For enterprise ABA providers and the PE firms backing them, the exposure is real.",
        image: "./img/guides.webp",
        link: "#"
    },
    {
        category: "Insight",
        heading: "ABA Industry Report 2026: The State of Revenue Cycle Management",
        description: "A data-driven guide to the billing and RCM challenges facing ABA practices in 2026 — denial rates, authorization trends, and more.",
        image: "./img/LargeGroupPractices.png",
        link: "#"
    }
];

let currentSlide = 0;

function switchSlide(index) {
    currentSlide = index;
    const slide = slides[index];

    document.getElementById('slide-category').textContent = slide.category;
    document.getElementById('slide-heading').textContent = slide.heading;
    document.getElementById('slide-description').textContent = slide.description;
    document.getElementById('slide-image').src = slide.image;
    document.getElementById('slide-link').href = slide.link;

    // Reset dots completely — className replace, no add/remove conflicts
    slides.forEach((_, i) => {
        const dot = document.getElementById(`dot-${i}`);
        if (i === index) {
            dot.className = "h-3 w-10 rounded-full border-1 border-[#9ACF88] bg-[#9ACF88] transition-all";
        } else {
            dot.className = "h-3 w-3 rounded-full border-1 border-[#9ACF88] transition-all";
        }
    });
}

// Optional: auto-advance every 6 seconds
setInterval(() => {
    const next = (currentSlide + 1) % slides.length;
    switchSlide(next);
}, 6000);