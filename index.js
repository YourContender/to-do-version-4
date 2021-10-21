const input = document.querySelector('.input');
const btn = document.querySelector('.btn');

let database = [
    // {text: 'Hello world', id: 1, done: false}
];


// trigger add elem
btn.addEventListener('click', () => {
    createNewELement(database);
    input.value = '';
});


function displayTask(list) {
    const parent = document.querySelector('.list');
    const li = document.createElement('li');
    li.classList.add('current-elem');

    list.map(item => {
        li.id = item.id
        li.innerHTML = `
            <input  class='input-task' value=${item.text}>
            <button class='delete-task'>del</button>
            <button class='toggle-task'>+</button>
            <button class='edit-task'>edit</button>
        `;
    })
    
    parent.append(li);
    deleteCurrentTask(list);
    createChangeDone(list, li);
    createEditTask(li, list);

    li.querySelectorAll('.edit-task').forEach(item => {
        item.addEventListener('click', () => {

        })
    })
};


// add new elem
function createNewELement(list) {
    let current = {
        text: input.value,
        id: Date.now(),
        done: false
    }
    list.push(current);

    displayTask(list);
};


// remove element
function deleteCurrentTask(list) {
    const allElem = document.querySelectorAll('.current-elem');
    allElem.forEach(item => {
        item.querySelector('.delete-task').addEventListener('click', (e) => {
            let id = e.target.parentNode.id;
            e.target.parentNode.remove();
            
            list.forEach((elem, i) => {
                if (elem.id == id) {
                    list.splice(i, 1)
                }
            })
        })
    })
}


// toggle color
function createChangeDone(list, elem) {
    elem.querySelectorAll('.toggle-task').forEach(item => { 
        item.addEventListener('click', (e) => {
            let id = e.target.parentNode.id;
            let current = e.target.parentNode;

            list.map(elem => {
                if (elem.id == id) {
                    elem.done = !elem.done;
                    toggleColorText(current, elem)
                }
            })
            
        })
    })
}

function toggleColorText(current, elem) {
    console.log(current);
    elem.done ? current.style.background = 'green' : current.style.background = 'none'
}

// edit task
function createEditTask(elem, list) {
    elem.querySelectorAll('.input-task').forEach(item => {
        item.addEventListener('input', (e) => {
            let id = e.target.parentNode.id;
            let value = e.target.value;

            item.innerHTML = e.target.value;
            
            handleClick(elem, list, id, value);

        })  
    })
}

function handleClick(elem, list, id, value) {
    elem.querySelectorAll('.edit-task').forEach(item => {
        item.addEventListener('click', () => {
            list.map(i => {
                if (i.id == id) {
                    i.text = value;
                }
            })
        })
    })
}