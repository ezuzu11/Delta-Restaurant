// Wait for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Find the feedback form in the HTML
    const feedbackForm = document.querySelector('.feedback-form');

    // Listen for when the form is submitted
    feedbackForm.addEventListener('submit', function(event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Get the values that the user typed in the form
        let userName = document.querySelector('input[name="fullname"]').value;
        let userEmail = document.querySelector('input[name="email"]').value;
        let userFeedback = document.querySelector('textarea[name="feedback"]').value;

        // Get today's date and time
        let currentDate = new Date();
        let dateString = currentDate.toLocaleString();

        // Create the text content with the user's feedback
        let feedbackContent = "----------------------------------------\n";
        feedbackContent += "Date: " + dateString + "\n";
        feedbackContent += "Name: " + userName + "\n";
        feedbackContent += "Email: " + userEmail + "\n";
        feedbackContent += "Feedback: " + userFeedback + "\n";
        feedbackContent += "----------------------------------------\n\n";

        // Create a file with the feedback
        // First, create a Blob (Binary Large Object) with our text
        let feedbackBlob = new Blob([feedbackContent], { type: 'text/plain' });

        // Create a link element to download the file
        let downloadLink = document.createElement('a');
        
        // Create a URL for our Blob
        let fileURL = URL.createObjectURL(feedbackBlob);
        
        // Set up the download link
        downloadLink.href = fileURL;
        downloadLink.download = 'feedback.txt';

        // Add the link to the page (hidden)
        document.body.appendChild(downloadLink);

        // Click the link automatically to start the download
        downloadLink.click();

        // Clean up: remove the link and revoke the URL
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(fileURL);

        // Clear the form
        feedbackForm.reset();

        // Show a message to the user
        alert('Thank you for your feedback! The file has been downloaded.');
    });
});