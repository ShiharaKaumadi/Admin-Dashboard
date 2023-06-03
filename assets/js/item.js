// Get table and form elements
const itemDataTable = document.getElementById('data-item-Table');
const entryForm = document.getElementById('entry-item-Form');
const editEntryForm = document.getElementById('edit-item-EntryForm');
const registerForm = document.getElementById('register-item-Form');
const editForm = document.getElementById('edit-item-Form');
const addBtn = document.getElementById('add-item-button');
const saveBtn = document.getElementById('save-item-Btn');
const cancelBtn = document.getElementById('cancel-item-Btn');
const editSaveBtn = document.getElementById('edit-item-SaveBt');
const editCancelBtn = document.getElementById('edit-item-CancelBtn');
const reloadBtn = document.getElementById('reload-item-Btn');
const searchBar = document.getElementById('search-item-Bar');
const searchBtn = document.getElementById('search-item-Btn');
/*const saveTableBtn = document.getElementById('saveBtn');*/

// Initialize the table data array
let itemTableData = [];

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
    const newRow = itemDataTable.insertRow();
    newRow.innerHTML = `
                <td>${entry.itemCode}</td>
                <td>${entry.description}</td>
                <td>${entry.qtyOnHand}</td>
                <td>${entry.unitPrice}</td>
              
                <td>
                    <button class="edit-item-btn">Edit</button>
                    <button class="delete-item-btn">Delete</button>
                </td>
            `;

    const editBtn = newRow.querySelector('.edit-item-btn');
    editBtn.addEventListener('click', function() {
        showEditForm();
        populateEditForm(entry);
    });

    const deleteBtn = newRow.querySelector('.delete-item-btn');
    deleteBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this record?')) {
            deleteEntry(entry);
        }
    });
}

// Populate the edit form with entry data
function populateEditForm(entry) {
    document.getElementById('editItemCodeInput').value = entry.itemCode;
    document.getElementById('editDescriptionInput').value = entry.description;
    document.getElementById('editQtyOnHandInput').value = entry.qtyOnHand;
    document.getElementById('editUnitPriceInput').value = entry.unitPrice;

}

// Add a new entry
function addEntry() {
    const itemCode = document.getElementById('itemCodeInput').value;
    const description = document.getElementById('descriptionInput').value;
    const qtyOnHand = document.getElementById('qtyOnHandInput').value;
    const unitPrice = document.getElementById('unitPriceInput').value;


    const entry = {
        itemCode: itemCode,
        description: description,
        qtyOnHand: qtyOnHand,
        unitPrice: unitPrice,

    };

    itemTableData.push(entry);
    addEntryToTable(entry);
    hideRegisterForm();
    saveDataToLocalStorage();
}

// Save the updated entry
function saveEntry() {
    const itemCode = document.getElementById('editItemCodeInput').value;
    const description = document.getElementById('editDescriptionInput').value;
    const qtyOnHand = document.getElementById('editQtyOnHandInput').value;
    const unitPrice = document.getElementById('editUnitPriceInput').value;


    const updatedEntry = {
        itemCode: itemCode,
        description: description,
        qtyOnHand: qtyOnHand,
        unitPrice: unitPrice,
    };

    const rowIndex = getSelectedRowIndex();
    if (rowIndex !== -1) {
        itemTableData[rowIndex] = updatedEntry;
        updateTableRow(rowIndex, updatedEntry);
        hideEditForm();
        saveDataToLocalStorage();
    }
}

// Delete an entry
function deleteEntry(entry) {
    const rowIndex = itemTableData.indexOf(entry);
    if (rowIndex !== -1) {
        itemTableData.splice(rowIndex, 1);
        deleteTableRow(rowIndex);
        saveDataToLocalStorage();
    }
}

// Get the selected row index
function getSelectedRowIndex() {
    const rows = Array.from(itemDataTable.getElementsByTagName('tr'));
    const selectedRow = rows.find(row => row.classList.contains('selected'));
    return selectedRow ? selectedRow.rowIndex - 1 : -1;
}

// Update the table row with updated entry data
function updateTableRow(rowIndex, entry) {
    const row = itemDataTable.rows[rowIndex + 1];
    if (row) {
        row.innerHTML = `
                    <td>${entry.itemCode}</td>
                    <td>${entry.description}</td>
                    <td>${entry.qtyOnHand}</td>
                    <td>${entry.unitPrice}</td>
                   
                    <td>
                        <button class="edit-item-btn">Edit</button>
                        <button class="delete-item-btn">Delete</button>
                    </td>
                `;

        const editBtn = row.querySelector('#edit-item-SaveBtn');
        editBtn.addEventListener('click', function() {
            showEditForm();
            populateEditForm(entry);
        });

        const deleteBtn = row.querySelector('#edit-item-CancelBtn');
        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this record?')) {
                deleteEntry(entry);
            }
        });
    }
}

// Delete the table row
function deleteTableRow(rowIndex) {
    itemTableData.deleteRow(rowIndex + 1);
}

// Search for entries based on search text
function searchEntries(searchText) {
    const filteredData = itemTableData.filter(entry =>
        entry.itemCode.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.qtyOnHand.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.unitPrice.toLowerCase().includes(searchText.toLowerCase())

    );

    renderTable(filteredData);
}

// Render the table with data
function renderTable(data) {
    itemDataTable.innerHTML = `
                <thead>
                    <tr>
                        <th>Item Code</th>
                        <th>Description</th>
                        <th>Qty On Hand</th>
                        <th>Unit Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(entry => `
                        <tr>
                            <td>${entry.itemCode}</td>
                            <td>${entry.description}</td>
                            <td>${entry.qtyOnHand}</td>
                            <td>${entry.unitPrice}</td>
                           
                            <td>
                                <button class="edit-item-btn">Edit</button>
                                <button class="delete-item-btn">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            `;

    const editBtns = itemDataTable.getElementsByClassName('edit-item-btn');
    const deleteBtns = itemDataTable.getElementsByClassName('delete-item-btn');

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
    localStorage.setItem('itemTableData', JSON.stringify(itemTableData));
}

// Load table data from local storage
function loadDataFromLocalStorage() {
    const data_item = localStorage.getItem('itemTableData');
    if (data_item) {
        itemTableData = JSON.parse(data_item);
        renderTable(itemTableData);
    }
}

// Clear table data from local storage
function clearLocalStorage() {
    localStorage.removeItem('itemTableData');
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
saveBtn.addEventListener('click', saveDataToLocalStorage);

// Load data from local storage on page load
window.addEventListener('DOMContentLoaded', function() {
    loadDataFromLocalStorage();
});