// ============================================================
// data.js - Todos los productos de VOID
// Incluye 100 camisas + 100 jeans + 100 vestidos + 100 chaquetas + 100 tenis + 100 bolsos + 100 accesorios + 100 ropa de baño
// ============================================================

const PRODUCTOS = (function() {
    // ==========================================================
    // 1. CAMISAS (100 productos)
    // ==========================================================
    const shirtImages = [
        "imgcamisas/alex-haigh-fEt6Wd4t4j0-unsplash.jpg",
        "imgcamisas/faith-yarn-Wr0TpKqf26s-unsplash.jpg",
        "imgcamisas/haryo-setyadi-acn5ERAeSb4-unsplash.jpg",
        "imgcamisas/keagan-henman-XYtuOYfIg_M-unsplash.jpg",
        "imgcamisas/robert-richman-vcTKFYNZop4-unsplash.jpg",
        "imgcamisas/ryan-hoffman-6Nub980bI3I-unsplash.jpg",
        "imgcamisas/ryan-hoffman-A7f7XRKgUWc-unsplash.jpg",
        "imgcamisas/ryan-hoffman-czLSitCJ3Dw-unsplash.jpg",
        "imgcamisas/ryan-hoffman-u6n1HrW0sdQ-unsplash.jpg",
        "imgcamisas/santhosh-kumar-RqYTuWkTdEs-unsplash.jpg",
        "imgcamisas/zayed-ahmed-zadu-e3bIZpHXHSA-unsplash.jpg"
    ];

    const descripcionesCamisas = [
        "Camisa de algodón orgánico, perfecta para el día a día.",
        "Diseño minimalista con corte moderno y tejido transpirable.",
        "Ideal para looks casuales o formales, según tu estilo.",
        "Confección artesanal y detalles únicos en cada prenda.",
        "Tela suave al tacto, disponible en varios colores.",
        "Un básico imprescindible en tu armario, calidad premium."
    ];

    const camisas = [];
    for (let i = 1; i <= 100; i++) {
        let imagen;
        if (i <= 10) {
            imagen = shirtImages[i - 1];
        } else {
            imagen = shirtImages[Math.floor(Math.random() * shirtImages.length)];
        }
        const desc = descripcionesCamisas[Math.floor(Math.random() * descripcionesCamisas.length)];
        const precio = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
        camisas.push({
            id: 1000 + i,
            nombre: `Camisa Essential ${i}`,
            precio: precio,
            categoria: 'camisas',
            icono: '👕',
            tags: [],
            descripcion: desc,
            imagen: imagen
        });
    }

    // ==========================================================
    // 2. JEANS (100 productos)
    // ==========================================================
    const jeansImages = [
        "https://images.unsplash.com/photo-1542272617-08f086d2c747?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1605518216938-7c31b3b14f95?w=600&h=600&fit=crop"
    ];

    const descripcionesJeans = [
        "Jeans de corte clásico, ideal para el día a día.",
        "Diseño moderno con lavado desgastado y ajuste cómodo.",
        "Denim de alta calidad, resistente y duradero.",
        "Perfecto para looks casuales o elegantes según tu estilo.",
        "Tela suave y elástica que se adapta a tu cuerpo.",
        "Un básico imprescindible en cualquier armario."
    ];

    const jeans = [];
    for (let i = 1; i <= 100; i++) {
        const randomImg = jeansImages[Math.floor(Math.random() * jeansImages.length)];
        const desc = descripcionesJeans[Math.floor(Math.random() * descripcionesJeans.length)];
        const tags = [];
        if (Math.random() > 0.7) tags.push('Nuevo');
        if (Math.random() > 0.85) tags.push('Oferta');
        jeans.push({
            id: 2000 + i,
            nombre: `Jeans Urban ${i}`,
            precio: Math.floor(Math.random() * (1200 - 600 + 1)) + 600,
            categoria: 'jeans',
            icono: '👖',
            tags: tags,
            descripcion: desc,
            imagen: randomImg
        });
    }

    // ==========================================================
    // 3. VESTIDOS (100 productos)
    // ==========================================================
    const dressImages = [
        "https://images.unsplash.com/photo-1572804013309-59c88c209549?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1612336307429-3f04a8fb4165?w=600&h=600&fit=crop"
    ];

    const descripcionesVestidos = [
        "Vestido de corte clásico, ideal para eventos especiales.",
        "Diseño moderno con detalles únicos y tejido ligero.",
        "Tela de alta calidad, suave y con caída perfecta.",
        "Versátil para looks de día o de noche según los accesorios.",
        "Confección artesanal con acabados impecables.",
        "Un básico de primavera/verano que no puede faltar en tu armario."
    ];

    const vestidos = [];
    for (let i = 1; i <= 100; i++) {
        const randomImg = dressImages[Math.floor(Math.random() * dressImages.length)];
        const desc = descripcionesVestidos[Math.floor(Math.random() * descripcionesVestidos.length)];
        const tags = [];
        if (Math.random() > 0.7) tags.push('Nuevo');
        if (Math.random() > 0.85) tags.push('Oferta');
        vestidos.push({
            id: 3000 + i,
            nombre: `Vestido Elegancia ${i}`,
            precio: Math.floor(Math.random() * (1500 - 500 + 1)) + 500,
            categoria: 'vestidos',
            icono: '👗',
            tags: tags,
            descripcion: desc,
            imagen: randomImg
        });
    }

    // ==========================================================
    // 4. CHAQUETAS (100 productos)
    // ==========================================================
    const jacketImages = [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1611312449406-f6ce27adb3bc?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=600&h=600&fit=crop"
    ];

    const descripcionesChaquetas = [
        "Chaqueta de corte clásico, ideal para el día a día.",
        "Diseño moderno con materiales resistentes al viento.",
        "Perfecta para climas fríos, con forro interior suave.",
        "Versátil, combina con cualquier look casual o elegante.",
        "Confección duradera con costuras reforzadas.",
        "Un básico de invierno que no puede faltar en tu armario."
    ];

    const chaquetas = [];
    for (let i = 1; i <= 100; i++) {
        const randomImg = jacketImages[Math.floor(Math.random() * jacketImages.length)];
        const desc = descripcionesChaquetas[Math.floor(Math.random() * descripcionesChaquetas.length)];
        const tags = [];
        if (Math.random() > 0.7) tags.push('Nuevo');
        if (Math.random() > 0.85) tags.push('Oferta');
        chaquetas.push({
            id: 4000 + i,
            nombre: `Chaqueta Urban ${i}`,
            precio: Math.floor(Math.random() * (2000 - 800 + 1)) + 800,
            categoria: 'chaquetas',
            icono: '🧥',
            tags: tags,
            descripcion: desc,
            imagen: randomImg
        });
    }

    // ==========================================================
    // 5. TENNIS (100 productos)
    // ==========================================================
    const shoeImages = [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1603808033190-016d6e5e0332?w=600&h=600&fit=crop"
    ];

    const descripcionesTennis = [
        "Tenis urbanos con estilo moderno y gran confort.",
        "Diseño ligero y transpirable, ideal para caminar.",
        "Suela antideslizante y amortiguación superior.",
        "Versátil, combina con cualquier outfit casual.",
        "Materiales de alta calidad que garantizan durabilidad.",
        "El calzado perfecto para tu día a día."
    ];

    const tennis = [];
    for (let i = 1; i <= 100; i++) {
        const randomImg = shoeImages[Math.floor(Math.random() * shoeImages.length)];
        const desc = descripcionesTennis[Math.floor(Math.random() * descripcionesTennis.length)];
        const tags = [];
        if (Math.random() > 0.7) tags.push('Nuevo');
        if (Math.random() > 0.85) tags.push('Oferta');
        tennis.push({
            id: 5000 + i,
            nombre: `Tennis Urban ${i}`,
            precio: Math.floor(Math.random() * (1800 - 700 + 1)) + 700,
            categoria: 'tennis',
            icono: '👟',
            tags: tags,
            descripcion: desc,
            imagen: randomImg
        });
    }

    // ==========================================================
    // 6. BOLSOS (100 productos)
    // ==========================================================
    const bagImages = [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=600&h=600&fit=crop"
    ];

    const descripcionesBolsos = [
        "Bolso versátil con diseño moderno y gran capacidad.",
        "Perfecto para el día a día, combina con cualquier outfit.",
        "Materiales de alta calidad que garantizan durabilidad.",
        "Diseño elegante y funcional, con múltiples compartimentos.",
        "Ideal para llevar tus pertenencias con estilo.",
        "Un accesorio imprescindible en tu colección."
    ];

    const bolsos = [];
    for (let i = 1; i <= 100; i++) {
        const randomImg = bagImages[Math.floor(Math.random() * bagImages.length)];
        const desc = descripcionesBolsos[Math.floor(Math.random() * descripcionesBolsos.length)];
        const tags = [];
        if (Math.random() > 0.7) tags.push('Nuevo');
        if (Math.random() > 0.85) tags.push('Oferta');
        bolsos.push({
            id: 6000 + i,
            nombre: `Bolso Style ${i}`,
            precio: Math.floor(Math.random() * (1200 - 400 + 1)) + 400,
            categoria: 'bolsos',
            icono: '👜',
            tags: tags,
            descripcion: desc,
            imagen: randomImg
        });
    }

    // ==========================================================
    // 7. ACCESORIOS (100 productos)
    // ==========================================================
    const accessoryImages = [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=600&h=600&fit=crop"
    ];

    const descripcionesAccesorios = [
        "Accesorio versátil que combina con cualquier outfit.",
        "Diseño moderno y funcional para el día a día.",
        "Materiales de alta calidad que garantizan durabilidad.",
        "El complemento perfecto para realzar tu estilo.",
        "Ideal para ocasiones casuales o formales.",
        "Un básico que no puede faltar en tu colección."
    ];

    const accesorios = [];
    for (let i = 1; i <= 100; i++) {
        const randomImg = accessoryImages[Math.floor(Math.random() * accessoryImages.length)];
        const desc = descripcionesAccesorios[Math.floor(Math.random() * descripcionesAccesorios.length)];
        const tags = [];
        if (Math.random() > 0.7) tags.push('Nuevo');
        if (Math.random() > 0.85) tags.push('Oferta');
        accesorios.push({
            id: 7000 + i,
            nombre: `Accesorio Style ${i}`,
            precio: Math.floor(Math.random() * (600 - 150 + 1)) + 150,
            categoria: 'accesorios',
            icono: '🧢',
            tags: tags,
            descripcion: desc,
            imagen: randomImg
        });
    }

    // ==========================================================
    // 8. ROPA DE BAÑO (100 productos extraídos de ropa-bano.html)
    // ==========================================================
    const swimImages = [
        "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1584769767162-4f38cff128ae?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1602165562262-70b2f7f7b9a5?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563170351-be8268a8b2a8?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571046148991-8f505d8a9b87?w=600&h=600&fit=crop"
    ];

    const descripcionesSwim = [
        "Traje de baño con diseño moderno y tejido resistente al cloro.",
        "Perfecto para la playa o la piscina, con gran comodidad.",
        "Estilo trendy y funcional, ideal para el verano.",
        "Tela de secado rápido y ajuste perfecto.",
        "Diseño versátil que se adapta a cualquier tipo de cuerpo.",
        "Calidad premium para disfrutar al máximo del agua."
    ];

    const ropaBano = [];
    for (let i = 1; i <= 100; i++) {
        const randomImg = swimImages[Math.floor(Math.random() * swimImages.length)];
        const desc = descripcionesSwim[Math.floor(Math.random() * descripcionesSwim.length)];
        const tags = [];
        if (Math.random() > 0.7) tags.push('Nuevo');
        if (Math.random() > 0.85) tags.push('Oferta');
        ropaBano.push({
            id: 8000 + i,
            nombre: `Traje de baño ${i}`,
            precio: Math.floor(Math.random() * (900 - 300 + 1)) + 300,
            categoria: 'ropa-bano',
            icono: '👙',
            tags: tags,
            descripcion: desc,
            imagen: randomImg
        });
    }

    // ==========================================================
    // UNIR TODAS LAS CATEGORÍAS
    // ==========================================================
    return [...camisas, ...jeans, ...vestidos, ...chaquetas, ...tennis, ...bolsos, ...accesorios, ...ropaBano];
})();

// Exponer la variable globalmente
window.PRODUCTOS = PRODUCTOS;

// Exportar para Node.js (por si se usa con módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PRODUCTOS;
}