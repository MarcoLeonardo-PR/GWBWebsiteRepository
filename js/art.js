// DATOS: artistas y sus obras
const artistsData = [
    {
        name: "Alien Doge.",
        previewImage: "imagenes/aliendoge1.png",
        artworks: [
            "imagenes/aliendoge1.png",
            "imagenes/aliendoge2.png",
            "imagenes/aliendoge3.JPEG"
        ]
    },
    {
        name: "Button.",
        previewImage: "imagenes/button1.png",
        artworks: [
            "imagenes/button1.png"
        ]
    },
    {
        name: "Chuchu.",
        previewImage: "imagenes/chuchu1.jpg",
        artworks: [
            "imagenes/chuchu1.jpg",
            "imagenes/chuchu2.jpg"
        ]
    },
    {
        name: "Gabby.",
        previewImage: "imagenes/gabby1.png",
        artworks: [
            "imagenes/gabby1.png",
            "imagenes/gabby2.png",
            "imagenes/gabby3.png"
        ]
    },
    {
        name: "Ghost.",
        previewImage: "imagenes/ghost1.jpg",
        artworks: [
            "imagenes/ghost1.jpg"
        ]
    },
    {
        name: "Glasslake.",
        previewImage: "imagenes/glasslake1.png",
        artworks: [
            "imagenes/glasslake1.png"
        ]
    },
    {
        name: "Goathic.",
        previewImage: "imagenes/goathic1.jpg",
        artworks: [
            "imagenes/goathic1.jpg",
            "imagenes/goathic2.jpeg"
        ]
    },
    {
        name: "Itxi.",
        previewImage: "imagenes/itxi1.png",
        artworks: [
            "imagenes/itxi1.png"
        ]
    },
    {
        name: "Jackstay.",
        previewImage: "imagenes/jackstay1.png",
        artworks: [
            "imagenes/jackstay1.png"
        ]
    },
    {
        name: "Jalmneo.",
        previewImage: "imagenes/jalmneo1.png",
        artworks: [
            "imagenes/jalmneo1.png",
            "imagenes/jalmneo2.png",
            "imagenes/jalmneo3.png"
        ]
    },
    {
        name: "Kitsunedaxii.",
        previewImage: "imagenes/kitsunedaxil1.png",
        artworks: [
            "imagenes/kitsunedaxil1.png",
            "imagenes/kitsunedaxil2.png",
            "imagenes/kitsunedaxil3.png",
            "imagenes/kitsunedaxil4.png",
            "imagenes/kitsunedaxil5.png",
            "imagenes/kitsunedaxil6.jpeg"
        ]
    },
    {
        name: "Kremita.",
        previewImage: "imagenes/kremita1.png",
        artworks: [
            "imagenes/kremita1.PNG",
            "imagenes/kremita2.png"
        ]
    },
    {
        name: "Ligermaws.",
        previewImage: "imagenes/ligermaws1.png",
        artworks: [
            "imagenes/ligermaws1.png",
            "imagenes/ligermaws2.png",
            "imagenes/ligermaws3.png",
            "imagenes/ligermaws4.png",
            "imagenes/ligermaws5.png",
            "imagenes/ligermaws6.png"
        ]
    },
    {
        name: "Lordy.",
        previewImage: "imagenes/lordy1.jpeg",
        artworks: [
            "imagenes/lordy1.jpeg"
        ]
    },
    {
        name: "Mega.",
        previewImage: "imagenes/mega1.png",
        artworks: [
            "imagenes/mega1.png"
        ]
    },
    {
        name: "Meinei.",
        previewImage: "imagenes/meinei1.png",
        artworks: [
            "imagenes/meinei1.png"
        ]
    },
    {
        name: "Melfunnysmel.",
        previewImage: "imagenes/melfunnysmel.png",
        artworks: [
            "imagenes/melfunnysmel.png"
        ]
    },
    {
        name: "Miapinky.",
        previewImage: "imagenes/miapinky1.png",
        artworks: [
            "imagenes/miapinky1.png"
        ]
    },
    {
        name: "Mitchdemidevil.",
        previewImage: "imagenes/mitchdemidevil1.png",
        artworks: [
            "imagenes/mitchdemidevil1.png"
        ]
    },
    {
        name: "MtCerber.",
        previewImage: "imagenes/mtcerber1.PNG",
        artworks: [
            "imagenes/mtcerber1.PNG",
            "imagenes/mtcerber2.png",
            "imagenes/mtcerber3.png",
            "imagenes/mtcerber4.png"
        ]
    },
    {
        name: "OnedayT.",
        previewImage: "imagenes/onedayt1.png",
        artworks: [
            "imagenes/onedayt1.png"
        ]
    },
    {
        name: "Pandobo.",
        previewImage: "imagenes/pandobo1.webp",
        artworks: [
            "imagenes/pandobo1.webp",
            "imagenes/pandobo2.png",
            "imagenes/pandobo3.png",
            "imagenes/pandobo4.png",
            "imagenes/pandobo5.png",
            "imagenes/pandobo6.png",
            "imagenes/pandobo7.png",
            "imagenes/pandobo8.png",
            "imagenes/pandobo9.png",
            "imagenes/pandobo10.jfif",
            "imagenes/pandobo11.png",
            "imagenes/pandobo12.png",
            "imagenes/pandobo13.jpg",
            "imagenes/pandobo14.jpeg"
        ]
    },
    {
        name: "Richie.",
        previewImage: "imagenes/richie1.png",
        artworks: [
            "imagenes/richie1.png",
            "imagenes/richie2.png",
            "imagenes/richie3.png",
            "imagenes/richie4.jpeg",
            "imagenes/richie5.png",
            "imagenes/richie6.jpeg",
            "imagenes/richie7.png"
        ]
    },
    {
        name: "Skittlebeast.",
        previewImage: "imagenes/skittlebeast1.png",
        artworks: [
            "imagenes/skittlebeast1.png",
            "imagenes/skittlebeast2.png",
            "imagenes/skittlebeast3.png"
        ]
    },
    {
        name: "Smokyjack.",
        previewImage: "imagenes/smokyjack1.gif",
        artworks: [
            "imagenes/smokyjack1.gif",
            "imagenes/smokyjack2.gif"
        ]
    },
    {
        name: "Snickersnackz.",
        previewImage: "imagenes/snickersnackz1.png",
        artworks: [
            "imagenes/snickersnackz1.png"
        ]
    },
    {
        name: "Tharoscoyote.",
        previewImage: "imagenes/tharoscoyote1.png",
        artworks: [
            "imagenes/tharoscoyote1.png",
            "imagenes/tharoscoyote2.gif"
        ]
    },
    {
        name: "Viejillox.",
        previewImage: "imagenes/viejillox1.png",
        artworks: [
            "imagenes/viejillox1.png"
        ]
    },
    {
        name: "Vixitrium.",
        previewImage: "imagenes/vixitrium1.png",
        artworks: [
            "imagenes/vixitrium1.png",
            "imagenes/vixitrium2.png",
            "imagenes/vixitrium3.png",
            "imagenes/vixitrium4.png"
        ]
    },
    {
        name: "Yoruh.",
        previewImage: "imagenes/yoruh1.jpg",
        artworks: [
            "imagenes/yoruh1.jpg"
        ]
    },
    {
        name: "Ziradawn.",
        previewImage: "imagenes/ziradawn1.jfif",
        artworks: [
            "imagenes/ziradawn1.jfif"
        ]
    }
];

// Estado actual
let currentView = 'artists';
let currentArtistIndex = null;
let currentArtistData = null;

// Estado del modal
let currentModalImages = [];
let currentModalIndex = 0;

// Elementos DOM
const galleryGrid = document.getElementById('galleryGrid');
const galleryTitle = document.getElementById('galleryTitle');
const gallerySubtitle = document.getElementById('gallerySubtitle');
const backButton = document.getElementById('backButton');

// Modal
const modal = document.getElementById('imageModal');
const modalMainImage = document.getElementById('modalMainImage');
const closeModal = document.querySelector('.modal-close');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');
const modalThumbnails = document.getElementById('modalThumbnails');

// --- Renderizar artistas ---
function renderArtists() {
    let html = '';
    for (let i = 0; i < artistsData.length; i++) {
        const artist = artistsData[i];
        html += `
            <div class="artist-card" data-artist-index="${i}">
                <div class="artist-image-wrapper">
                    <img class="artist-image" src="${artist.previewImage}" alt="${artist.name}" loading="lazy">
                    <div class="artist-hover-name">
                        <span>${artist.name}</span>
                    </div>
                </div>
                <div class="artist-name-below">
                    <span>${artist.name}</span>
                </div>
            </div>
        `;
    }
    galleryGrid.innerHTML = html;
    galleryGrid.classList.remove('artworks-grid');
    galleryGrid.classList.add('gallery-grid');
}

// --- Abrir modal con la primera imagen del artista (o la que se clickeó) ---
function openModalWithArtist(artistData, startIndex = 0) {
    currentModalImages = artistData.artworks;
    currentModalIndex = startIndex;
    updateModalContent();
    modal.style.display = 'flex';
}

// Actualizar imagen principal y miniaturas
function updateModalContent() {
    if (currentModalImages.length > 0 && currentModalIndex >= 0 && currentModalIndex < currentModalImages.length) {
        modalMainImage.src = currentModalImages[currentModalIndex];
        renderThumbnails();
    }
}

// Renderizar miniaturas abajo
function renderThumbnails() {
    if (!modalThumbnails) return;

    let thumbsHtml = '';
    for (let i = 0; i < currentModalImages.length; i++) {
        const isActive = (i === currentModalIndex);
        thumbsHtml += `
            <img class="modal-thumb ${isActive ? 'active' : ''}" 
                 src="${currentModalImages[i]}" 
                 data-index="${i}"
                 alt="miniatura">
        `;
    }
    modalThumbnails.innerHTML = thumbsHtml;

    // Añadir eventos a las miniaturas
    document.querySelectorAll('.modal-thumb').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            const index = parseInt(thumb.getAttribute('data-index'));
            if (!isNaN(index)) {
                currentModalIndex = index;
                modalMainImage.src = currentModalImages[currentModalIndex];
                updateActiveThumbnail();
            }
            e.stopPropagation();
        });
    });
}

function updateActiveThumbnail() {
    document.querySelectorAll('.modal-thumb').forEach((thumb, idx) => {
        if (idx === currentModalIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

function nextImage() {
    if (currentModalIndex < currentModalImages.length - 1) {
        currentModalIndex++;
        modalMainImage.src = currentModalImages[currentModalIndex];
        updateActiveThumbnail();
    }
}

function prevImage() {
    if (currentModalIndex > 0) {
        currentModalIndex--;
        modalMainImage.src = currentModalImages[currentModalIndex];
        updateActiveThumbnail();
    }
}

function closeModalFunction() {
    modal.style.display = 'none';
    currentModalImages = [];
    currentModalIndex = 0;
}

// --- Click en artista: abre modal con sus obras ---
function onArtistClick(artistIndex) {
    const artist = artistsData[artistIndex];
    if (artist && artist.artworks.length > 0) {
        openModalWithArtist(artist, 0);
    }
}

// --- Volver a artistas (si es que se necesita, pero con el nuevo flujo quizás no) ---
function backToArtists() {
    currentView = 'artists';
    currentArtistIndex = null;
    currentArtistData = null;
    galleryTitle.textContent = 'Artistas';
    gallerySubtitle.textContent = 'selecciona un artista para ver su obra';
    backButton.style.display = 'none';
    renderArtists();
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    renderArtists();

    // Click en grid para detectar click en artista
    galleryGrid.addEventListener('click', (e) => {
        const artistCard = e.target.closest('.artist-card');
        if (artistCard) {
            const index = artistCard.getAttribute('data-artist-index');
            if (index !== null) {
                onArtistClick(parseInt(index));
            }
        }
    });

    // Botón volver (oculto por defecto en este nuevo flujo, pero lo dejamos)
    if (backButton) {
        backButton.addEventListener('click', backToArtists);
        backButton.style.display = 'none'; // Oculto porque ya no es necesario
    }

    // Modal eventos
    if (closeModal) closeModal.addEventListener('click', closeModalFunction);
    if (modalPrev) modalPrev.addEventListener('click', prevImage);
    if (modalNext) modalNext.addEventListener('click', nextImage);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModalFunction();
        });
    }

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') prevImage();
            else if (e.key === 'ArrowRight') nextImage();
            else if (e.key === 'Escape') closeModalFunction();
        }
    });

    // ===== SMOOTH IN AL HACER SCROLL =====
    // Seleccionamos todas las tarjetas de artista
    const artistCards = document.querySelectorAll('.artist-card');

    // Configuración del observador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase para la animación
                entry.target.classList.add('scroll-visible');
                // Deja de observar este elemento (solo queremos que anime una vez)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,      // Cuando el 15% del elemento sea visible
        rootMargin: '0px 0px 20px 0px'  // Pequeño margen inferior para que empiece antes
    });

    // Detectar nuevas tarjetas que se añadan dinámicamente (cuando se cambie de artista a galería no afecta, pero por si acaso)
    function observeArtistCards() {
        const cards = document.querySelectorAll('.artist-card:not(.scroll-visible)');
        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // Observar las tarjetas existentes
    observeArtistCards();

    // También observar cambios en el grid (por si redibujamos la galería)
    const gridObserver = new MutationObserver(() => {
        observeArtistCards();
    });
    gridObserver.observe(galleryGrid, { childList: true, subtree: true });

});