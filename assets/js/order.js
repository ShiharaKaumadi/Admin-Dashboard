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
                <td>${entry.orderId}</td>
                <td>${entry.customerId}</td>
                <td>${entry.date}</td>
                <td>${entry.fkId}</td>
              
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
    document.getElementById('editOrderIdInput').value = entry.orderId;
    document.getElementById('editCustomerIdInput').value = entry.customerId;
    document.getElementById('editDateInput').value = entry.date;
    document.getElementById('editFkInput').value = entry.fkId;

}

// Add a new entry
function addEntry() {
    const orderId = document.getElementById('orderIdInput').value;
    const customerId = document.getElementById('customerIdInput').value;
    const date = document.getElementById('dateIdInput').value;
    const fkId = document.getElementById('fkInput').value;


    const entry = {
        orderId: orderId,
        customerId: customerId,
        date: date,
        fkId: fkId,

    };

    tableData.push(entry);
    addEntryToTable(entry);
    hideRegisterForm();
    saveDataToLocalStorage();
}

// Save the updated entry
function saveEntry() {
    const orderId = document.getElementById('editOrderIdInput').value;
    const customerId = document.getElementById('editCustomerIdInput').value;
    const date = document.getElementById('editDateInput').value;
    const fkId = document.getElementById('editFkInput').value;


    const updatedEntry = {
        orderId: orderId,
        customerId: customerId,
        date: date,
        fkId: fkId,
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
                    <td>${entry.orderId}</td>
                    <td>${entry.customerId}</td>
                    <td>${entry.date}</td>
                    <td>${entry.fkId}</td>
                   
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
        entry.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.customerId.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.date.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.fkId.toLowerCase().includes(searchText.toLowerCase())

    );

    renderTable(filteredData);
}

// Render the table with data
function renderTable(data) {
    dataTable.innerHTML = `
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Date</th>
                        <th>Customer_ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(entry => `
                        <tr>
                            <td>${entry.orderId}</td>
                            <td>${entry.customerId}</td>
                            <td>${entry.date}</td>
                            <td>${entry.fkId}</td>
                           
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