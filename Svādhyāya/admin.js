$(document).ready(function () {
    // Handle form submission to add new lab test
    $('#addLabTestForm').submit(function (event) {
        event.preventDefault();
        // Retrieve form data
        var labTestName = $('#labTestName').val();
        var normalRange = $('#normalRange').val();
        var specimenCollection = $('#specimenCollection').val();
        var inspectionMethod = $('#inspectionMethod').val();
        var gender = $('#gender').val();
        var ageGroup = $('#ageGroup').val();

        // Perform validation
        if (!labTestName || !normalRange || !specimenCollection || !inspectionMethod || !gender || !ageGroup) {
            alert('Please fill in all fields.');
            return;
        }

        // Prepare data object
        var newLabTest = {
            "Lab Test": labTestName,
            "Normal Range": normalRange,
            "Specimen Collection": specimenCollection,
            "Inspection Method": inspectionMethod,
            "Gender": gender,
            "Age Group": ageGroup
        };

        // Read existing data from data.json
        $.getJSON('data.json', function (data) {
            // Update the data object with new lab test
            data.labTests.push(newLabTest);
            // Write updated data back to data.json
            $.ajax({
                type: 'POST',
                url: 'data.json',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response) {
                    alert('Lab test added successfully!');
                    // Reset form fields
                    $('#addLabTestForm')[0].reset();
                },
                error: function (xhr, status, error) {
                    alert('Error occurred while adding lab test: ' + error);
                }
            });
        });
    });
});
