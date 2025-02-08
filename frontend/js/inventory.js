document.addEventListener('DOMContentLoaded', () => {
    const showModalBtn = document.getElementById('showModalBtn');
    const proAddSection = document.querySelector('.proAddSection');
    const cancelBtn = document.querySelector('.proAddCancelBtn');
    const modalForm = document.querySelector('.proAdd__form');

    const tableBody = document.querySelector('.table tbody');
    const productNameInput = document.querySelector('.productNameInput');
    const productQuantityInput = document.querySelector('.productQuantityInput');
    const productPriceInput = document.querySelector('.productPriceInput');
    const productSalesInput = document.querySelector('.productSalesInput');
    const productStockInput = document.querySelector('.productStockInput');
    const productRepointInput = document.querySelector('.productRepointInput');

    let editingProductIndex = null;

    showModalBtn.addEventListener('click', () => {
        proAddSection.classList.remove('hidden');
        modalForm.reset();
        editingProductIndex = null; 
    });

    cancelBtn.addEventListener('click', () => {
        proAddSection.classList.add('hidden');
    });

    proAddSection.addEventListener('click', (event) => {
        if (event.target === proAddSection) {
            proAddSection.classList.add('hidden');
        }
    });

    const loadProducts = () => {
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        savedProducts.forEach((product, index) => {
            addProductToTable(product.name, product.quantity, product.price, product.sales, product.stock, product.repoint, index);
        });
    };

    const updateLocalStorage = (products) => {
        localStorage.setItem('products', JSON.stringify(products));
    };

    const addProductToTable = (productName, quantity, price, sales, stock, repoint, index) => {
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-index', index);

        newRow.innerHTML = `
            <td>${productName}</td>
            <td>${quantity}</td>
            <td>$${price}</td>
            <td>${sales}</td>
            <td>${stock}</td>
            <td>${repoint}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-btn">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </td>
        `;

        tableBody.appendChild(newRow);

        newRow.querySelector('.edit-btn').addEventListener('click', () => editProduct(index));
        newRow.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(index));
    };

    modalForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productName = productNameInput.value;
        const quantity = productQuantityInput.value;
        const price = productPriceInput.value;
        const sales = productSalesInput.value;
        const stock = productStockInput.value;
        const repoint = productRepointInput.value;

        let savedProducts = JSON.parse(localStorage.getItem('products')) || [];

        if (editingProductIndex !== null) {
            savedProducts[editingProductIndex] = { name: productName, quantity, price, sales, stock, repoint };
            editingProductIndex = null;
        } else {
            savedProducts.push({ name: productName, quantity, price, sales, stock, repoint });
        }

        updateLocalStorage(savedProducts);
        refreshTable(savedProducts);

        modalForm.reset();
        proAddSection.classList.add('hidden');
    });

    const editProduct = (index) => {
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const product = savedProducts[index];

        productNameInput.value = product.name;
        productQuantityInput.value = product.quantity;
        productPriceInput.value = product.price;
        productSalesInput.value = product.sales;
        productStockInput.value = product.stock;
        productRepointInput.value = product.repoint;

        editingProductIndex = index; 
        proAddSection.classList.remove('hidden');
    };

    const deleteProduct = (index) => {
        let savedProducts = JSON.parse(localStorage.getItem('products')) || [];

        savedProducts.splice(index, 1);

        updateLocalStorage(savedProducts);
        refreshTable(savedProducts);
    };

    const refreshTable = (products) => {
        tableBody.innerHTML = ''; 
        products.forEach((product, index) => {
            addProductToTable(product.name, product.quantity, product.price, product.sales, product.stock, product.repoint, index);
        });
    };
    

    loadProducts();
});
