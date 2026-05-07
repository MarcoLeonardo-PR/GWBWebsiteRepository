// DOM elements
const contentContainer = document.getElementById('dynamicContent');
const tabButtons = document.querySelectorAll('.tab-btn');

// ------------------- RENDER FUNCTIONS -------------------
function renderHome() {
    const homeHTML = `
        <div class="home-wrapper">
            <img class="medium-photo fade-item img-fade" 
                 src="https://picsum.photos/id/104/400/400" 
                 alt="Imagen artística digital - perfil creativo"
                 loading="eager">
            <p class="home-description fade-item text-fade">
                ✨ Exploradora del arte digital & narrativas visuales. <br>
                Bienvenidx a mi rincón donde la creatividad se encuentra con la estética oscura.
                Cada proyecto nace de la pasión por lo extraño y hermoso.
            </p>
            <div class="social-icons-row fade-item social-fade">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Twitter / X">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="YouTube">
                    <i class="fab fa-youtube"></i>
                </a>
            </div>
        </div>
    `;
    contentContainer.innerHTML = homeHTML;
}

function renderArt() {
    const artHTML = `
        <div class="placeholder-page fade-item" style="animation: smoothRise 0.6s forwards;">
            <i class="fas fa-palette"></i>
            <h2>🎭 Art Gallery</h2>
            <p>Próximamente podrás explorar ilustraciones, pinturas digitales y proyectos multidisciplinares.<br>
            <span style="font-size:0.9rem; opacity:0.7;">✨ mientras tanto, sígueme en redes para adelantos ✨</span></p>
            <div style="margin-top: 12px;">
                <i class="fas fa-arrow-down" style="color:#A970F0;"></i>
            </div>
        </div>
    `;
    contentContainer.innerHTML = artHTML;
}

function renderTierlist() {
    const tierHTML = `
        <div class="placeholder-page fade-item" style="animation: smoothRise 0.6s forwards;">
            <i class="fas fa-layer-group"></i>
            <h2>📋 Tierlist Studio</h2>
            <p>Espacio para rankings colaborativos, templates y comunidades creativas.<br>
            🔜 Próximamente rankings de arte, personajes y colecciones.</p>
            <div style="margin-top: 16px;">
                <span style="background:#23253A; padding:6px 14px; border-radius:50px; font-size:0.8rem;">en desarrollo</span>
            </div>
        </div>
    `;
    contentContainer.innerHTML = tierHTML;
}

// Cambiar de pestaña
function switchTab(tabId) {
    tabButtons.forEach(btn => {
        const btnTab = btn.getAttribute('data-tab');
        if (btnTab === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (tabId === 'home') {
        renderHome();
    } else if (tabId === 'art') {
        renderArt();
    } else if (tabId === 'tierlist') {
        renderTierlist();
    }
}

// Event listeners
tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const tabId = button.getAttribute('data-tab');
        if (tabId) switchTab(tabId);
    });
});

// Inicializar con Home
switchTab('home');