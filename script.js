let selectedMethod = "Wi-Fi";
let selectedFiles = [];

function switchView(viewName) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.getElementById("view-" + viewName).classList.add("active");

    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    const activeNav = document.getElementById("nav-" + viewName);
    if (activeNav) activeNav.classList.add("active");
}

function openSendView() {
    document.getElementById("send-method-label").textContent = selectedMethod;
    switchView("send");
}

function openModal(id) {
    document.getElementById("receive-method-label").textContent = selectedMethod;
    document.getElementById(id).classList.add("show");
}

function closeModals() {
    document.querySelectorAll(".modal").forEach(m => m.classList.remove("show"));
}

function selectMethod(button, method) {
    document.querySelectorAll(".method-pill").forEach(pill => {
        pill.classList.remove("active");
    });

    button.classList.add("active");
    selectedMethod = method;

    document.getElementById("stat-method").textContent = method.toUpperCase();
    document.getElementById("send-method-label").textContent = method;
    document.getElementById("mascot-speech").innerHTML =
        `LINK: ${method.toUpperCase()}!<br>READY TO TRANSFER!`;
}

function showDeviceToast() {
    document.getElementById("mascot-speech").innerHTML =
        `VISIBLE ON ${selectedMethod.toUpperCase()}!`;
    switchView("home");
}

const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", function () {
    selectedFiles = Array.from(this.files);
    document.getElementById("file-count-display").textContent = selectedFiles.length;

    const fileList = document.getElementById("file-list");
    fileList.innerHTML = "";

    selectedFiles.forEach(file => {
        const item = document.createElement("div");
        item.className = "file-item";

        const name = document.createElement("span");
        name.textContent = "📄 " + file.name;

        const size = document.createElement("small");
        size.textContent = formatSize(file.size);

        item.append(name, size);
        fileList.appendChild(item);
    });
});

function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function startTransfer() {
    if (selectedFiles.length === 0) {
        alert("Please select at least one file!");
        return;
    }

    const progressArea = document.getElementById("progress-area");
    progressArea.classList.add("show");

    document.getElementById("progress-text").textContent = "SENDING VIA " + selectedMethod.toUpperCase() + "...";
    document.getElementById("progress-note").textContent = "DEMO PROGRESS ONLY — ENGINE NOT CONNECTED.";

    let progress = 0;
    const bar = document.getElementById("progress-bar");
    const percent = document.getElementById("progress-percent");

    bar.style.width = "0%";
    percent.textContent = "0%";

    const timer = setInterval(() => {
        progress += 2;
        bar.style.width = progress + "%";
        percent.textContent = progress + "%";

        if (progress >= 100) {
            clearInterval(timer);
            document.getElementById("progress-text").textContent = "TRANSFER COMPLETE!";
        }
    }, 50);
}