// الانتقال من صفحة الترحيب
const startButton = document.querySelector("button");

if (startButton && window.location.pathname.includes("index.html")) {
    startButton.addEventListener("click", () => {
        window.location.href = "home.html";
    });
}

// عناصر الصفحة
const addTask = document.getElementById("addTask");
const clearTasks = document.getElementById("clearTasks");

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const category = document.getElementById("category");

const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const starCount = document.getElementById("starCount");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const dashboardStars = document.getElementById("dashboardStars");
const dashboardDone = document.getElementById("dashboardDone");
const dashboardTasks = document.getElementById("dashboardTasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let stars = 0;
let totalTasks = 0;
let completedTasks = 0;
function checkEmpty(){

    if(totalTasks === 0){

        emptyMessage.style.display = "block";

    }else{

        emptyMessage.style.display = "none";

    }

}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateProgress() {

    progressText.textContent = `⭐ ${completedTasks} / ${totalTasks} Tasks`;

    let percent = 0;

    if (totalTasks > 0) {
        percent = (completedTasks / totalTasks) * 100;
    }

    progressFill.style.width = percent + "%";

    starCount.textContent = stars;
    dashboardStars.textContent = stars;
dashboardDone.textContent = completedTasks;
dashboardTasks.textContent = totalTasks;
checkEmpty();
}

function createTask(taskData) {

    const task = document.createElement("div");

    task.className = "task";

    task.innerHTML = `
        <div class="task-info">
            <h3>${taskData.title}</h3>
            <p>📅 ${taskData.date}</p>
            <p>${taskData.time}</p>
            <p>${taskData.category}</p>
        </div>

        <div class="task-buttons">
            <button class="done">🌙</button>
            <button class="delete">🗑️</button>
        </div>
    `;

    taskList.prepend(task);

    totalTasks++;

    const doneBtn = task.querySelector(".done");
    const deleteBtn = task.querySelector(".delete");

    if (taskData.done) {

        task.classList.add("done-task");

        doneBtn.innerHTML = "🌟";
        doneBtn.style.background = "#FFD700";
        doneBtn.style.color = "#fff";
        doneBtn.disabled = true;

        stars++;
        completedTasks++;
    }

    updateProgress();

    doneBtn.addEventListener("click", function () {

        if (doneBtn.disabled) return;

        task.classList.add("done-task");

        doneBtn.innerHTML = "🌟";
        doneBtn.style.background = "#FFD700";
        doneBtn.style.color = "#fff";
        doneBtn.disabled = true;

        stars++;
        completedTasks++;

        taskData.done = true;

        saveTasks();
        updateProgress();

    });

    deleteBtn.addEventListener("click", function () {

        totalTasks--;

        if (taskData.done) {
            completedTasks--;
            stars--;
        }

        const index = tasks.indexOf(taskData);

        if (index > -1) {
            tasks.splice(index, 1);
        }

        saveTasks();

        task.remove();

        updateProgress();

    });

}

if (addTask) {

    addTask.addEventListener("click", function () {

        if (taskInput.value.trim() === "") {
            alert("Please enter a task ⭐");
            return;
        }

        const newTask = {
            title: taskInput.value,
            date: taskDate.value,
            time: taskTime.value,
            category: category.value,
            done: false
        };

        tasks.push(newTask);

        saveTasks();

        createTask(newTask);

        taskInput.value = "";
        taskDate.value = "";
        taskTime.value = "";
        category.selectedIndex = 0;

    });

}

if (clearTasks) {

    clearTasks.addEventListener("click", function () {

        if (confirm("Delete all tasks?")) {

            tasks = [];

            saveTasks();

            taskList.innerHTML = "";

            stars = 0;
            totalTasks = 0;
            completedTasks = 0;

            updateProgress();

        }

    });

}

// تحميل المهام عند فتح الصفحة
tasks.forEach(function(task){

    createTask(task);

});
const themeBtn = document.getElementById("themeBtn");

if(themeBtn){

    themeBtn.addEventListener("click", function(){

        if(document.body.classList.contains("dark-mode")){

            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");

            themeBtn.innerHTML="☀️";

        }else{

            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");

            themeBtn.innerHTML="🌙";

        }

    });

}