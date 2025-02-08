//form loading animation

const form = document.querySelector('.form');
if (form) {
    [...form.children].forEach((item, i) => {
        setTimeout(() => {
            item.style.opacity = "1"; 
        }, i * 100);
    });
}

// form validation

const name = document.querySelector('.name') || null;
const email = document.querySelector('.user') || document.querySelector('.email');

const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

if (!email || !password || !submitBtn) {
    console.error("One or more elements not found!", { email, password, submitBtn });
} else {
    console.log("All elements found! Listening for button click.");


        if(!name){
            submitBtn.addEventListener('click', (event) => {
                event.preventDefault();

                console.log("Login button worked!");
                console.log("Email:", email.value);
                console.log("Password:", password.value);

                fetch('http://127.0.0.1:5000/login-user',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, //Changed header new Headers
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.name){
                    alert('Login Successful!');
                    setTimeout(() => {
                        window.location.href = 'dash.html';
                    }, 500);                    
                } else{
                    alert(data);
                }
            })
            .catch(err => console.error('Error:', err));
        });

        } else {
            submitBtn.addEventListener('click', (event) => {
                event.preventDefault(); //new

                fetch('http://127.0.0.1:5000/register-user', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        name: name.value,
                        email: email.value,
                        password: password.value
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.name){
                        alert('register successful');
                        window.location.href = 'login.html';
                    } else{
                        alert(data);
                    }
                })
                .catch(err => console.error('Error:', err));
        });
    }
}

// inventory
document.addEventListener('DOMContentLoaded', () => {
    const showModalBtn = document.getElementById('showModalBtn');
    const proAddSection = document.querySelector('.proAddSection');
    const cancelBtn = document.querySelector('.proAddCancelBtn');
    const modalForm = document.querySelector('.proAdd__form');

    const tableBody = document.querySelector('.table tbody');
    const productNameInput = document.querySelector('.productNameInput');
    const productQuantityInput = document.querySelector('.productQuantityInput');
    const productPriceInput = document.querySelector('.productPriceInput');

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
            addProductToTable(product.name, product.quantity, product.price, index);
        });
    };

    const updateLocalStorage = (products) => {
        localStorage.setItem('products', JSON.stringify(products));
    };

    const addProductToTable = (productName, quantity, price, index) => {
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-index', index);

        newRow.innerHTML = `
            <td>${productName}</td>
            <td>${quantity}</td>
            <td>$${price}</td>
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

        let savedProducts = JSON.parse(localStorage.getItem('products')) || [];

        if (editingProductIndex !== null) {
            savedProducts[editingProductIndex] = { name: productName, quantity, price };
            editingProductIndex = null;
        } else {
            savedProducts.push({ name: productName, quantity, price });
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
            addProductToTable(product.name, product.quantity, product.price, index);
        });
    };
    

    loadProducts();
});
