let form = document.getElementById('todo-form'); //the form for creating a task
let inputForm = document.getElementById('task-description-input'); //the input of the form
let completedItem = document.getElementById('completed-stats'); //the completed tasks p tag
let incompleteItem = document.getElementById('incomplete-stats'); //the pending tasks p tag
let taskDiv = document.getElementById('todo-display'); //the global todo div


let pendingTasks = 0; //maintains pending tasks count
let completedTasks = 0; //maintains completed tasks count

incompleteItem.innerText = 'Pending Tasks : ' + pendingTasks; //rendering the inital pending tasks
completedItem.innerText = 'Completed Tasks : ' + completedTasks; //rendering the initial completed tasks


/*---------------------------------------------EVENT LISTENERS-----------------------------------------------------*/


//adding event listener to the form which adds new task when clicked
form.addEventListener('submit', createTask);
//adding event listener to the todo list for marking the tasks as completed or delete them
taskDiv.addEventListener('click', markCompletedOrDelete);


/*---------------------------------------------FUNCTIONS-----------------------------------------------------*/

//FUNCTION :: 1
//this function either marks the task as completed or deletes it based upon the button targeted
function markCompletedOrDelete(event) {
    let item = event.target; //gets the element that is targeted

    if (item.classList[1] === 'fa-trash') { //if the targeted element is the delete button

        let todoItem = item.parentElement; //the parent div of the delete button which is the whole todo item

        if (todoItem.classList[1] === 'completed') {  //if the task was marked completed
            completedTasks--; //we need to decrement the completed tasks
            completedItem.innerText = 'Completed Tasks : ' + completedTasks; //rendering the updated value
        } else { //if the task was not marked completed
            pendingTasks--; //we need to decrement the pending tasks
            incompleteItem.innerText = 'Pending Tasks : ' + pendingTasks; //rendering the updated value
        }

        todoItem.remove(); //finally we remove the item from the list
    }

    if (item.classList[0] === 'mark-completed-button') { //if the targeted element is the checkbox

        let todoText = item.parentElement; //this gets the wrapper div of the todo description
        let todoItem = item.parentElement.parentElement; //this gets the whole todo item

        todoText.style.textDecoration = 'line-through'; //striking throught the text to mark it completed
        todoText.style.color = 'grey'; //changing the font color of the text
        item.style.backgroundColor = '#673AB7'; //changing the background color of the checkbox

        pendingTasks--; //decrementing the pending tasks
        incompleteItem.innerText = 'Pending Tasks : ' + pendingTasks; //rendering the new value
        completedTasks++; //incrementing the completed tasks
        completedItem.innerText = 'Completed Tasks : ' + completedTasks; //rendering the new value

        todoItem.classList.add('completed'); //adding completed class to the todo item to mark it as completed
    }

}

//FUNCTION :: 2
//this function creates a new task item
function createTask(event) {
    event.preventDefault(); //prevents the form from submitting

    /*   For every element in the array of tasks we need to add this, html code
         <li>       
                <div class="tasks">
                    <div class="wrap">
                        <div id='mark-completed-button></div>
                            
                        <b>Add JavaScript to the Website!</b>
                    </div>
                    <i class="fas fa-trash"></i>
                </div>
         </li>
    */

    pendingTasks++; //since new task is created pending task is increased by 1
    incompleteItem.innerText = 'Pending Tasks : ' + pendingTasks; //rendering the new value

    let listItem = document.createElement('li'); //creates the li tag
    let item = document.createElement('div'); //creates the outer div
    item.classList.add('tasks'); //adding tasks class to the div
    let subItem = document.createElement('div'); //creates the inner div
    subItem.classList.add('wrap'); //adding the wrap class to inner div
    let markCompletedBtn = document.createElement('div'); //creates the checkbox 
    markCompletedBtn.classList.add('mark-completed-button'); //adds the radio button to the form
    let desc = document.createElement('b'); //creates the b tag
    desc.innerText = inputForm.value; //adds the description of the task to the b tag
    subItem.appendChild(markCompletedBtn); //appending form to inner div
    subItem.appendChild(desc); //appending b tag to inner div
    item.appendChild(subItem); //appending inner div to outer div
    let trash = document.createElement('i'); //creating an a tag
    trash.classList.add('fas'); //adding relevant class to the fa icon
    trash.classList.add('fa-trash'); //adding relevant class to the fa icon
    item.appendChild(trash); //appending the delete button to the outer div
    listItem.appendChild(item); //appending the outer div to li tag
    document.getElementById('tasks-list').appendChild(listItem); //appending li tag to the ul tag
    inputForm.value = ""; //setting the entered text of the form to empty after adding it
}