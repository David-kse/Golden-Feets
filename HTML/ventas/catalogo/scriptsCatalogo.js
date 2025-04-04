// Datos expandidos de productos
const products = [
    {
        id: 1,
        name: 'Zapato Casual Oxford',
        description: 'Zapato elegante de cuero para hombre, perfecto para ocasiones formales',
        price: 89.99,
        originalPrice: 119.99,
        discount: true,
        category: 'Hombre',
        brand: 'Golden',
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4.5,
        featured: true,
        image: 'https://i.pinimg.com/736x/ca/28/fa/ca28fa99e8d2754c8b119d7d19852592.jpg'
    },
    {
        id: 2,
        name: 'Zapatilla Running Pro',
        description: 'Zapatilla profesional para running con amortiguación avanzada',
        price: 129.99,
        originalPrice: 129.99,
        discount: false,
        category: 'Deportivos',
        brand: 'Adidas',
        sizes: [38, 39, 40, 41, 42, 43, 44],
        rating: 4.8,
        featured: true,
        image: 'https://i.pinimg.com/736x/93/67/f8/9367f8ff6181f322823cac9d7ef6eb06.jpg'
    },
    {
        id: 3,
        name: 'Zapatilla Daily Comfort',
        description: 'Zapatilla cómoda para uso diario con diseño moderno',
        price: 99.99,
        originalPrice: 124.99,
        discount: true,
        category: 'Casuales',
        brand: 'Adidas',
        sizes: [36, 37, 38, 39, 40, 41, 42],
        rating: 4.3,
        featured: false,
        image: 'https://i.pinimg.com/736x/8a/37/f6/8a37f65d01bb8ae132411a19eb3c5cec.jpg'
    },
    {
        id: 4,
        name: 'Tacón Elegante',
        description: 'Tacón elegante para mujer, ideal para eventos formales',
        price: 79.99,
        originalPrice: 99.99,
        discount: true,
        category: 'Mujer',
        brand: 'Golden',
        sizes: [35, 36, 37, 38, 39],
        rating: 4.6,
        featured: true,
        image: 'https://i.pinimg.com/736x/1b/04/05/1b040589e2335d668eeddb51a3c2173c.jpg'
    },
    {
        id: 5,
        name: 'Zapato Infantil',
        description: 'Zapato cómodo y resistente para niños',
        price: 49.99,
        originalPrice: 49.99,
        discount: false,
        category: 'Niños',
        brand: 'Puma',
        sizes: [28, 29, 30, 31, 32],
        rating: 4.2,
        featured: false,
        image: 'https://i.pinimg.com/736x/d0/8c/07/d08c071136d14f88c1e943d6fbaed59f.jpg'
    },
    {
        id: 6,
        name: 'Deportiva Juvenil',
        description: 'Calzado deportivo ligero para jóvenes',
        price: 69.99,
        originalPrice: 89.99,
        discount: true,
        category: 'Deportivos',
        brand: 'Nike',
        sizes: [36, 37, 38, 39, 40],
        rating: 4.7,
        featured: true,
        image: 'https://i.pinimg.com/736x/e1/92/50/e192502f5aad784df5e0597701a3a5e1.jpg'
    }
];

let cart = JSON.parse(localStorage.getItem('goldenFeetsCart')) || [];
let favorites = JSON.parse(localStorage.getItem('goldenFeetsFavorites')) || [];
let selectedCategory = 'all';
let selectedSizes = [];
let selectedBrands = [];
let maxPrice = 500;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCart();
    setupCategoryListeners();
    setupSizeSelector();
    setupFeaturedProducts();
    setupDarkModeState();
});

// Configurar categorías
function setupCategoryListeners() {
    document.querySelectorAll('.category-list .list-group-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.category-list .list-group-item').forEach(i => {
                i.classList.remove('active');
            });
            this.classList.add('active');
            selectedCategory = this.getAttribute('data-category');
            applyFilters();
        });
    });
    // Activar la categoría "Todos" por defecto
    document.querySelector('[data-category="all"]').classList.add('active');
}

// Configurar selector de tallas
function setupSizeSelector() {
    const sizeSelector = document.getElementById('size-selector');
    const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
    sizes.forEach(size => {
        const btn = document.createElement('div');
        btn.className = 'size-btn';
        btn.textContent = size;
        btn.onclick = function() {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                selectedSizes.push(size);
            } else {
                selectedSizes = selectedSizes.filter(s => s !== size);
            }
        };
        sizeSelector.appendChild(btn);
    });
}

// Configurar productos destacados en carrusel
function setupFeaturedProducts() {
    const featuredProducts = products.filter(p => p.featured); // Asume que 'products' está definido
    const carouselInner = document.querySelector('#productCarousel .carousel-inner');
    const carouselIndicators = document.querySelector('#productCarousel .carousel-indicators');

    carouselInner.innerHTML = ''; // Limpiar contenido previo
    carouselIndicators.innerHTML = ''; // Limpiar indicadores previos

    featuredProducts.forEach((product, index) => {
        // --- Crear Indicador ---
        const indicatorButton = document.createElement('button');
        indicatorButton.type = 'button';
        indicatorButton.dataset.bsTarget = '#productCarousel';
        indicatorButton.dataset.bsSlideTo = index.toString();
        if (index === 0) {
            indicatorButton.classList.add('active');
            indicatorButton.setAttribute('aria-current', 'true');
        }
        indicatorButton.setAttribute('aria-label', `Slide ${index + 1}`);
        carouselIndicators.appendChild(indicatorButton);

        // --- Crear Slide (Item del Carrusel) ---
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        // Añadir un data attribute para fácil selección si es necesario
        carouselItem.dataset.productId = product.id;

        // Contenido del Slide (Nueva Estructura)
        carouselItem.innerHTML = `
            <img src="${product.image}" class="d-block carousel-item-bg-image" alt="${product.name}">
            <div class="carousel-caption-custom">
                <h3 class="animate__animated animate__fadeInDown">${product.name}</h3>
                <p class="animate__animated animate__fadeInUp">${product.description}</p>
                <div>
                    <button onclick="quickViewProduct(${product.id})" class="btn btn-primary animate__animated animate__pulse">
                        <i class="bi bi-eye me-1"></i> Ver Detalles
                    </button>
                    <button onclick="addToCart(${product.id})" class="btn btn-outline-light">
                        <i class="bi bi-cart-plus me-1"></i> Añadir al Carrito
                    </button>
                    ${product.discount ?
                        `<span class="badge bg-danger ms-2 fs-6">OFERTA</span>` : ''
                    }
                </div>
            </div>
        `;

        carouselInner.appendChild(carouselItem);
    });
    
    const carouselElement = document.getElementById('productCarousel');
    if (carouselElement) {
        const carouselInstance = bootstrap.Carousel.getOrCreateInstance(carouselElement);
        // Podrías querer ciclar o pausar aquí si es necesario, por ejemplo:
        // carouselInstance.cycle();
    }
}



// Configurar estado del modo oscuro
function setupDarkModeState() {
    const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        document.getElementById('dark-mode-text').textContent = 'Modo Claro';
    }
}

// Actualizar valor del rango de precios
function updatePriceRange(value) {
    document.getElementById('price-range-value').textContent = `$0 - $${value}`;
    maxPrice = parseInt(value);
}

// Aplicar filtros
function applyFilters() {
    selectedBrands = [];
    document.querySelectorAll('input[id^="brand-"]:checked').forEach(checkbox => {
        selectedBrands.push(checkbox.value);
    });
    let filteredProducts = products;

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
    }

    // Filtrar por precio
    filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);

    // Filtrar por tallas
    if (selectedSizes.length > 0) {
        filteredProducts = filteredProducts.filter(p =>
            p.sizes.some(size => selectedSizes.includes(size))
        );
    }

    // Filtrar por marcas
    if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter(p =>
            selectedBrands.includes(p.brand)
        );
    }

    renderProducts(filteredProducts);
}

// Función de búsqueda
function searchProducts() {
    const searchTerm = document.getElementById('search-box').value.toLowerCase();
    if (!searchTerm.trim()) {
        renderProducts();
        return;
    }

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm)
    );

    renderProducts(filteredProducts);
}

// Mostrar productos
function renderProducts(productList = products) {
    const container = document.getElementById('product-container');
    const noResults = document.getElementById('no-results');

    container.innerHTML = '';

    if (productList.length === 0) {
        noResults.classList.remove('d-none');
        return;
    }

    noResults.classList.add('d-none');
    productList.forEach(product => {
        const isFavorite = favorites.includes(product.id);

        container.innerHTML += `
            <div class="col-md-4">
                <div class="card product-card">
                    ${product.discount ?
                        `<span class="sale-badge">OFERTA</span>` : ''}
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id}, event)">
                        <i class="bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}"></i>
                    </button>
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                    ${product.discount ?
                                    `<span class="text-decoration-line-through text-muted me-2">$${product.originalPrice.toFixed(2)}</span>` : ''}
                                    <span class="h5 mb-0">$${product.price.toFixed(2)}</span>
                                </div>
                                <div>
                                    ${Array(Math.floor(product.rating)).fill().map(() => `<i class="bi bi-star-fill text-warning"></i>`).join('')}
                                    ${product.rating % 1 !== 0 ?
                                    `<i class="bi bi-star-half text-warning"></i>` : ''}
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <button onclick="addToCart(${product.id})" class="btn btn-primary btn-sm btn-add-cart">
                                    <i class="bi bi-cart-plus me-1"></i>Añadir
                                </button>
                                <button onclick="quickViewProduct(${product.id})" class="btn btn-outline-secondary btn-sm">
                                    <i class="bi bi-eye me-1"></i>Ver
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    });
}

// Vista rápida de producto
function quickViewProduct(productId) {
    console.log('quickViewProduct llamada con ID:', productId); // DEBUG: Verifica que se llama

    const product = products.find(p => p.id === productId);
    console.log('Producto encontrado:', product); // DEBUG: Verifica que encuentra el producto

    if (!product) {
        console.error('Producto no encontrado con ID:', productId);
        return; // Salir si no se encuentra el producto
    }

    const modal = document.getElementById('productModal');
    console.log('Elemento Modal:', modal); // DEBUG: Verifica que encuentra el div del modal

    if (!modal) {
        console.error('Elemento Modal #productModal no encontrado en el HTML.');
        return; // Salir si no existe el modal
    }

    const modalTitle = document.getElementById('modal-product-title') || document.getElementById('productModalLabel'); // Usar el ID correcto del título
    const modalContent = document.getElementById('modal-product-content');

    if (!modalTitle || !modalContent) {
         console.error('Elementos internos del modal (título o contenido) no encontrados.');
         return;
    }

    // --- Generación del Contenido del Modal ---
    // Asegúrate que esta parte no tenga errores y que los IDs/clases usados
    // para cantidad (+/-) coincidan si los tienes dentro del modal.
    modalTitle.textContent = product.name;
    modalContent.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${product.image}" class="img-fluid rounded mb-3 mb-md-0" alt="${product.name}">
            </div>
            <div class="col-md-6">
                <p>${product.description}</p>
                <div class="mb-3">
                    ${product.discount ? `<span class="text-decoration-line-through text-muted me-2">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    <span class="fs-4 fw-bold">$${product.price.toFixed(2)}</span>
                </div>
                <div class="mb-3">
                    <p class="mb-1 fw-bold">Tallas disponibles:</p>
                    <div class="d-flex flex-wrap gap-1">
                        ${product.sizes.map(size => `<div class="size-btn">${size}</div>`).join('')}
                    </div>
                </div>
                <div class="mb-3">
                    <p><span class="fw-bold">Marca:</span> ${product.brand}</p>
                </div>
                <div class="mb-3">
                    <p class="mb-0"><span class="fw-bold">Calificación:</span>
                        ${Array(Math.floor(product.rating)).fill().map(() => `<i class="bi bi-star-fill text-warning"></i>`).join('')}
                        ${product.rating % 1 !== 0 ? `<i class="bi bi-star-half text-warning"></i>` : ''}
                        <span class="ms-1 text-muted">(${product.rating})</span>
                    </p>
                </div>
                <div class="row align-items-center">
                     <div class="col-auto mb-2 mb-md-0">
                        <label for="product-quantity-modal" class="form-label fw-bold mb-1">Cantidad:</label>
                        <div class="input-group input-group-sm" style="width: 100px;">
                            <button class="btn btn-outline-secondary btn-quantity" type="button" onclick="decrementQuantityModal()">-</button>
                            <input type="text" class="form-control text-center" id="product-quantity-modal" value="1" readonly>
                            <button class="btn btn-outline-secondary btn-quantity" type="button" onclick="incrementQuantityModal()">+</button>
                        </div>
                     </div>
                     <div class="col mt-3 mt-md-0">
                         <button onclick="addToCart(${product.id}, getQuantityModal())" class="btn btn-primary w-100">
                            <i class="bi bi-cart-plus me-1"></i>Añadir al Carrito
                         </button>
                     </div>
                </div>
            </div>
        </div>
    `;
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

// Controles de cantidad
function incrementQuantityModal() {
    const input = document.getElementById('product-quantity-modal');
    if (input) input.value = parseInt(input.value) + 1;
}

function decrementQuantityModal() {
    const input = document.getElementById('product-quantity-modal');
    if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function getQuantityModal() {
    const input = document.getElementById('product-quantity-modal');
    return input ? parseInt(input.value) : 1; // Devuelve 1 si no encuentra el input
}

// Añadir al carrito
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    localStorage.setItem('goldenFeetsCart', JSON.stringify(cart));
    updateCart();
    showNotification('Producto añadido al carrito');
}

// Actualizar carrito
function updateCart() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartEmptyMessage = document.getElementById('cart-empty-message');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    if (totalItems === 0) {
        cartEmptyMessage.classList.remove('d-none');
        cartItemsContainer.innerHTML = '';
        return;
    }

    cartEmptyMessage.classList.add('d-none');
    let cartHTML = '';
    let totalAmount = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        cartHTML += `
             <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-4">
                        <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
                    </div>
                    <div class="col-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">$${item.price.toFixed(2)} x ${item.quantity}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="fw-bold mb-0">$${(item.price * item.quantity).toFixed(2)}</p>
                                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        `;
    });

    cartHTML += `
        <div class="d-flex justify-content-between align-items-center mt-3 mb-3">
            <span class="h5">Total:</span>
            <span class="h5">$${totalAmount.toFixed(2)}</span>
        </div>
        <button class="btn btn-primary w-100 mb-2">Proceder al Pago</button>
        <button class="btn btn-outline-secondary w-100" onclick="clearCart()">Vaciar Carrito</button>
    `;
    cartItemsContainer.innerHTML = cartHTML;
}

// Quitar del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('goldenFeetsCart', JSON.stringify(cart));
    updateCart();
    showNotification('Producto eliminado del carrito');
}

// Vaciar carrito
function clearCart() {
    cart = [];
    localStorage.setItem('goldenFeetsCart', JSON.stringify(cart));
    updateCart();
    showNotification('Carrito vaciado');
}

// Toggle favorito
function toggleFavorite(productId, event) {
    event.stopPropagation();
    const index = favorites.indexOf(productId);

    if (index === -1) {
        favorites.push(productId);
        event.currentTarget.classList.add('active');
        event.currentTarget.innerHTML = '<i class="bi bi-heart-fill"></i>';
        showNotification('Añadido a favoritos');
    } else {
        favorites.splice(index, 1);
        event.currentTarget.classList.remove('active');
        event.currentTarget.innerHTML = '<i class="bi bi-heart"></i>';
        showNotification('Eliminado de favoritos');
    }

    localStorage.setItem('goldenFeetsFavorites', JSON.stringify(favorites));
}

// Mostrar notificación
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');

    notificationMessage.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Toggle modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');

    document.getElementById('dark-mode-text').textContent = isDarkMode ? 'Modo Claro' : 'Modo Oscuro';
    localStorage.setItem('darkModeEnabled', isDarkMode);
}
