// ===== CONFIGURACIÓN =====
const ADMIN_PASSWORD = "3233";

// Estructura de filas por defecto
const DEFAULT_ROWS = [
    { id: "splus", label: "S+", color: "#ff0066" },
    { id: "s", label: "S", color: "#ff6600" },
    { id: "a", label: "A", color: "#ffcc00" },
    { id: "b", label: "B", color: "#66cc00" },
    { id: "c", label: "C", color: "#3399ff" },
    { id: "d", label: "D", color: "#6666cc" },
    { id: "e", label: "E", color: "#9933cc" },
    { id: "meh", label: "Meh", color: "#888888" }
];

const DEFAULT_TIERLISTS = {
    games: {
        rows: JSON.parse(JSON.stringify(DEFAULT_ROWS)),
        items: { splus: [], s: [], a: [], b: [], c: [], d: [], e: [], meh: [] }
    },
    movies: {
        rows: JSON.parse(JSON.stringify(DEFAULT_ROWS)),
        items: { splus: [], s: [], a: [], b: [], c: [], d: [], e: [], meh: [] }
    },
    music: {
        rows: JSON.parse(JSON.stringify(DEFAULT_ROWS)),
        items: { splus: [], s: [], a: [], b: [], c: [], d: [], e: [], meh: [] }
    }
};

// ===== ESTADO GLOBAL =====
let currentCategory = "games";
let isEditMode = false;
let currentData = null;
let dragSource = null;

// Cargar datos
function loadTierlistData() {
    const saved = localStorage.getItem("tierlist_data");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            for (let cat of ["games", "movies", "music"]) {
                if (!parsed[cat]) parsed[cat] = JSON.parse(JSON.stringify(DEFAULT_TIERLISTS[cat]));
            }
            return parsed;
        } catch(e) {}
    }
    return JSON.parse(JSON.stringify(DEFAULT_TIERLISTS));
}

function saveTierlistData(data) {
    localStorage.setItem("tierlist_data", JSON.stringify(data));
}

let tierlistData = loadTierlistData();

// ===== RENDERIZADO =====
function renderTierlist() {
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
                    ${items.map((item, idx) => `
                        <div class="tier-item" draggable="${isEditMode}" data-row="${row.id}" data-index="${idx}" data-id="${item.id}">
                            <img src="${item.imgData}" alt="${item.name}" style="width:100%;aspect-ratio:1/1;object-fit:cover;">
                            <div class="item-name">${item.name}</div>
                            ${isEditMode ? `<button class="delete-item-btn" data-id="${item.id}" style="position:absolute;top:2px;right:2px;background:rgba(0,0,0,0.7);border:none;color:#e91e14;border-radius:50%;width:18px;height:18px;font-size:10px;cursor:pointer;">✕</button>` : ""}
                        </div>
                    `).join('')}
                </td>
            </tr>
        `;
    }
    html += `</table>`;
    container.innerHTML = html;

    if (isEditMode) {
        attachDragEvents();
        attachDeleteEvents();
        attachRowEditEvents();
    }
}

// ===== DRAG & DROP =====
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
    saveTierlistData(tierlistData);
    renderTierlist();
}

// ===== ELIMINAR =====
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
    saveTierlistData(tierlistData);
    renderTierlist();
}

// ===== EDITAR FILA =====
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
        saveTierlistData(tierlistData);
        renderTierlist();
    }
}

// ===== SUBIR MÚLTIPLES IMÁGENES (SIN NOMBRAR, SIN PROMPTS MOLESTOS) =====
let pendingFiles = [];
let pendingTargetRowId = null;

function setupMultipleImageUpload() {
    const fileInput = document.getElementById('imageUpload');
    fileInput.multiple = true;
    
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
        if (files.length === 0) return;
        
        pendingFiles = files;
        
        // Mostrar selector de fila UNA SOLA VEZ
        const rowOptions = currentData.rows.map((row, idx) => `${idx + 1}. ${row.label}`).join('\n');
        const rowIndex = prompt(`📁 ${files.length} imágenes seleccionadas\n\n¿A qué fila quieres añadirlas?\n\n${rowOptions}\n\nEscribe el número (1-${currentData.rows.length}):`, "1");
        
        let targetRowId = null;
        if (rowIndex && !isNaN(parseInt(rowIndex))) {
            const idx = parseInt(rowIndex) - 1;
            if (idx >= 0 && idx < currentData.rows.length) {
                targetRowId = currentData.rows[idx].id;
            }
        }
        if (!targetRowId) targetRowId = currentData.rows[0].id;
        pendingTargetRowId = targetRowId;
        
        // Procesar todas las imágenes
        processNextImage();
        fileInput.value = '';
    });
}

function processNextImage() {
    if (pendingFiles.length === 0) {
        saveTierlistData(tierlistData);
        renderTierlist();
        const rowLabel = currentData.rows.find(r => r.id === pendingTargetRowId)?.label;
        alert(`✅ Imágenes añadidas a "${rowLabel}"`);
        return;
    }
    
    const file = pendingFiles.shift();
    const reader = new FileReader();
    reader.onload = (ev) => {
        // Usar nombre del archivo sin extensión
        const name = file.name.replace(/\.[^/.]+$/, "");
        
        const newItem = {
            id: `item_${Date.now()}_${Math.random()}`,
            name: name,
            imgData: ev.target.result
        };
        
        if (!currentData.items[pendingTargetRowId]) currentData.items[pendingTargetRowId] = [];
        currentData.items[pendingTargetRowId].push(newItem);
        
        // Procesar siguiente
        processNextImage();
    };
    reader.readAsDataURL(file);
}

// ===== OTRAS FUNCIONES =====
function addNewRow() {
    const newLabel = prompt("Nombre de la nueva fila:");
    if (!newLabel) return;
    const newId = `row_${Date.now()}`;
    currentData.rows.push({ id: newId, label: newLabel, color: "#888888" });
    currentData.items[newId] = [];
    saveTierlistData(tierlistData);
    renderTierlist();
}

function resetCurrentCategory() {
    if (confirm(`¿Resetear "${currentCategory}"? Se perderán los cambios.`)) {
        tierlistData[currentCategory] = JSON.parse(JSON.stringify(DEFAULT_TIERLISTS[currentCategory]));
        saveTierlistData(tierlistData);
        renderTierlist();
    }
}

// ===== AUTENTICACIÓN =====
let authAttempts = 0;

function enterEditMode() {
    // Evitar múltiples prompts si el usuario cancela
    if (authAttempts > 2) {
        alert("Demasiados intentos. Recarga la página para volver a intentar.");
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
        alert(`Contraseña incorrecta. Te quedan ${3 - authAttempts} intentos.`);
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
document.addEventListener('DOMContentLoaded', () => {
    renderTierlist();
    setupMultipleImageUpload();
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => switchCategory(btn.getAttribute('data-cat')));
    });
    
    document.getElementById('editTrigger').addEventListener('click', enterEditMode);
    document.getElementById('exitEditBtn').addEventListener('click', exitEditMode);
    document.getElementById('addImageBtn').addEventListener('click', () => {
        if (isEditMode) document.getElementById('imageUpload').click();
    });
    document.getElementById('addRowBtn').addEventListener('click', () => {
        if (isEditMode) addNewRow();
    });
    document.getElementById('resetTierlistBtn').addEventListener('click', () => {
        if (isEditMode) resetCurrentCategory();
    });
});