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
        mostrarMensaje('Por favor agrega una tarea a la lista 😥', 'error')
        //mostrarError('Por favor agrega una tarea a la lista 😥')
        return
    }
    const tareasObjeto = {
        id: Date.now(),
        tarea: tarea
    }
    tareas = [...tareas, tareasObjeto]
    mostrarMensaje('Tarea agregada exitosamente', 'exito')
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


const mostrarMensaje = (mensaje, tipoAlerta) => {
    const contenedor = document.querySelector('#contenido-principal')
    const alerta = document.querySelector('#contenedor')
    const errorPrevio = document.querySelector('p.error')
    const exitoPrevio = document.querySelector('p.exito')
    const alert = document.createElement('P')
    if (errorPrevio) {
        return
    }
    if (exitoPrevio) {
        return
    }
    if (tipoAlerta === 'error') {
        alert.classList.add('error')
        contenedor.appendChild(alert)
    }
    else {
        alert.classList.add('exito')
        contenedor.insertBefore(alert, alerta)
    }
    setTimeout(() => {
        alert.remove()
    }, 3000);
    alert.textContent = mensaje
}





app()