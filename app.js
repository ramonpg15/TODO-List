const formulario = document.querySelector('#formulario')
const listaDeTareas = document.querySelector('#lista-tareas')
let tareas = []


const app = () => {
    formulario.addEventListener('submit', agregarTarea)
    // * Al cargar el contenido
    document.addEventListener('DOMContentLoaded', () => {
        tareas = JSON.parse(localStorage.getItem('tareas') || [])
        console.log(tareas);
        agregarHTML()
    })
}

const agregarTarea = (e) => {
    e.preventDefault()
    const tarea = document.querySelector('#tarea').value
    if (tarea === '') {
        mostrarError('Por favor agrega una tarea a la lista 😥')
        return
    }
    const tareasObjeto = {
        id: Date.now(),
        tarea: tarea
    }
    tareas = [...tareas, tareasObjeto]
    agregarHTML()
    formulario.reset()
}


const agregarHTML = () => {
    limpiaHTML()
    if (tareas.length > 0) {
        tareas.forEach((tarea) => {
            const listaTareas = document.createElement('LI')
            const btn = document.createElement('a')
            btn.onclick = () => {
                borrarTarea(tarea.id)
            }
            btn.classList.add('btnBorrar')
            btn.textContent = 'X'
            listaTareas.textContent = tarea.tarea
            listaDeTareas.appendChild(btn)
            listaDeTareas.appendChild(listaTareas)
        })
    }
    agregarLocalStorage()
}

const agregarLocalStorage = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
}

const borrarTarea = (id) => {
    tareas = tareas.filter((tarea) => {
        return tarea.id !== id
    })
    agregarHTML()
}

const limpiaHTML = () => {
    while (listaDeTareas.firstChild) {
        listaDeTareas.removeChild(listaDeTareas.firstChild)
    }
}

const mostrarError = (mensaje) => {
    const contenedor = document.querySelector('#contenido-principal')
    const parrafoError = document.createElement('P')
    const errorPrevio = document.querySelector('p.error')
    if (errorPrevio) {
        return
    }
    parrafoError.classList.add('error')
    parrafoError.textContent = mensaje
    contenedor.appendChild(parrafoError)
    setTimeout(() => {
        parrafoError.remove()
    }, 2000);

}

app()