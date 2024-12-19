// Validate individual fieldsssss
const validateField = (value, regex, errorElement, errorMessage) => {
    if (!value || (regex && !regex.test(value))) {
        errorElement.style.display = "block";
        errorElement.textContent = errorMessage;
        return false;
    }
    errorElement.style.display = "none";
    return true;
};

//validation for all fields
const validateForm = () => {
    let hasError = false;

    const fields = [
        { id: 'firstName',
            regex: /^[A-Za-z\s]+$/, 
             errorId: 'firstNameError', 
             errorMessage: "First Name is required and should contain only letters" 
        },

        { id: 'lastName',
             regex: /^[A-Za-z\s]+$/, 
             errorId: 'lastNameError', 
             errorMessage: "Last Name is required and should contain only letters" 
        },

        {    id: 'number',
             regex: /^\d{10}$/, 
             errorId: 'phoneNumberError', 
             errorMessage: "Please enter a 10-digit phone number" 
        },
        {   id: 'selectionId', 
            regex: null, 
            errorId: 'genderError', 
            errorMessage: "Please select a gender"
        },

        {   id: 'address', 
            regex: null, 
            errorId: 'addressError', 
            errorMessage: "Address is required"
         },

        {    id: 'date',
             regex: /^\d{4}-\d{2}-\d{2}$/, 
             errorId: 'dateError',
             errorMessage: "Please enter a valid date of birth" 
        },

        { id: 'title', 
            regex: null, 
            errorId: 'titleError', 
            errorMessage: "Title is required" 
        },

        { id: 'experience', 
            regex: null, 
            errorId: 'experienceError', 
            errorMessage: "Experience is required" 
        }
    ];

    fields.forEach(field => {
        const value = document.getElementById(field.id).value.trim();
        const errorElement = document.getElementById(field.errorId);
        if (!validateField(value, field.regex, errorElement, field.errorMessage)) {
            hasError = true;
        }
    });

    return !hasError;
};

// Store form data
const storeFormData = (formData) => {
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    existingData.push(formData);
    localStorage.setItem('formData', JSON.stringify(existingData));
    loadTableData();
    document.getElementById('formId').reset();
    alert("Form Submitted Successfully");
};

// load the data into the table //form submission handler 
const loadTableData = () => {
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";

    existingData.forEach((formData, index) => {
        const newRow = tableBody.insertRow();
        Object.values(formData).forEach(value => {
            const newCell = newRow.insertCell();
            newCell.textContent = value;
        });

        // Add actions (Edit and Delete) for each row
        const actionCell = newRow.insertCell();
        actionCell.innerHTML = `
            <button onclick="editEntry(${index})">Edit</button>
            <button onclick="deleteEntry(${index})">Delete</button>
        `;
    });
};

// Edit an existing entry
const editEntry = (index) => {
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    const formData = existingData[index];

    // Populate form with selected data for editing
    document.getElementById('firstName').value = formData.firstName;
    document.getElementById('lastName').value = formData.lastName;
    document.getElementById('number').value = formData.number;
    document.getElementById('selectionId').value = formData.selectionId;
    document.getElementById('address').value = formData.address;
    document.getElementById('date').value = formData.date;
    document.getElementById('title').value = formData.title;
    document.getElementById('experience').value = formData.experience;

    // Remove the selected entry for updating
    existingData.splice(index, 1);
    localStorage.setItem('formData', JSON.stringify(existingData));
    loadTableData();
};

// Delete an existing entry
const deleteEntry = (index) => {
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    existingData.splice(index, 1);
    localStorage.setItem('formData', JSON.stringify(existingData));
    loadTableData();
};

//form submission handler 
document.getElementById('submitBtn').addEventListener('click', function (event) {
    event.preventDefault();

    if (validateForm()) {
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            number: document.getElementById('number').value.trim(),
            selectionId: document.getElementById('selectionId').value.trim(),
            address: document.getElementById('address').value.trim(),
            date: document.getElementById('date').value.trim(),
            title: document.getElementById('title').value.trim(),
            experience: document.getElementById('experience').value.trim(),
        };
        storeFormData(formData);
    }
});
// Load table data when the page is loaded
window.onload = loadTableData;
