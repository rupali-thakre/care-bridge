document.getElementById('data-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get form values
    const facilityName = document.getElementById('facility-name').value.trim();
    const dataType = document.getElementById('data-type').value;
    const dataDetails = document.getElementById('data-details').value.trim();

    // Initialize response message
    const responseElement = document.getElementById('form-response');

    // Basic validation
    if (!facilityName) {
        responseElement.textContent = "Facility Name is required.";
        responseElement.setAttribute('aria-live', 'polite');
        return;
    }
    if (!dataType) {
        responseElement.textContent = "Please select a Data Type.";
        responseElement.setAttribute('aria-live', 'polite');
        return;
    }
    if (!dataDetails) {
        responseElement.textContent = "Data Details cannot be empty.";
        responseElement.setAttribute('aria-live', 'polite');
        return;
    }

    // Display loading indicator
    responseElement.textContent = "Submitting data...";
    document.getElementById('data-form').style.opacity = '0.5'; // Dim the form

    // Simulate a delay (e.g., for a server request)
    setTimeout(() => {
        // Sanitize inputs to avoid XSS
        const sanitizedFacilityName = sanitizeInput(facilityName);
        const sanitizedDataType = sanitizeInput(dataType);
        const sanitizedDataDetails = sanitizeInput(dataDetails);

        // Create a new entry
        const dataTable = document.getElementById('data-table');
        const newEntry = document.createElement('div');
        newEntry.classList.add('data-entry');
        
        // Add timestamp
        const timestamp = new Date().toLocaleString();

        newEntry.innerHTML = `
            <div class="data-entry-header">
                <h3>${sanitizedFacilityName}</h3>
                <p><small>${timestamp}</small></p>
            </div>
            <p><strong>Type:</strong> ${sanitizedDataType}</p>
            <p><strong>Details:</strong> ${sanitizedDataDetails}</p>
        `;
        dataTable.appendChild(newEntry);

        // Reset form and response
        document.getElementById('data-form').reset();
        responseElement.textContent = "Data submitted successfully!";
        responseElement.setAttribute('aria-live', 'polite');

        // Remove loading indicator
        document.getElementById('data-form').style.opacity = '1'; // Restore form opacity
    }, 1000); // Simulate a 1-second delay for demonstration
});

// Function to sanitize input
function sanitizeInput(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
