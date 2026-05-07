// Elementos del DOM
const contentContainer = document.getElementById('dynamicContent');
const tabButtons = document.querySelectorAll('.tab-btn');

// --- RENDER HOME (CON LOS NOMBRES DE IMAGENES: fursona, twitter, discord, random)
// NOTA: Para las imágenes de redes sociales, usamos íconos de FontAwesome con los nombres visuales
// La imagen principal se llama "fursona.jpg" - Cambia la ruta por tu imagen real

function renderHome() {
    const homeHTML = `
        <div class="home-container">
            <!-- FOTO MEDIANA: nombre "fursona" -->
            <img class="profile-photo animate-up delay-1" 
                 src="imagenes/fursona.png"
                 alt="fursona"
                 title="Mi fursona"
                 onerror="this.src='https://picsum.photos/id/169/400/400'">
            
            <!-- TEXTO DEBAJO -->
            <div class="bio-text animate-up delay-2">
                <p>✨ <span class="highlight">Bienvenidx a mi rincón oscuro</span> ✨<br>
                Artista digital | Creador de mundos | Entusiasta del arte conceptual.<br>
                <span style="font-size:0.9rem;">〚 Estética nocturna y vibras místicas 〛</span></p>
            </div>
            
            <!-- 3 ICONOS SOCIALES CON NOMBRES: twitter, discord, random -->
            <div class="social-grid">
                <!-- Twitter -->
                <a href="https://twitter.com/" target="_blank" class="social-icon animate-left delay-3" title="Twitter">
                    <i class="fab fa-twitter"></i>
                    <span>twitter</span>
                </a>
                <!-- Discord -->
                <a href="https://discord.com/" target="_blank" class="social-icon animate-up delay-3" title="Discord">
                    <i class="fab fa-discord"></i>
                    <span>discord</span>
                </a>
                <!-- Random (según lo pedido: "random" - puede ser un enlace a portfolio o random art) -->
                <a href="https://www.artstation.com/" target="_blank" class="social-icon animate-right delay-3" title="Random">
                    <i class="fas fa-random"></i>
                    <span>random</span>
                </a>
            </div>
        </div>
    `;
    contentContainer.innerHTML = homeHTML;
}

// --- RENDER ART (placeholder bonito)
function renderArt() {
    const artHTML = `
        <div class="placeholder-art animate-up">
            <i class="fas fa-paintbrush-fine"></i>
            <i class="fas fa-palette" style="margin-left: 10px;"></i>
            <h2>🎨 ART STUDIO</h2>
            <p>Galería en construcción... próximamente ilustraciones,<br>
            comisiones y procesos creativos.</p>
            <div style="margin-top: 20px;">
                <span style="background:#1e1e30; padding:6px 16px; border-radius:40px; font-size:0.8rem;">🌟 sneak peek pronto 🌟</span>
            </div>
        </div>
    `;
    contentContainer.innerHTML = artHTML;
}

// --- RENDER TIERLIST (placeholder)
function renderTierlist() {
    const tierHTML = `
        <div class="placeholder-tier animate-up">
            <i class="fas fa-chart-simple"></i>
            <i class="fas fa-ranking-star"></i>
            <h2>📊 TIERLIST</h2>
            <p>Rankings de personajes, juegos y arte.<br>
            ¡Próximamente podrás crear y compartir tus propias tierlists!</p>
            <div style="margin-top: 20px;">
                <i class="fas fa-arrow-right" style="color:#c084fc;"></i> <span style="color:#aaa;">en desarrollo activo</span>
            </div>
        </div>
    `;
    contentContainer.innerHTML = tierHTML;
}

// --- CAMBIO DE PESTAÑA
function switchTab(tabId) {
    // actualizar clases activas
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // renderizar según la pestaña
    if (tabId === 'home') {
        renderHome();
    } else if (tabId === 'art') {
        renderArt();
    } else if (tabId === 'tierlist') {
        renderTierlist();
    }
}

// --- EVENTOS DE LAS PESTAÑAS
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        if (tabId) switchTab(tabId);
    });
});

// --- INICIALIZAR CON HOME Y SMOOTH IN GARANTIZADO
switchTab('home');

// Pequeño extra: forzar reflow para asegurar animaciones en carga
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    // confirmar que los elementos tengan las animaciones visibles
    const animatedElements = document.querySelectorAll('.animate-up, .animate-left, .animate-right');
    if (animatedElements.length === 0 && contentContainer.innerHTML.includes('home-container')) {
        renderHome();
    }
});