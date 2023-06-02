let data = [];

function generateRegistrationForm() {
    const registerForm = document.getElementById('registerForm');
    registerForm.style.display = 'block';

    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('phoneInput').value = '';
    document.getElementById('addressInput').value = '';
    document.getElementById('salaryInput').value = '';

    document.getElementById('saveBtn').addEventListener('click', function (event) {
        event.preventDefault();
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const phone = document.getElementById('phoneInput').value;
        const address = document.getElementById('addressInput').value;
        const salary = document.getElementById('salaryInput').value;

        const entry = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            salary: salary
        };

        data.push(entry);

        renderTable();

        clearForm();
    });

    document.getElementById('cancelBtn').addEventListener('click', function (event) {
        event.preventDefault();
        clearForm();
    });
}

function generateEditForm(index) {
    const entry = data[index];
    const editForm = document.getElementById('editForm');
    editForm.style.display = 'block';

    document.getElementById('editNameInput').value = entry.name;
    document.getElementById('editEmailInput').value = entry.email;
    document.getElementById('editPhoneInput').value = entry.phone;
    document.getElementById('editAddressInput').value = entry.address;
    document.getElementById('editSalaryInput').value = entry.salary;

    document.getElementById('editSaveBtn').addEventListener('click', function (event) {
        event.preventDefault();
        const name = document.getElementById('editNameInput').value;
        const email = document.getElementById('editEmailInput').value;
        const phone = document.getElementById('editPhoneInput').value;
        const address = document.getElementById('editEmailInput').value;
        const salary = document.getElementById('editSalaryInput').value;

        data[index].name = name;
        data[index].email = email;
        data[index].phone = phone;
        data[index].address = address;
        data[index].salary = salary;

        renderTable();

        clearEditForm();
    });

    document.getElementById('editCancelBtn').addEventListener('click', function (event) {
        event.preventDefault();
        clearEditForm();
    });
}

function clearForm() {
    document.getElementById('entryForm').reset();
    document.getElementById('registerForm').style.display = 'none';
}

function clearEditForm() {
    document.getElementById('editEntryForm').reset();
    document.getElementById('editForm').style.display = 'none';
}

function deleteEntry(index) {
    if (confirm('Are you sure you want to delete this entry?')) {
        data.splice(index, 1);
        renderTable();
    }
}

function renderTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        const row = `
          <tr>
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.phone}</td>
            <td>${entry.address}</td>
            <td>${entry.salary}</td>
            <td>
              <button class="btn btn-primary edit-btn" data-index="${i}">Edit</button>
              <button class="btn btn-danger delete-btn" data-index="${i}">Delete</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
    }

    const editButtons = document.getElementsByClassName('edit-btn');
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            generateEditForm(index);
        });
    }

    const deleteButtons = document.getElementsByClassName('delete-btn');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            deleteEntry(index);
        });
    }
}

// Search functionality
document.getElementById('searchBtn').addEventListener('click', function() {
    var searchValue = document.getElementById('searchBar').value;
    var found = false;

    var table = document.getElementById('dataTable');
    for (var i = 1; i < table.rows.length; i++) {
        var name = table.rows[i].cells[0].innerHTML;
        var email = table.rows[i].cells[1].innerHTML;

        if (name.includes(searchValue) || email.includes(searchValue)) {
            table.rows[i].style.display = '';
            found = true;
        } else {
            table.rows[i].style.display = 'none';
        }
    }

    if (!found) {
        alert('Value is Not available');
    }
});

document.getElementById('addBtn').addEventListener('click', function () {
    generateRegistrationForm();
});