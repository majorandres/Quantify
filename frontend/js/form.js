//form loading animation

const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.computedStyleMap.opacity = 1;
    }, i*100);
})

// form validation

const name = document.querySelector('.name') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

if(name == null){
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

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
            window.location.href = 'dash.html'; //New
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

