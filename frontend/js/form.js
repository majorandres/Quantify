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

    showModalBtn.addEventListener('click', () => {
        proAddSection.classList.remove('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        proAddSection.classList.add('hidden');
    });
    
    proAddSection.addEventListener('click', (event) => {
        if (event.target === proAddSection) {
            proAddSection.classList.add('hidden');
        }
    });
});
