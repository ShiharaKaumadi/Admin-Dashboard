var sidebarOpen =false;/*set a variable called sidebarOpen and default set to false*/
/*In order to open and clos ethe side ba w need to give access to html element */
var sidebar=document.getElementById("sidebar"); /*js use DOM model we can use it to directly manipulate dom element
by this js can refernce to the html element through the id called sidebar*/

/*Define the opensidebar function*/
function openSideBar(){
    /*mention the arguments*/
    if (!sidebarOpen){
        /*check whether the side bar is currently open or not*/
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen=true; /*If the sidebar is closed tell it to set the sidebarOpen into false*/
    }
}

function closeSidebar(){
    /* This function is used to close a
    sidebar by removing a CSS class and updating a boolean variable.*/
    if (sidebarOpen){/*It checks if the variable sidebarOpen is true.*/
        sidebar.classList.remove("sidebar-responsive");/*It uses the classList.remove() method
          to remove the CSS class "sidebar-responsive" from the sidebar element..*/
        sidebarOpen=false;/*It updates the sidebarOpen variable to false.*/
    }
}


// Get table and form elements
const dataTable = document.getElementById('dataTable');
const entryForm = document.getElementById('entryForm');
const editEntryForm = document.getElementById('editEntryForm');
const registerForm = document.getElementById('registerForm');
const editForm = document.getElementById('editForm');
const addBtn = document.getElementById('addBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const editSaveBtn = document.getElementById('editSaveBtn');
const editCancelBtn = document.getElementById('editCancelBtn');
const reloadBtn = document.getElementById('reloadBtn');
const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const saveTableBtn = document.getElementById('saveTableBtn');

// Initialize the table data array
let tableData = [];

// Show the register form
function showRegisterForm() {
    registerForm.style.display = 'block';
}

// Hide the register form
function hideRegisterForm() {
    registerForm.style.display = 'none';
    resetFormFields();
}

// Show the edit form
function showEditForm() {
    editForm.style.display = 'block';
}

// Hide the edit form
function hideEditForm() {
    editForm.style.display = 'none';
    resetFormFields();
}

// Reset the form fields
function resetFormFields() {
    entryForm.reset();
    editEntryForm.reset();
}

// Add a new entry to the table
function addEntryToTable(entry) {
    const newRow = dataTable.insertRow();
    newRow.innerHTML = `
                <td>${entry.id}</td>
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.phone}</td>
                <td>${entry.address}</td>
                <td>${entry.salary}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;

    const editBtn = newRow.querySelector('.edit-btn');
    editBtn.addEventListener('click', function() {
        showEditForm();
        populateEditForm(entry);
    });

    const deleteBtn = newRow.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this record?')) {
            deleteEntry(entry);
        }
    });
}

// Populate the edit form with entry data
function populateEditForm(entry) {
    document.getElementById('editIdInput').value = entry.id;
    document.getElementById('editNameInput').value = entry.name;
    document.getElementById('editEmailInput').value = entry.email;
    document.getElementById('editPhoneInput').value = entry.phone;
    document.getElementById('editAddressInput').value = entry.address;
    document.getElementById('editSalaryInput').value = entry.salary;
}

// Add a new entry
function addEntry() {
    const id = document.getElementById('idInput').value;
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const phone = document.getElementById('phoneInput').value;
    const address = document.getElementById('addressInput').value;
    const salary = document.getElementById('salaryInput').value;

    const entry = {
        id:id,
        name: name,
        email: email,
        phone: phone,
        address: address,
        salary: salary
    };

    tableData.push(entry);
    addEntryToTable(entry);
    hideRegisterForm();
    saveDataToLocalStorage();
}

// Save the updated entry
function saveEntry() {
    const id = document.getElementById('editIdInput').value;
    const name = document.getElementById('editNameInput').value;
    const email = document.getElementById('editEmailInput').value;
    const phone = document.getElementById('editPhoneInput').value;
    const address = document.getElementById('editAddressInput').value;
    const salary = document.getElementById('editSalaryInput').value;

    const updatedEntry = {
        id: id,
        name: name,
        email: email,
        phone: phone,
        address: address,
        salary: salary
    };

    const rowIndex = getSelectedRowIndex();
    if (rowIndex !== -1) {
        tableData[rowIndex] = updatedEntry;
        updateTableRow(rowIndex, updatedEntry);
        hideEditForm();
        saveDataToLocalStorage();
    }
}

// Delete an entry
function deleteEntry(entry) {
    const rowIndex = tableData.indexOf(entry);
    if (rowIndex !== -1) {
        tableData.splice(rowIndex, 1);
        deleteTableRow(rowIndex);
        saveDataToLocalStorage();
    }
}

// Get the selected row index
function getSelectedRowIndex() {
    const rows = Array.from(dataTable.getElementsByTagName('tr'));
    const selectedRow = rows.find(row => row.classList.contains('selected'));
    return selectedRow ? selectedRow.rowIndex - 1 : -1;
}

// Update the table row with updated entry data
function updateTableRow(rowIndex, entry) {
    const row = dataTable.rows[rowIndex + 1];
    if (row) {
        row.innerHTML = `
                    <td>${entry.id}</td>
                    <td>${entry.name}</td>
                    <td>${entry.email}</td>
                    <td>${entry.phone}</td>
                    <td>${entry.address}</td>
                    <td>${entry.salary}</td>
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                `;

        const editBtn = row.querySelector('.edit-btn');
        editBtn.addEventListener('click', function() {
            showEditForm();
            populateEditForm(entry);
        });

        const deleteBtn = row.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this record?')) {
                deleteEntry(entry);
            }
        });
    }
}

// Delete the table row
function deleteTableRow(rowIndex) {
    dataTable.deleteRow(rowIndex + 1);
}

// Search for entries based on search text
function searchEntries(searchText) {
    const filteredData = tableData.filter(entry =>
        entry.id.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.name.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.phone.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.address.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.salary.toLowerCase().includes(searchText.toLowerCase())
    );

    renderTable(filteredData);
}

// Render the table with data
function renderTable(data) {
    dataTable.innerHTML = `
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(entry => `
                        <tr>
                            <td>${entry.id}</td>
                            <td>${entry.name}</td>
                            <td>${entry.email}</td>
                            <td>${entry.phone}</td>
                            <td>${entry.address}</td>
                            <td>${entry.salary}</td>
                            <td>
                                <button class="edit-btn">Edit</button>
                                <button class="delete-btn">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            `;

    const editBtns = dataTable.getElementsByClassName('edit-btn');
    const deleteBtns = dataTable.getElementsByClassName('delete-btn');

    Array.from(editBtns).forEach((editBtn, index) => {
        editBtn.addEventListener('click', function() {
            showEditForm();
            populateEditForm(data[index]);
        });
    });

    Array.from(deleteBtns).forEach((deleteBtn, index) => {
        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this record?')) {
                deleteEntry(data[index]);
            }
        });
    });
}

// Save table data to local storage
function saveDataToLocalStorage() {
    localStorage.setItem('tableData', JSON.stringify(tableData));
}

// Load table data from local storage
function loadDataFromLocalStorage() {
    const data = localStorage.getItem('tableData');
    if (data) {
        tableData = JSON.parse(data);
        renderTable(tableData);
    }
}

// Clear table data from local storage
function clearLocalStorage() {
    localStorage.removeItem('tableData');
}

// Event listeners
addBtn.addEventListener('click', showRegisterForm);
cancelBtn.addEventListener('click', hideRegisterForm);
saveBtn.addEventListener('click', addEntry);
editCancelBtn.addEventListener('click', hideEditForm);
editSaveBtn.addEventListener('click', saveEntry);
reloadBtn.addEventListener('click', loadDataFromLocalStorage);
searchBtn.addEventListener('click', function() {
    const searchText = searchBar.value;
    searchEntries(searchText);
});
saveTableBtn.addEventListener('click', saveDataToLocalStorage);

// Load data from local storage on page load
window.addEventListener('DOMContentLoaded', function() {
    loadDataFromLocalStorage();
});