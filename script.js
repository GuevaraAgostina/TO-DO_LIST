//obtnemos el form
const form = document.querySelector('.form');//. por class
const taskInput = document.querySelector('#taskInput');//# por ID
const taskList = document.querySelector('#taskList');

let tasks = [];

const renderTask = () =>{
    taskList.innerHTML = "";


    //recorremos el array 
    tasks.forEach(task => {//task.propiedad lo hace ser dinamico ya que lo obtengo del array
        //en la etiqueta del parrafo hacemos el lass="${task.complete && "done"}" para ponerle la clase del done si esta completa la tarea osea si el user hizo click en hecho(done)
        const html = `
            <li data-id="${task.id}" class="tasks_item">
                    <p class="${task.complete && "done"}"  >${task.title}</p>
                    <div> <span class="task_date">${task.date}</span> </div>
                    <div>
                        <i class="bx bx-check" ></i>
                        <i class="bx bx-trash" ></i>
                    </div>
                </li>

        `;
        taskList.innerHTML += html;

    });
}

form.addEventListener('submit', (event)=>{
    //prevenimos el envio del formulario
    event.preventDefault();

    const taskText= taskInput.value.trim();//el trim limpia lo que ponga el user
//a lo que me puso en el input veo el valor, lo limpio de chars que estan al pepe y cuento los char que tiene, si tiene menos de 3 muestra el error
    if(taskText.length >= 3){
        // console.log(taskText);
        //creo una estructura del objeto con sus propiedades
        const task = {
            id: Date.now(),
            title: taskText,
            complete: false,
            date: new Date().toLocaleString(), // Agregamos la fecha y hora actual
        };
        //ese objeto se lo mando al array definido al principio
    tasks.push(task);
    /*para entenderlo mejor, a esa tarea le agregue propiedades y lo mande al array de tasks(tareas) */
    // console.log(task, tasks);
    //limpio el input 
    taskInput.value="";
    //limpio la lista maqueta que tengo hecha en html
    renderTask();//muestra las tareas enviadas/renderizamos
    saveTasks();//guardamos las tareas en el local storage

    
    } else{
            //alert("La tarea tiene que tener 3 o mas caracterers");
            const error = document.querySelector(".error");
            error.textContent = "La tarea tiene que tener 3 o mas caracterers";

            setTimeout(()=> {
                error.textContent = "";
            }, 2000);
        }
    // console.log(event)
});
// Función para guardar tareas en localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Llama a loadTasks al inicio para cargar las tareas guardadas
loadTasks();
renderTask();

//ahora le amos funcionalidad a los iconos: bx-check
// const bxCheck = document.querySelector(".bx-check");
// console.log(bxCheck);

// bxCheck.addEventListener("click", () => {
//     console.log("Click en bx-check");
// });
//estoy atento a los clicks, me dice en donde hago click
document.addEventListener('click', (event) => {
    //si el user hizo click en el icono de check..
    if (event.target.classList.contains('bx-check'))//mark task as complete
    //classlist lo deja en array & .contains da true o falsa en los dos icons bque estan en un div
    {
        //en que elemento se hizo click ?
        console.log(tasks);
        const id = event.target.closest('li').dataset.id//esto recupera el id del li que contiene el icono en el que se hizo click 
        // console.log(event.target.closest('li')); --trae el elemento li del container en el que esta
        console.log(id);

        
        //lo traigodel array
        const task = tasks.find((task) => task.id == id);
        task.complete = !task.complete;//le asigno el contrario para que cuando haga el click en el tilde de completado se complete y diga true en complete

        renderTask();//actualiza la lista de tareas
        //otra forma.. que es mejor para cuando la pagina es mas grande
        // event.target.closest("li").querySelector("p").classList.toggle("done");


    }
    else if(event.target.classList.contains('bx-trash'))//delete task
    {

        const id = event.target.closest('li').dataset.id;
        const index = tasks.findIndex((task) => task.id == id);
        if (index !== -1) {//we use confirm() to ask for user confirmation before deleting a task
            if (confirm('Estas seguro de borrar esta tarea?')) {
                tasks.splice(index, 1);
                //lo borramos
                saveTasks();
                renderTask();
            }
        } else {
            console.error('Task not found');
        }      

    }

})

