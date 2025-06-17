function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function generateId(key) {
    const items = getData(key);
    if (items.length === 0) {
        return 1;
    }
    const maxId = Math.max(...items.map(item => item.id || item.id_tarefa || item.id_usuario));
    return maxId + 1;
}

function getUsers() {
    return getData('users');
}

function saveUser(user) {
    const users = getUsers();
    user.id = generateId('users');
    users.push(user);
    setData('users', users);
    return user;
}

function getTasks() {
    return getData('tasks');
}

function saveTask(task) {
    const tasks = getTasks();
    if (task.id_tarefa) {
        const index = tasks.findIndex(t => t.id_tarefa === task.id_tarefa);
        if (index !== -1) {
            tasks[index] = task;
        }
    } else {
        task.id_tarefa = generateId('tasks');
        task.data_cadastro = new Date().toISOString().split('T')[0];
        task.status = 'A Fazer';
        tasks.push(task);
    }
    setData('tasks', tasks);
    return task;
}

function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id_tarefa !== taskId);
    setData('tasks', tasks);
}

function getTaskById(taskId) {
    const tasks = getTasks();
    return tasks.find(task => task.id_tarefa === taskId);
}

function displayMessage(message, type, elementId = 'message-area') {
    const messageArea = document.getElementById(elementId);
    if (messageArea) {
        messageArea.textContent = message;
        messageArea.className = `message ${type}`;
        setTimeout(() => {
            messageArea.textContent = '';
            messageArea.className = 'message';
        }, 3000);
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


function loadHeader() {
    const headerHtml = `
        <header class="header">
            <div class="header-content"> <h1>Gerenciamento de Tarefas</h1>
               
            </div>
        </header>
        <div class="container">
            <div id="message-area" class="message"></div>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHtml);
}

document.addEventListener('DOMContentLoaded', loadHeader);