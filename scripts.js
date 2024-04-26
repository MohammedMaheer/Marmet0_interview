document.addEventListener("DOMContentLoaded", function () {
    const menTab = document.getElementById('menTab');
    const womenTab = document.getElementById('womenTab');
    const kidsTab = document.getElementById('kidsTab');

    menTab.addEventListener('click', () => fetchProducts('Men'));
    womenTab.addEventListener('click', () => fetchProducts('Women'));
    kidsTab.addEventListener('click', () => fetchProducts('Kids'));

    function fetchProducts(category) {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                const categoryData = data.categories.find(cat => cat.category_name === category);
                if (categoryData) {
                    renderProducts(categoryData.category_products);
                } else {
                    console.error('Category not found:', category);
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    function renderProducts(products) {
        const productContainer = document.querySelector('.product-container');
        productContainer.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="product-details">
                    <div class="badge">${product.badge_text ? product.badge_text : ''}</div>
                    <h3>${product.title}</h3>
                    <p>Vendor: ${product.vendor}</p>
                    <p>Price: $${product.price}</p>
                    <p>Compare at Price: $${product.compare_at_price}</p>
                    <p>Discount: ${calculateDiscount(product.price, product.compare_at_price)}% off</p>
                    <button>Add to Cart</button>
                </div>
            `;
            productContainer.appendChild(productCard);
        });
    }

    function calculateDiscount(price, comparePrice) {
        const discount = ((comparePrice - price) / comparePrice) * 100;
        return Math.round(discount);
    }
});
