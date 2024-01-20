const list = document.querySelector('#list')
const filter = document.querySelector('#filter')
let USERS = []

filter.addEventListener('input', (event) => {
    const value = event.target.value.toLowerCase() //проверяем строку в нижнем регистре
    const filteredUsers = USERS.filter((user) => 
        user.name.toLowerCase().includes(value)
    )
    render(filteredUsers)
})

async function start() {
    list.innerHTML = 'ЗАГРУЗКА...' //говорим пользователю что нужно подождать
    try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET' //это писать необязательно но для наглядности нужно
        })
        const data = await resp.json()
        setTimeout(() => { //искусственное замедление
            USERS = data
            render(data)
        }, 2000)
    } catch (error) { //ловим ошибки
        list.style.color = 'red'
        list.innerHTML = error.message //если ошибка была найдена, выводим ее для пользователя
    }
}

function render(users = []) {
    if (users.length === 0) {
        list.innerHTML = 'Я никого не нашел('
    } else {
        const html = users.map(toHTML).join('') 
        list.innerHTML = html
    }  
}

function toHTML(user) {
    return `
    <li class="list-group-item">${user.name}</li>
    `
}

start()