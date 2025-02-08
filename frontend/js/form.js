//form loading animation

const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("Login form submitted!");

        const email = document.querySelector(".user").value;
        const password = document.querySelector(".password").value;

        console.log("Email:", email);
        console.log("Password:", password);

        fetch("http://127.0.0.1:5000/login-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.name) {
                alert("Login Successful!");
                setTimeout(() => {
                    window.location.href = "dash.html";
                }, 500);
            } else {
                alert("Login failed: " + data);
            }
        })
        .catch(err => console.error("Error:", err));
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
