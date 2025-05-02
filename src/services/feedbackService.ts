/**
 * Service for submitting feedback to Google Sheets
 */

// Google Sheets API endpoint for form submissions
// This uses the Google Apps Script web app URL provided by the user
// Google Sheet: https://docs.google.com/spreadsheets/d/1qHg7KtACDlx0FowfHEXRV3-qWWgSMGwDZlGPFua_fo0/edit?usp=sharing
// Deployment ID: AKfycbxg8Y4R0K8le6fy92B_g3dIi85aMQU4UGNywqvqAg4IocvE3KWZN8aQ9GDI6lLPjn6f
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxg8Y4R0K8le6fy92B_g3dIi85aMQU4UGNywqvqAg4IocvE3KWZN8aQ9GDI6lLPjn6f/exec';

/**
 * Submit feedback to Google Sheets
 * @param rating - User rating (1-5)
 * @param feedback - User feedback text
 * @returns Promise that resolves when submission is complete
 */
export const submitFeedback = async (rating: number, feedback: string): Promise<void> => {
  try {
    console.log(`Submitting feedback: Rating=${rating}, Feedback=${feedback}`);

    // Create form data for submission
    const formData = new FormData();
    formData.append('Rate', rating.toString());
    formData.append('Feedback', feedback);

    // Submit to Google Sheets
    // Using no-cors mode because Google Apps Script doesn't support CORS by default
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors', // This is required for Google Apps Script web apps
    });

    // Since we're using no-cors, we won't get a normal response
    // We'll just assume it worked if there was no error thrown
    console.log('Feedback submitted successfully');

    // Alternative approach using JSONP or iframe for cross-domain requests
    // This can be implemented if the above method doesn't work
    /*
    // Create a hidden iframe to submit the form
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Create a form inside the iframe
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_SHEET_URL;

    // Add the form fields
    const rateInput = document.createElement('input');
    rateInput.name = 'Rate';
    rateInput.value = rating.toString();
    form.appendChild(rateInput);

    const feedbackInput = document.createElement('input');
    feedbackInput.name = 'Feedback';
    feedbackInput.value = feedback;
    form.appendChild(feedbackInput);

    // Submit the form
    iframe.contentDocument?.body.appendChild(form);
    form.submit();

    // Clean up after a delay
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 5000);
    */

    return;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw new Error('Failed to submit feedback. Please try again.');
  }
};
