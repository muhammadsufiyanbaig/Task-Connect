const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector(".wrapper input");
const tasksContainer = document.querySelector(".tasks");
const error = document.getElementById("error");

let taskCount = 0;

function displayCount(taskCount) {
    document.querySelector(".count-value").innerText = taskCount;
}

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        error.style.display = "block";
        setTimeout(() => {
            error.style.display = "none";
        }, 2000);
        return;
    }

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    taskElement.innerHTML = `
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
            <i class="fas fa-pen" style="color: #1f3751;"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash"></i>
        </button>
    `;

    tasksContainer.appendChild(taskElement);

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        });
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editbtn) => {
        editbtn.addEventListener("click", (e) => {
            const targetElement = e.target.closest(".task");
            const taskText = targetElement.querySelector(".taskname").innerText;
            newTaskInput.value = taskText;
            targetElement.remove();
            taskCount -= 1;
            displayCount(taskCount);
        });
    });

    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.addEventListener("change", () => {
            const taskElement = checkBox.closest(".task");
            taskElement.querySelector(".taskname").classList.toggle("completed", checkBox.checked);
            taskCount += checkBox.checked ? -1 : 1;
            displayCount(taskCount);
        });
    });

    taskCount += 1;
    displayCount(taskCount);
    newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
};
