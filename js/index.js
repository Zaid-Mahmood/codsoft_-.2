let editIndex = -1;

window.onload = function onLoader() {
    let webStore = localStorage.getItem("localTask");
    let taskObj = webStore ? JSON.parse(webStore) : [];
        displayData(taskObj);
};

function displayData(data) {
    let html = "";
    let table = document.getElementById("listTable");
    data.forEach((item, id) => {
        html +=
            `<tr>
            <th>${id + 1}</th>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.age}</td>
            <td>${item.address}</td>
            <td>
                <button class="btn btn-secondary" onclick="editFunc(${id})">Edit</button>
                <button class="btn btn-danger mx-2" onclick="deleteFunc(${id})">Delete</button>
            </td>
        </tr>`;
    });
    table.innerHTML = html;
}

function validateFields() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;

    if (validateInput(name, email, age, address)) {
        let taskObj = JSON.parse(localStorage.getItem("localTask")) || [];
        if (editIndex === -1) {
            taskObj.push({ name, email, age, address });
        } else {
            taskObj[editIndex] = { name, email, age, address };
            editIndex = -1; 
        }
        localStorage.setItem("localTask", JSON.stringify(taskObj));
        displayData(taskObj);

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("submitBtn").classList.remove("d-none");
        document.getElementById("updateBtn").classList.add("d-none");
    }

    return false;
}

function validateInput(name, email, age, address) {
    if (name === "" || email === "" || age === "" || address === "") {
        document.querySelector(".allEmptyError").classList.remove("d-none");
        return false;
    }else{
        document.querySelector(".allEmptyError").classList.add("d-none");
    }

    let namePattern = /^[A-Za-z\s]+$/;
    let emailPattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    let agePattern = /^[1-9][0-9]?$|^100$/;
    let addressPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])/;

    if (!name.match(namePattern)) {
        document.querySelector(".validName").classList.remove("d-none");
        return false;
    }else{
        document.querySelector(".validName").classList.add("d-none");
    }
    if (!email.match(emailPattern)) {
        document.querySelector(".validEmail").classList.remove("d-none");
        return false;
    }else{
        document.querySelector(".validEmail").classList.add("d-none");
    }
    if (!age.match(agePattern)) {
        document.querySelector(".validAge").classList.remove("d-none");
        return false;
    }else{
        document.querySelector(".validAge").classList.add("d-none");
    }
    if (!address.match(addressPattern)) {
        document.querySelector(".validAddress").classList.remove("d-none");
        return false;
    }else{
        document.querySelector(".validAddress").classList.add("d-none");
    }

    return true;
}

function editFunc(id) {
    let taskObj = JSON.parse(localStorage.getItem("localTask"));
        let selectedData = taskObj[id];
        document.getElementById("name").value = selectedData.name;
        document.getElementById("email").value = selectedData.email;
        document.getElementById("age").value = selectedData.age;
        document.getElementById("address").value = selectedData.address;
        editIndex = id;
        document.getElementById("submitBtn").classList.add("d-none");
        document.getElementById("updateBtn").classList.remove("d-none");
    }

function deleteFunc(id) {
    let taskObj = JSON.parse(localStorage.getItem("localTask"));
        taskObj.splice(id, 1);
        localStorage.setItem("localTask", JSON.stringify(taskObj));
        displayData(taskObj);
    }
