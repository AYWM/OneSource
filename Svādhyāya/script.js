document.addEventListener("DOMContentLoaded", function() {
  fetch('lab_tests.json')
    .then(response => response.json())
    .then(data => {
      const labTestSelect = document.getElementById('labTest');
      const normalRange = document.getElementById('normalRange');

      // Populate Lab Test options dynamically
      data.forEach(test => {
        const option = document.createElement('option');
        option.value = test['Lab Test'];
        option.textContent = test['Lab Test'];
        labTestSelect.appendChild(option);
      });

      // Update Normal Range based on selected Lab Test
      labTestSelect.addEventListener('change', function() {
        const selectedTest = labTestSelect.value;
        const testDetails = data.find(test => test['Lab Test'] === selectedTest);
        normalRange.textContent = `(${testDetails['Normal Range']})`;
      });
    })
    .catch(error => {
      console.log('Error fetching lab test data:', error);
    });
  // Fetch data from JSON file (Assuming data.json contains your medical records)
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Assuming data structure: { tests: [{ name: 'Test Name', normalValue: 'Normal Value', results: [{ date: 'Date', values: [] }] }] }

      // Get the container element
      const tableContainer = document.getElementById('table-container');

      // Create the table structure
      const table = document.createElement('table');
      const headerRow = table.insertRow();
      const testNameHeader = document.createElement('th');
      testNameHeader.textContent = 'Medical Test Name';
      headerRow.appendChild(testNameHeader);

      const normalValueHeader = document.createElement('th');
      normalValueHeader.textContent = 'Normal Value';
      headerRow.appendChild(normalValueHeader);

      // Loop through dates and create headers for each date
      data.tests[0].results.forEach(result => {
        const dateHeader = document.createElement('th');
        dateHeader.textContent = result.date;
        headerRow.appendChild(dateHeader);
      });

      // Loop through tests and populate the table
      data.tests.forEach(test => {
        const row = table.insertRow();
        const testNameCell = row.insertCell();
        testNameCell.textContent = test.name;

        const normalValueCell = row.insertCell();
        normalValueCell.textContent = test.normalValue;

        // Loop through each date's values
        test.results.forEach(result => {
          const valuesCell = row.insertCell();
          const input = document.createElement('input');
          input.type = 'text';
          // Set input attributes or classes here if needed
          valuesCell.appendChild(input);
        });
      });

      // Append the table to the container
      tableContainer.appendChild(table);
    })
    .catch(error => {
      console.log('Error fetching data:', error);
    });
  // Rest of the code for adding readings goes here (addReading function, etc.)
  // Function to add user reading
  window.addReading = function() {
    const testNameInput = document.getElementById('testName');
    const readingValueInput = document.getElementById('readingValue');
    const readingDateInput = document.getElementById('readingDate');

    const testName = testNameInput.value;
    const readingValue = readingValueInput.value;
    const readingDate = readingDateInput.value;

    // Validate inputs
    if (!testName || !readingValue || !readingDate) {
      alert('Please enter all fields.');
      return;
    }

    // Add the new reading to the table
    const table = document.querySelector('table');
    const newRow = table.insertRow();
    
    const testNameCell = newRow.insertCell();
    testNameCell.textContent = testName;

    const readingValueCell = newRow.insertCell();
    readingValueCell.textContent = readingValue;

    // Add an input cell for the new reading date
    const valuesCell = newRow.insertCell();
    const input = document.createElement('input');
    input.type = 'text';
    input.value = ''; // You might want to set the initial value based on user input
    valuesCell.appendChild(input);

    // Update the date headers if needed
    const headerRow = table.rows[0];
    const dateHeader = document.createElement('th');
    dateHeader.textContent = readingDate;
    headerRow.appendChild(dateHeader);

    // Clear input fields
    testNameInput.value = '';
    readingValueInput.value = '';
    readingDateInput.value = '';
  };
});
