document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Produto 1', description: 'Descrição do produto 1', price: 10.00, category: 'category1', image: 'imagem1.jpg' },
        { id: 2, name: 'Produto 2', description: 'Descrição do produto 2', price: 20.00, category: 'category2', image: 'imagem2.jpg' },
        // Mais produtos...
    ];

    let cartCount = 0;
    let currentPage = 1;

    const cartCountElement = document.getElementById('cart-count');
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    const currentPageElement = document.getElementById('current-page');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const highlightItemsContainer = document.getElementById('highlight-items');
    const productItemsContainer = document.getElementById('product-items');
    const themeToggleButton = document.getElementById('theme-toggle');

    function renderProducts(products, container, page = 1) {
        container.innerHTML = '';
        const itemsPerPage = 6;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedProducts = products.slice(startIndex, endIndex);

        paginatedProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.addEventListener('click', () => showProductModal(product));

            const title = document.createElement('h3');
            title.textContent = product.name;

            const description = document.createElement('p');
            description.textContent = product.description;

            const price = document.createElement('p');
            price.className = 'price';
            price.textContent = `R$ ${product.price.toFixed(2)}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.className = 'add-to-cart';
            addToCartButton.textContent = 'Adicionar ao Carrinho';
            addToCartButton.addEventListener('click', () => {
                addToCart(product);
                closeModal();
            });

            productItem.appendChild(img);
            productItem.appendChild(title);
            productItem.appendChild(description);
            productItem.appendChild(price);
            productItem.appendChild(addToCartButton);

            container.appendChild(productItem);
        });
    }

    function showProductModal(product) {
        const modal = document.getElementById('product-modal');
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalPrice = document.getElementById('modal-price');
        const modalAddToCart = document.getElementById('modal-add-to-cart');
        const commentsList = document.getElementById('comments-list');
        const addCommentButton = document.getElementById('add-comment');
        const commentInput = document.getElementById('comment-input');

        modalImg.src = product.image;
        modalTitle.textContent = product.name;
        modalDescription.textContent = product.description;
        modalPrice.textContent = `R$ ${product.price.toFixed(2)}`;
        modalAddToCart.dataset.id = product.id;

        const comments = JSON.parse(localStorage.getItem(`comments-${product.id}`)) || [];
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('p');
            commentElement.textContent = comment;
            commentsList.appendChild(commentElement);
        });

        addCommentButton.onclick = () => {
            const comment = commentInput.value;
            if (comment) {
                comments.push(comment);
                localStorage.setItem(`comments-${product.id}`, JSON.stringify(comments));
                const commentElement = document.createElement('p');
                commentElement.textContent = comment;
                commentsList.appendChild(commentElement);
                commentInput.value = '';
            }
        };

        modal.style.display = 'block';

        modalAddToCart.onclick = () => {
            addToCart(product);
            closeModal();
        };

        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => closeModal();

        window.onclick = (event) => {
            if (event.target === modal) {
                closeModal();
            }
        };
    }

    function closeModal() {
        const modal = document.getElementById('product-modal');
        modal.style.display = 'none';
    }

    function addToCart(product) {
        cartCount++;
        cartCountElement.textContent = cartCount;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${product.name} foi adicionado ao carrinho.`);
    }

    function filterProducts() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;

        const filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchText);
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        renderProducts(filteredProducts, productItemsContainer, currentPage);
    }

    function changePage(increment) {
        currentPage += increment;
        currentPageElement.textContent = currentPage;
        filterProducts();
    }

    searchInput.addEventListener('input', filterProducts);
    categorySelect.addEventListener('change', filterProducts);
    prevPageButton.addEventListener('click', () => changePage(-1));
    nextPageButton.addEventListener('click', () => changePage(1));

    themeToggleButton.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    });

    renderProducts(products, highlightItemsContainer);
    renderProducts(products, productItemsContainer, currentPage);
    filterProducts();
});


document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const removeAccountLink = document.getElementById('remove-account');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        if (username && password) {
            localStorage.setItem('user', JSON.stringify({ username, password }));
            alert('Registro bem-sucedido! Faça login para continuar.');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.username === username && storedUser.password === password) {
            alert('Login bem-sucedido!');
            window.location.href = 'index.html';
        } else {
            alert('Nome de usuário ou senha incorretos.');
        }
    });

    forgotPasswordLink.addEventListener('click', () => {
        const username = prompt('Digite seu nome de usuário para redefinir sua senha:');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.username === username) {
            const newPassword = prompt('Digite sua nova senha:');
            storedUser.password = newPassword;
            localStorage.setItem('user', JSON.stringify(storedUser));
            alert('Senha redefinida com sucesso!');
        } else {
            alert('Usuário não encontrado.');
        }
    });

    removeAccountLink.addEventListener('click', () => {
        const confirmation = confirm('Tem certeza de que deseja excluir sua conta?');
        if (confirmation) {
            localStorage.removeItem('user');
            alert('Conta excluída com sucesso!');
            window.location.href = 'index.html';
        }
    });
});
