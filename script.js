document.addEventListener("DOMContentLoaded", function() {
    initCalendar();
});

function initCalendar() {
    const calendarEl = document.getElementById("calendar");
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        events: getEvents(),
        dateClick: function(info) {
            const date = info.dateStr;
            const tasks = JSON.parse(localStorage.getItem(date)) || [];
            displayTasks(date, tasks);
        }
    });
    calendar.render();
}

function getEvents() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const events = tasks.map(task => ({
        title: task,
        start: task
    }));
    return events;
}

function displayTasks(date, tasks) {
    let message = `Tasks for ${date}:\n`;
    tasks.forEach(task => {
        message += `- ${task}\n`;
    });
    alert(message);
}

function addTask() {
    const taskInput = prompt("Enter task:");
    const currentDate = new Date();
    const dateKey = currentDate.toISOString().split('T')[0]; 
    if (taskInput !== null && taskInput.trim() !== "") {
        const tasks = JSON.parse(localStorage.getItem(dateKey)) || [];
        tasks.push(taskInput);
        localStorage.setItem(dateKey, JSON.stringify(tasks));
        refreshCalendar();
    } else {
        alert("Please enter a task.");
    }
}

function refreshCalendar() {
    const calendarEl = document.getElementById("calendar");
    calendarEl.innerHTML = ""; 
    initCalendar(); 
}
