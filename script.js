const home = document.getElementById('title');
const roversPage = document.getElementById('rovers-group')
const login = document.getElementById('login')
const Button = document.getElementById('button-cont')

home.addEventListener('click', () => {

    window.location.href = 'index.html';
})


roversPage.addEventListener('click', () => {

    console.log('hi')
    window.location.href = 'sections.html';
})

login.addEventListener('click', () => {

    window.location.href = 'login.html';
})

Button.addEventListener('click', () => {

    window.location.href = 'index.html';
})

