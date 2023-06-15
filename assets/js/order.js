

// Get table and form elements
const orderDataTable = document.getElementById('orderDataTable');
const entryForm = document.getElementById('search-order-form');
const editEntryForm = document.getElementById('order-editEntryForm');
const registerForm = document.getElementById('entry-order-form');
const editForm = document.getElementById('order-editForm');
const addBtn = document.getElementById('order-addBtn');
const saveBtn = document.getElementById('order-saveBtn');
const cancelBtn = document.getElementById('order-cancelBtn');
const editSaveBtn = document.getElementById('order-editSaveBtn');
const editCancelBtn = document.getElementById('order-editCancelBtn');
const reloadBtn = document.getElementById('orderReloadBtn');
const searchBar = document.getElementById('search-order-button');
const searchBtn = document.getElementById('orderSearchBtn');
const saveTableBtn = document.getElementById('order-saveBtn');

// Initialize the table data array
let orderTableData = [];

// Show the register form
/*function showRegisterForm() {
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

}*/

// Add a new entry to the table
function addEntryToTable(entry) {
    const newRow = orderDataTable.insertRow();
    newRow.innerHTML = `
                <td>${entry.orderId}</td>
                <td>${entry.customerId}</td>
                <td>${entry.date}</td>
                <td>${entry.fkId}</td>
              
                <td>
                    <button class="edit-order-btn">Edit</button>
                    <button class="delete-order-btn">Delete</button>
                </td>
            `;

    const editBtn = newRow.querySelector('.edit-order-btn');
    editBtn.addEventListener('click', function() {
        showEditForm();
        populateEditForm(entry);
    });

    const deleteBtn = newRow.querySelector('.delete-order-btn');
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

    orderTableData.push(entry);
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
        orderTableData[rowIndex] = updatedEntry;
        updateTableRow(rowIndex, updatedEntry);
        hideEditForm();
        saveDataToLocalStorage();
    }
}

// Delete an entry
function deleteEntry(entry) {
    const rowIndex = orderTableData.indexOf(entry);
    if (rowIndex !== -1) {
        orderTableData.splice(rowIndex, 1);
        deleteTableRow(rowIndex);
        saveDataToLocalStorage();
    }
}

// Get the selected row index
function getSelectedRowIndex() {
    const rows = Array.from(orderDataTable.getElementsByTagName('tr'));
    const selectedRow = rows.find(row => row.classList.contains('selected'));
    return selectedRow ? selectedRow.rowIndex - 1 : -1;
}

// Update the table row with updated entry data
function updateTableRow(rowIndex, entry) {
    const row = orderDataTable.rows[rowIndex + 1];
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
    orderDataTable.deleteRow(rowIndex + 1);
}

// Search for entries based on search text
function searchEntries(searchText) {
    const filteredData = orderTableData.filter(entry =>
        entry.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.customerId.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.date.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.fkId.toLowerCase().includes(searchText.toLowerCase())

    );

    renderTable(filteredData);
}

// Render the table with data
function renderTable(data) {
    orderDataTable.innerHTML = `
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

    const editBtns = orderDataTable.getElementsByClassName('edit-btn');
    const deleteBtns = orderDataTable.getElementsByClassName('delete-btn');

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
    localStorage.setItem('orderTableData', JSON.stringify(orderTableData));
}

// Load table data from local storage
function loadDataFromLocalStorage() {
    const data = localStorage.getItem('orderTableData');
    if (data) {
        orderTableData = JSON.parse(data);
        renderTable(orderTableData);
    }
}

// Clear table data from local storage
function clearLocalStorage() {
    localStorage.removeItem('orderTableData');
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