// ===== CONFIGURACIÓN =====
const ADMIN_PASSWORD = "3233";
const IMAGE_BASE_PATH = "imagenes-tierlist/juegos/thumbnails/";
const IMAGE_LIST_JSON = "imagenes-tierlist/juegos/thumbnails/imagenes.json";
const GLOBAL_DATA_JSON = "tierlist-data.json";  // Archivo global en la raíz

// Filas por defecto
const DEFAULT_ROWS = [
    { id: "splus", label: "S+", color: "#ff0066" },
    { id: "s", label: "S", color: "#ff6600" },
    { id: "a", label: "A", color: "#ffcc00" },
    { id: "b", label: "B", color: "#66cc00" },
    { id: "c", label: "C", color: "#3399ff" },
    { id: "d", label: "D", color: "#6666cc" },
    { id: "meh", label: "Meh", color: "#888888" }
];

let currentCategory = "games";
let isEditMode = false;
let currentData = null;
let dragSource = null;
let tierlistData = null;

// ===== CARGAR DATOS (PRIMERO EL GLOBAL, LUEGO IMÁGENES SI ES NECESARIO) =====
async function loadData() {
    const container = document.getElementById("tierlistContent");
    if (container) container.innerHTML = '<div style="text-align:center; padding:2rem;">📡 Cargando tierlist...</div>';

    try {
        // 1. Intentar cargar tierlist-data.json (disposición guardada)
        const globalResponse = await fetch(GLOBAL_DATA_JSON);
        if (globalResponse.ok) {
            tierlistData = await globalResponse.json();
            console.log("✅ Tierlist cargada desde archivo global");
            renderTierlist();
            return;
        }
    } catch (e) { /* No existe el archivo */ }

    // 2. No existe tierlist global → cargar imágenes locales y construir por defecto
    await loadImagesFromLocal();
}

async function loadImagesFromLocal() {
    try {
        const response = await fetch(IMAGE_LIST_JSON);
        if (!response.ok) throw new Error("No se encontró imagenes.json");
        const imageFiles = await response.json();

        // Crear estructura nueva
        tierlistData = {
            games: {
                rows: JSON.parse(JSON.stringify(DEFAULT_ROWS)),
                items: { splus: [], s: [], a: [], b: [], c: [], d: [], meh: [] }
            },
            movies: {
                rows: JSON.parse(JSON.stringify(DEFAULT_ROWS)),
                items: { splus: [], s: [], a: [], b: [], c: [], d: [], meh: [] }
            },
            music: {
                rows: JSON.parse(JSON.stringify(DEFAULT_ROWS)),
                items: { splus: [], s: [], a: [], b: [], c: [], d: [], meh: [] }
            }
        };

        // Añadir todas las imágenes a la fila S+ de games
        for (const fileName of imageFiles) {
            const name = fileName.replace(/\.[^/.]+$/, "");
            tierlistData.games.items.splus.push({
                id: `img_${Date.now()}_${Math.random()}_${name}`,
                name: name,
                imgPath: IMAGE_BASE_PATH + fileName
            });
        }

        // Guardar en localStorage como respaldo (no se usa para visitantes)
        localStorage.setItem("tierlist_data_v3", JSON.stringify(tierlistData));
        renderTierlist();
        console.log(`📥 Tierlist creada desde imágenes locales (${imageFiles.length} imágenes)`);
    } catch (error) {
        console.error("Error cargando imágenes locales:", error);
        document.getElementById("tierlistContent").innerHTML = `<div style="text-align:center; padding:2rem;">❌ No se pudo cargar la tierlist.<br>Asegúrate de que existe ${IMAGE_LIST_JSON}</div>`;
    }
}

// ===== RENDERIZADO (igual que antes) =====
function renderTierlist() {
    if (!tierlistData) return;
    currentData = tierlistData[currentCategory];
    const container = document.getElementById("tierlistContent");
    if (!container) return;

    let html = `<table class="tier-table" id="tierTable">`;
    for (let row of currentData.rows) {
        const items = currentData.items[row.id] || [];
        html += `
            <tr class="tier-row" data-row-id="${row.id}">
                <td class="tier-label" style="border-left: 4px solid ${row.color};">
                    ${row.label}
                    ${isEditMode ? `<button class="edit-row-btn" data-row="${row.id}" style="background:none;border:none;color:#aaa;margin-left:5px;cursor:pointer;">✎</button>` : ""}
                </td>
                <td class="tier-items" data-row-id="${row.id}">
        `;
        if (items.length === 0 && !isEditMode) {
            html += `<div style="color:#555; padding: 1rem;">— vacío —</div>`;
        } else {
            for (let idx = 0; idx < items.length; idx++) {
                const item = items[idx];
                html += `
                    <div class="tier-item" draggable="${isEditMode}" data-row="${row.id}" data-index="${idx}" data-id="${item.id}">
                        <img src="${item.imgPath}" 
                            alt="${item.name}" 
                            loading="lazy" 
                            onerror="this.src='https://placehold.co/100x100/2a2438/aaa?text=404'">
                        ${isEditMode ? `<button class="delete-item-btn" data-id="${item.id}" style="position:absolute;top:2px;right:2px;background:rgba(0,0,0,0.7);border:none;color:#e91e14;border-radius:50%;width:18px;height:18px;font-size:10px;cursor:pointer;">✕</button>` : ""}
                    </div>
                `;
            }
        }
        html += `</td></tr>`;
    }
    html += `</table>`;
    container.innerHTML = html;

    if (isEditMode) {
        attachDragEvents();
        attachDeleteEvents();
        attachRowEditEvents();
    }
}

// ===== GUARDAR DISPOSICIÓN ACTUAL COMO JSON GLOBAL =====
function saveToGlobalJSON() {
    const dataStr = JSON.stringify(tierlistData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = GLOBAL_DATA_JSON;
    a.click();
    URL.revokeObjectURL(url);
    alert(`✅ Archivo ${GLOBAL_DATA_JSON} descargado.\n📌 Súbelo a la raíz de tu repositorio en GitHub para que todos lo vean.`);
}

// ===== RESTO DE FUNCIONES (drag & drop, delete, filas, etc.) =====
function attachDragEvents() {
    document.querySelectorAll('.tier-item[draggable="true"]').forEach(item => {
        item.removeEventListener('dragstart', dragStart);
        item.removeEventListener('dragend', dragEnd);
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });
    document.querySelectorAll('.tier-items').forEach(zone => {
        zone.removeEventListener('dragover', dragOver);
        zone.removeEventListener('drop', drop);
        zone.addEventListener('dragover', dragOver);
        zone.addEventListener('drop', drop);
    });
}

function dragStart(e) {
    const target = e.target.closest('.tier-item');
    if (!target) return;
    dragSource = {
        rowId: target.getAttribute('data-row'),
        index: parseInt(target.getAttribute('data-index'))
    };
    e.dataTransfer.setData('text/plain', '');
    target.classList.add('dragging');
}

function dragEnd(e) {
    const target = e.target.closest('.tier-item');
    if (target) target.classList.remove('dragging');
    dragSource = null;
}

function dragOver(e) { e.preventDefault(); }

function drop(e) {
    e.preventDefault();
    if (!dragSource || !isEditMode) return;
    const dropZone = e.target.closest('.tier-items');
    if (!dropZone) return;
    const targetRowId = dropZone.getAttribute('data-row-id');
    const dropTarget = e.target.closest('.tier-item');
    let targetIndex = dropTarget ? parseInt(dropTarget.getAttribute('data-index')) : -1;

    const sourceItems = currentData.items[dragSource.rowId];
    if (!sourceItems || dragSource.index >= sourceItems.length) return;
    const [movedItem] = sourceItems.splice(dragSource.index, 1);
    movedItem.id = `${movedItem.name}_${Date.now()}_${Math.random()}`;

    let targetItems = currentData.items[targetRowId];
    if (!targetItems) targetItems = [];
    if (targetIndex >= 0 && targetIndex <= targetItems.length) {
        targetItems.splice(targetIndex, 0, movedItem);
    } else {
        targetItems.push(movedItem);
    }
    currentData.items[targetRowId] = targetItems;
    renderTierlist();
}

function attachDeleteEvents() {
    document.querySelectorAll('.delete-item-btn').forEach(btn => {
        btn.removeEventListener('click', deleteItem);
        btn.addEventListener('click', deleteItem);
    });
}

function deleteItem(e) {
    e.stopPropagation();
    const itemId = e.target.closest('.delete-item-btn')?.getAttribute('data-id');
    if (!itemId) return;
    for (let rowId in currentData.items) {
        const index = currentData.items[rowId].findIndex(i => i.id === itemId);
        if (index !== -1) {
            currentData.items[rowId].splice(index, 1);
            break;
        }
    }
    renderTierlist();
}

function attachRowEditEvents() {
    document.querySelectorAll('.edit-row-btn').forEach(btn => {
        btn.removeEventListener('click', editRowLabel);
        btn.addEventListener('click', editRowLabel);
    });
}

function editRowLabel(e) {
    const rowId = e.target.closest('.edit-row-btn')?.getAttribute('data-row');
    const row = currentData.rows.find(r => r.id === rowId);
    if (!row) return;
    const newLabel = prompt("Nuevo nombre:", row.label);
    if (newLabel && newLabel.trim()) {
        row.label = newLabel.trim();
        renderTierlist();
    }
}

function addNewRow() {
    const newLabel = prompt("Nombre de la nueva fila:");
    if (!newLabel) return;
    const newId = `row_${Date.now()}`;
    currentData.rows.push({ id: newId, label: newLabel, color: "#888888" });
    currentData.items[newId] = [];
    renderTierlist();
}

function resetCurrentCategory() {
    if (confirm(`¿Resetear "${currentCategory}"? Se perderán los cambios.`)) {
        tierlistData[currentCategory] = {
            rows: JSON.parse(JSON.stringify(DEFAULT_ROWS)),
            items: { splus: [], s: [], a: [], b: [], c: [], d: [], meh: [] }
        };
        renderTierlist();
    }
}

function addImageByPath() {
    const fileName = prompt("Nombre del archivo (ej: mario.png):");
    if (!fileName) return;
    const name = fileName.replace(/\.[^/.]+$/, "");
    const newItem = {
        id: `item_${Date.now()}_${Math.random()}`,
        name: name,
        imgPath: IMAGE_BASE_PATH + fileName
    };
    currentData.items.splus.push(newItem);
    renderTierlist();
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function (m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ===== AUTENTICACIÓN Y UI =====
let authAttempts = 0;

function enterEditMode() {
    if (authAttempts > 2) {
        alert("Demasiados intentos. Recarga la página.");
        return;
    }
    const password = prompt("🔐 Contraseña de edición:");
    if (password === ADMIN_PASSWORD) {
        authAttempts = 0;
        isEditMode = true;
        document.getElementById('editPanel').classList.add('active');
        document.getElementById('editModeBadge').classList.add('active');
        renderTierlist();
    } else if (password !== null) {
        authAttempts++;
        alert(`Contraseña incorrecta. Intentos: ${authAttempts}/3`);
        if (authAttempts < 3) enterEditMode();
    }
}

function exitEditMode() {
    isEditMode = false;
    document.getElementById('editPanel').classList.remove('active');
    document.getElementById('editModeBadge').classList.remove('active');
    renderTierlist();
}

function switchCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cat') === category);
    });
    renderTierlist();
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', async () => {
    // Configurar botones del panel de edición
    const editTrigger = document.getElementById('editTrigger');
    if (editTrigger) editTrigger.addEventListener('click', enterEditMode);

    const exitBtn = document.getElementById('exitEditBtn');
    if (exitBtn) exitBtn.addEventListener('click', exitEditMode);

    const addImageBtn = document.getElementById('addImageBtn');
    if (addImageBtn) addImageBtn.addEventListener('click', () => {
        if (isEditMode) addImageByPath();
    });

    const addRowBtn = document.getElementById('addRowBtn');
    if (addRowBtn) addRowBtn.addEventListener('click', () => {
        if (isEditMode) addNewRow();
    });

    const resetBtn = document.getElementById('resetTierlistBtn');
    if (resetBtn) resetBtn.addEventListener('click', () => {
        if (isEditMode) resetCurrentCategory();
    });

    // Botón nuevo: Guardar disposición global
    const editPanel = document.getElementById('editPanel');
    if (editPanel) {
        const saveGlobalBtn = document.createElement('button');
        saveGlobalBtn.className = 'edit-btn';
        saveGlobalBtn.textContent = '💾 Guardar disposición en servidor (JSON)';
        saveGlobalBtn.onclick = () => {
            if (isEditMode) saveToGlobalJSON();
            else alert("Activa el modo edición primero.");
        };
        editPanel.appendChild(saveGlobalBtn);
    }

    // Cargar datos (desde tierlist-data.json o desde imágenes locales)
    await loadData();

    // Categorías
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => switchCategory(btn.getAttribute('data-cat')));
    });
});