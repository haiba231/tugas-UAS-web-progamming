const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const timeInput = document.getElementById("time");

function addTask() {
    if (inputBox.value === "" || timeInput.value == "") {
        alert("jam dan Kegiatan tidak boleh kosong!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `[${timeInput.value}] ${inputBox.value}`;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        updateCounter();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        updateCounter();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
    updateCounter();
}

function updateCounter() {
    const tasks = listContainer.querySelectorAll("li");
    const doneTasks = listContainer.querySelectorAll("li.checked");

    document.getElementById("total").innerText = tasks.length;
    document.getElementById("done").innerText = doneTasks.length;
    document.getElementById("pending").innerText =
        tasks.length - doneTasks.length;
}

showTask();

