document.addEventListener('DOMContentLoaded', function() {

    // ========== DATOS ==========
    const defaultProducts = [
        { id: 1, nombre: 'Vitamina C 1000mg', categoria: 'Suplementos', precio: 299, stock: 50, descripcion: 'Refuerza tu sistema inmune.', imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop', rating: 4.5 },
        { id: 2, nombre: 'Termómetro digital', categoria: 'Equipo médico', precio: 450, stock: 30, descripcion: 'Preciso y rápido, ideal para casa.', imagen: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop', rating: 4.8 },
        { id: 3, nombre: 'Gel antibacterial', categoria: 'Cuidado personal', precio: 120, stock: 100, descripcion: 'Protección eficaz contra gérmenes.', imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop', rating: 4.2 },
        { id: 4, nombre: 'Multivitamínico diario', categoria: 'Suplementos', precio: 380, stock: 60, descripcion: 'Complejo vitamínico para energía.', imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop', rating: 4.6 },
        { id: 5, nombre: 'Mascarilla N95', categoria: 'Equipo médico', precio: 250, stock: 200, descripcion: 'Protección avanzada contra partículas.', imagen: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop', rating: 4.0 },
        { id: 6, nombre: 'Crema hidratante', categoria: 'Cuidado personal', precio: 180, stock: 80, descripcion: 'Hidratación profunda para piel seca.', imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop', rating: 4.3 },
        { id: 7, nombre: 'Proteína en polvo', categoria: 'Nutrición', precio: 550, stock: 40, descripcion: 'Para deportistas y recuperación.', imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop', rating: 4.7 },
        { id: 8, nombre: 'Oxímetro de pulso', categoria: 'Equipo médico', precio: 890, stock: 20, descripcion: 'Mide saturación de oxígeno.', imagen: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop', rating: 4.9 }
    ];

    let productos = JSON.parse(localStorage.getItem('clinica_productos')) || defaultProducts;
    let carrito = JSON.parse(localStorage.getItem('clinica_carrito')) || [];
    let pedidos = JSON.parse(localStorage.getItem('clinica_pedidos')) || [];
    let wishlist = JSON.parse(localStorage.getItem('clinica_wishlist')) || [];

    function guardarProductos() { localStorage.setItem('clinica_productos', JSON.stringify(productos)); }
    function guardarCarrito() { localStorage.setItem('clinica_carrito', JSON.stringify(carrito)); actualizarBadge(); }
    function guardarPedidos() { localStorage.setItem('clinica_pedidos', JSON.stringify(pedidos)); }
    function guardarWishlist() { localStorage.setItem('clinica_wishlist', JSON.stringify(wishlist)); }

    // ========== TIENDA ==========
    let currentFilter = 'todos';
    let searchTerm = '';

    function generarEstrellas(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? 1 : 0;
        let stars = '';
        for (let i=0; i<full; i++) stars += '<i class="fas fa-star"></i>';
        if (half) stars += '<i class="fas fa-star-half-alt"></i>';
        for (let i=0; i<5-full-half; i++) stars += '<i class="far fa-star"></i>';
        return stars;
    }

    function renderProductos() {
        const container = document.getElementById('productosContainer');
        if (!container) return;
        let filtered = productos;
        if (currentFilter !== 'todos') filtered = filtered.filter(p => p.categoria === currentFilter);
        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(p => p.nombre.toLowerCase().includes(term) || p.descripcion.toLowerCase().includes(term));
        }
        if (filtered.length === 0) {
            container.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:40px; color:var(--gris-texto);">No se encontraron productos.</p>';
            return;
        }
        container.innerHTML = filtered.map(p => {
            const enWishlist = wishlist.includes(p.id);
            return `
                <div class="producto-card fade-in">
                    <div class="foto" style="background-image: url('${p.imagen || 'https://via.placeholder.com/400x300?text=Sin+imagen'}');">
                        <button class="wishlist-btn ${enWishlist?'active':''}" data-id="${p.id}"><i class="fas fa-heart"></i></button>
                    </div>
                    <div class="info">
                        <h3>${p.nombre}</h3>
                        <div class="categoria">${p.categoria}</div>
                        <div class="precio">$${p.precio.toFixed(2)}</div>
                        <div class="desc">${p.descripcion}</div>
                        <div class="rating">${generarEstrellas(p.rating || 0)}</div>
                        <div class="acciones">
                            <button class="btn-agregar" data-id="${p.id}" ${p.stock<=0?'disabled':''}>${p.stock>0?'Agregar':'Sin stock'}</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id);
                const idx = wishlist.indexOf(id);
                if (idx > -1) wishlist.splice(idx, 1);
                else wishlist.push(id);
                guardarWishlist();
                renderProductos();
            });
        });
        container.querySelectorAll('.btn-agregar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                agregarAlCarrito(id);
            });
        });
        setTimeout(() => {
            container.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
        }, 50);
    }

    // ========== CARRITO ==========
    function agregarAlCarrito(id) {
        const producto = productos.find(p => p.id === id);
        if (!producto || producto.stock <= 0) return;
        const existente = carrito.find(item => item.id === id);
        if (existente) {
            if (existente.cantidad < producto.stock) existente.cantidad++;
            else { alert('No hay suficiente stock.'); return; }
        } else {
            carrito.push({ id, cantidad: 1 });
        }
        guardarCarrito();
        renderCarrito();
        document.getElementById('cartSidebar').classList.add('open');
        document.getElementById('cartOverlay').classList.add('open');
    }

    function actualizarBadge() {
        const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        const badge = document.getElementById('cartBadge');
        if (badge) badge.textContent = total;
    }

    function renderCarrito() {
        const container = document.getElementById('cartItems');
        if (!container) return;
        if (carrito.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:var(--gris-texto); padding:20px 0;">El carrito está vacío.</p>';
            actualizarTotales();
            return;
        }
        let html = '';
        carrito.forEach(item => {
            const p = productos.find(prod => prod.id === item.id);
            if (!p) return;
            html += `
                <div class="cart-item">
                    <img src="${p.imagen || 'https://via.placeholder.com/64'}" alt="${p.nombre}" />
                    <div class="item-info">
                        <h4>${p.nombre}</h4>
                        <div class="item-precio">$${(p.precio * item.cantidad).toFixed(2)}</div>
                    </div>
                    <div class="item-cantidad">
                        <button data-id="${p.id}" data-accion="restar">-</button>
                        <span>${item.cantidad}</span>
                        <button data-id="${p.id}" data-accion="sumar">+</button>
                    </div>
                    <button class="eliminar-item" data-id="${p.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
        });
        container.innerHTML = html;

        container.querySelectorAll('.item-cantidad button').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const accion = this.dataset.accion;
                const item = carrito.find(i => i.id === id);
                if (!item) return;
                if (accion === 'sumar') {
                    const prod = productos.find(p => p.id === id);
                    if (prod && item.cantidad < prod.stock) item.cantidad++;
                    else { alert('Stock insuficiente.'); return; }
                } else if (accion === 'restar') {
                    item.cantidad--;
                    if (item.cantidad <= 0) carrito = carrito.filter(i => i.id !== id);
                }
                guardarCarrito();
                renderCarrito();
            });
        });
        container.querySelectorAll('.eliminar-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                carrito = carrito.filter(i => i.id !== id);
                guardarCarrito();
                renderCarrito();
            });
        });
        actualizarTotales();
    }

    let cuponAplicado = null;

    function actualizarTotales() {
        let subtotal = 0;
        carrito.forEach(item => {
            const p = productos.find(prod => prod.id === item.id);
            if (p) subtotal += p.precio * item.cantidad;
        });
        const envio = 50; // por defecto local
        let descuento = 0;
        if (cuponAplicado === 'SALUD10') descuento = subtotal * 0.10;
        const total = subtotal + envio - descuento;
        const elSubtotal = document.getElementById('cartSubtotal');
        const elEnvio = document.getElementById('cartEnvio');
        const elDescuento = document.getElementById('cartDescuento');
        const elTotal = document.getElementById('cartTotal');
        if (elSubtotal) elSubtotal.textContent = '$' + subtotal.toFixed(2);
        if (elEnvio) elEnvio.textContent = '$' + envio.toFixed(2);
        if (elDescuento) elDescuento.textContent = '-$' + descuento.toFixed(2);
        if (elTotal) elTotal.textContent = '$' + total.toFixed(2);
        window._cartSubtotal = subtotal;
        window._cartEnvio = envio;
        window._cartDescuento = descuento;
        window._cartTotal = total;
    }

    const aplicarCuponBtn = document.getElementById('aplicarCupon');
    if (aplicarCuponBtn) {
        aplicarCuponBtn.addEventListener('click', function() {
            const codigo = document.getElementById('cuponInput').value.trim().toUpperCase();
            if (codigo === 'SALUD10') {
                cuponAplicado = 'SALUD10';
                alert('¡Cupón aplicado! 10% de descuento.');
                renderCarrito();
            } else {
                cuponAplicado = null;
                alert('Cupón no válido.');
                renderCarrito();
            }
            document.getElementById('cuponInput').value = '';
        });
    }

    // ========== CARRITO UI ==========
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            document.getElementById('cartSidebar').classList.toggle('open');
            document.getElementById('cartOverlay').classList.toggle('open');
            renderCarrito();
        });
    }
    const closeCart = document.getElementById('closeCart');
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            document.getElementById('cartSidebar').classList.remove('open');
            document.getElementById('cartOverlay').classList.remove('open');
        });
    }
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', function() {
            document.getElementById('cartSidebar').classList.remove('open');
            document.getElementById('cartOverlay').classList.remove('open');
        });
    }

    // ========== CHECKOUT ==========
    const btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function() {
            if (carrito.length === 0) { alert('El carrito está vacío.'); return; }
            document.getElementById('cartSidebar').classList.remove('open');
            document.getElementById('cartOverlay').classList.remove('open');
            document.getElementById('checkoutModal').classList.add('open');
            actualizarResumenCheckout();
        });
    }
    const closeCheckout = document.getElementById('closeCheckout');
    if (closeCheckout) {
        closeCheckout.addEventListener('click', function() {
            document.getElementById('checkoutModal').classList.remove('open');
        });
    }
    document.querySelectorAll('.metodos-pago label').forEach(label => {
        label.addEventListener('click', function() {
            document.querySelectorAll('.metodos-pago label').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    const checkoutZona = document.getElementById('checkoutZona');
    if (checkoutZona) {
        checkoutZona.addEventListener('change', actualizarResumenCheckout);
    }

    function actualizarResumenCheckout() {
        const subtotal = window._cartSubtotal || 0;
        const zona = document.getElementById('checkoutZona').value;
        let envio = 0;
        if (zona === 'local') envio = 50;
        else if (zona === 'nacional') envio = 150;
        else if (zona === 'internacional') envio = 500;
        const descuento = window._cartDescuento || 0;
        const total = subtotal + envio - descuento;
        const elSub = document.getElementById('resumenSubtotal');
        const elEnv = document.getElementById('resumenEnvio');
        const elDesc = document.getElementById('resumenDescuento');
        const elTotal = document.getElementById('resumenTotal');
        if (elSub) elSub.textContent = '$' + subtotal.toFixed(2);
        if (elEnv) elEnv.textContent = '$' + envio.toFixed(2);
        if (elDesc) elDesc.textContent = '-$' + descuento.toFixed(2);
        if (elTotal) elTotal.textContent = '$' + total.toFixed(2);
        window._checkoutEnvio = envio;
        window._checkoutTotal = total;
    }

    const btnConfirmar = document.getElementById('btnConfirmarPago');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function() {
            const nombre = document.getElementById('checkoutNombre').value.trim();
            const direccion = document.getElementById('checkoutDireccion').value.trim();
            if (!nombre || !direccion) { alert('Completa todos los campos de envío.'); return; }
            const pedido = {
                id: Date.now(),
                fecha: new Date().toLocaleString(),
                cliente: nombre,
                direccion: direccion,
                total: window._checkoutTotal || 0,
                items: carrito.map(item => {
                    const p = productos.find(prod => prod.id === item.id);
                    return { nombre: p ? p.nombre : 'Producto', cantidad: item.cantidad, precio: p ? p.precio : 0 };
                }),
                estado: 'Pendiente'
            };
            pedidos.push(pedido);
            guardarPedidos();
            carrito.forEach(item => {
                const prod = productos.find(p => p.id === item.id);
                if (prod) prod.stock -= item.cantidad;
            });
            guardarProductos();
            carrito = [];
            guardarCarrito();
            renderCarrito();
            document.getElementById('checkoutModal').classList.remove('open');
            alert('¡Pedido confirmado! Gracias por tu compra.');
            if (document.getElementById('page-admin') && document.getElementById('page-admin').classList.contains('active')) renderAdmin();
        });
    }

    // ========== ADMIN ==========
    function renderAdmin() {
        const totalProductos = productos.length;
        const totalPedidos = pedidos.length;
        const ventasTotales = pedidos.reduce((sum, p) => sum + p.total, 0);
        const stockBajo = productos.filter(p => p.stock < 10).length;
        const elTotalProd = document.getElementById('totalProductos');
        const elTotalPed = document.getElementById('totalPedidos');
        const elVentas = document.getElementById('ventasTotales');
        const elStockBajo = document.getElementById('stockBajo');
        if (elTotalProd) elTotalProd.textContent = totalProductos;
        if (elTotalPed) elTotalPed.textContent = totalPedidos;
        if (elVentas) elVentas.textContent = '$' + ventasTotales.toFixed(2);
        if (elStockBajo) elStockBajo.textContent = stockBajo;

        const tbody = document.getElementById('adminProductosTable');
        if (!tbody) return;
        tbody.innerHTML = productos.map(p => `
            <tr>
                <td><strong>${p.nombre}</strong></td>
                <td>${p.categoria}</td>
                <td>$${p.precio.toFixed(2)}</td>
                <td>${p.stock}</td>
                <td class="acciones">
                    <button class="editar" data-id="${p.id}"><i class="fas fa-edit"></i></button>
                    <button class="eliminar" data-id="${p.id}"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `).join('');

        tbody.querySelectorAll('.editar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const p = productos.find(prod => prod.id === id);
                if (!p) return;
                document.getElementById('formProductoTitulo').textContent = 'Editar producto';
                document.getElementById('formProductoId').value = p.id;
                document.getElementById('formNombre').value = p.nombre;
                document.getElementById('formCategoria').value = p.categoria;
                document.getElementById('formPrecio').value = p.precio;
                document.getElementById('formStock').value = p.stock;
                document.getElementById('formDescripcion').value = p.descripcion;
                document.getElementById('formImagen').value = p.imagen || '';
                document.getElementById('productoFormModal').classList.add('open');
            });
        });
        tbody.querySelectorAll('.eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                if (confirm('¿Eliminar este producto?')) {
                    productos = productos.filter(p => p.id !== id);
                    guardarProductos();
                    renderAdmin();
                    renderProductos();
                }
            });
        });
    }

    const btnAgregarProducto = document.getElementById('btnAgregarProducto');
    if (btnAgregarProducto) {
        btnAgregarProducto.addEventListener('click', function() {
            document.getElementById('formProductoTitulo').textContent = 'Agregar producto';
            document.getElementById('formProductoId').value = '';
            document.getElementById('formNombre').value = '';
            document.getElementById('formCategoria').value = 'Suplementos';
            document.getElementById('formPrecio').value = '';
            document.getElementById('formStock').value = '';
            document.getElementById('formDescripcion').value = '';
            document.getElementById('formImagen').value = '';
            document.getElementById('productoFormModal').classList.add('open');
        });
    }
    const closeProductoForm = document.getElementById('closeProductoForm');
    if (closeProductoForm) {
        closeProductoForm.addEventListener('click', function() {
            document.getElementById('productoFormModal').classList.remove('open');
        });
    }
    const btnGuardarProducto = document.getElementById('btnGuardarProducto');
    if (btnGuardarProducto) {
        btnGuardarProducto.addEventListener('click', function() {
            const id = parseInt(document.getElementById('formProductoId').value);
            const nombre = document.getElementById('formNombre').value.trim();
            const categoria = document.getElementById('formCategoria').value;
            const precio = parseFloat(document.getElementById('formPrecio').value);
            const stock = parseInt(document.getElementById('formStock').value);
            const descripcion = document.getElementById('formDescripcion').value.trim();
            const imagen = document.getElementById('formImagen').value.trim();
            if (!nombre || isNaN(precio) || isNaN(stock)) { alert('Completa todos los campos correctamente.'); return; }
            if (id) {
                const prod = productos.find(p => p.id === id);
                if (prod) { prod.nombre = nombre; prod.categoria = categoria; prod.precio = precio; prod.stock = stock; prod.descripcion = descripcion; prod.imagen = imagen || prod.imagen; }
            } else {
                const newId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
                productos.push({ id: newId, nombre, categoria, precio, stock, descripcion, imagen: imagen || 'https://via.placeholder.com/400x300?text=Sin+imagen', rating: 0 });
            }
            guardarProductos();
            document.getElementById('productoFormModal').classList.remove('open');
            renderAdmin();
            renderProductos();
        });
    }

    // ========== FILTROS TIENDA (si existen) ==========
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            currentFilter = this.value;
            renderProductos();
        });
    }
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchTerm = this.value;
            renderProductos();
        });
    }

    // ========== INICIALIZACIÓN ==========
    actualizarBadge();
    renderCarrito();

    // Detectar página actual y ejecutar funciones específicas
    const path = window.location.pathname;
    if (path.includes('tienda.html') || document.getElementById('page-tienda')) {
        renderProductos();
    }
    if (path.includes('admin.html') || document.getElementById('page-admin')) {
        renderAdmin();
    }

    // Fade-in para elementos con clase .fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });
    fadeElements.forEach(el => observer.observe(el));

    // Contadores en index.html
    if (path.endsWith('index.html') || path === '/' || path === '') {
        const counters = document.querySelectorAll('.numero');
        let counted = false;
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-count'));
                        let current = 0;
                        const increment = target / 70;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                counter.innerText = target + (target === 98 ? '%' : '');
                                clearInterval(timer);
                            } else {
                                counter.innerText = Math.floor(current);
                            }
                        }, 20);
                    });
                }
            });
        }, { threshold: 0.5 });
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) counterObserver.observe(statsSection);
    }
});