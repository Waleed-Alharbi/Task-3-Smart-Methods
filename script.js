const sliders = [];
const slidersDiv = document.getElementById("sliders");

for (let i = 0; i < 6; i++) {
    let label = document.createElement("label");
    label.textContent = `Motor ${i + 1}: `;
    let slider = document.createElement("input");
    slider.type = "range";
    slider.min = 0;
    slider.max = 180;
    slider.value = 90;
    sliders.push(slider);
    label.appendChild(slider);
    slidersDiv.appendChild(label);
    slidersDiv.appendChild(document.createElement("br"));
}

function reset() {
    sliders.forEach(s => s.value = 90);
}

function savePose() {
    let values = sliders.map(s => s.value);
    fetch("get_run_pose.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `motor1=${values[0]}&motor2=${values[1]}&motor3=${values[2]}&motor4=${values[3]}&motor5=${values[4]}&motor6=${values[5]}`
    }).then(() => loadPoses());
}

function run() {
    fetch("update_status.php");
}

function loadPoses() {
    fetch("get_run_pose.php")
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("posesBody");
            tbody.innerHTML = "";
            data.forEach((row, i) => {
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${i + 1}</td>
                    <td>${row.motor1}</td><td>${row.motor2}</td><td>${row.motor3}</td>
                    <td>${row.motor4}</td><td>${row.motor5}</td><td>${row.motor6}</td>
                    <td>
                        <button onclick="loadPose(${JSON.stringify(row)})">Load</button>
                        <button onclick="removePose(${row.id})">Remove</button>
                    </td>`;
                tbody.appendChild(tr);
            });
        });
}

function loadPose(pose) {
    sliders[0].value = pose.motor1;
    sliders[1].value = pose.motor2;
    sliders[2].value = pose.motor3;
    sliders[3].value = pose.motor4;
    sliders[4].value = pose.motor5;
    sliders[5].value = pose.motor6;
}

function removePose(id) {
    fetch(`get_run_pose.php?id=${id}&delete=1`).then(() => loadPoses());
}

loadPoses();
