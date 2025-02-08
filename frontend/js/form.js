//form loading animation

const form = [...document.querySelector('.from').children];

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


}else {
    submitBtn.addEventListener('click', () => {
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({})
        })
    })
}

