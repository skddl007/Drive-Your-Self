# Feedback System Setup Guide

This guide explains how to set up the feedback system that stores user feedback in a Google Spreadsheet.

## Current Implementation Status

The feedback system has been configured with the following details:

- Google Spreadsheet: https://docs.google.com/spreadsheets/d/1qHg7KtACDlx0FowfHEXRV3-qWWgSMGwDZlGPFua_fo0/edit?usp=sharing
- Google Apps Script Web App URL: https://script.google.com/macros/s/AKfycbxg8Y4R0K8le6fy92B_g3dIi85aMQU4UGNywqvqAg4IocvE3KWZN8aQ9GDI6lLPjn6f/exec
- Deployment ID: AKfycbxg8Y4R0K8le6fy92B_g3dIi85aMQU4UGNywqvqAg4IocvE3KWZN8aQ9GDI6lLPjn6f

## Google Spreadsheet Setup

1. The Google Spreadsheet should have a sheet named "Feedback" with the following columns:
   - Rate
   - Feedback
   - Timestamp (added automatically by the script)

2. If the "Feedback" sheet doesn't exist, the script will create it automatically.

## Google Apps Script Setup

The Google Apps Script has already been deployed with the following code:

```javascript
// Google Apps Script to handle form submissions and add data to a spreadsheet
function doGet() {
  return HtmlService.createHtmlOutput("The Google Apps Script is working correctly.");
}

function doPost(e) {
  try {
    // Get the form data
    const rate = e.parameter.Rate;
    const feedback = e.parameter.Feedback;

    // Get the active spreadsheet and the "Feedback" sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Feedback");

    if (!sheet) {
      // If the sheet doesn't exist, create it with headers
      const newSheet = ss.insertSheet("Feedback");
      newSheet.appendRow(["Rate", "Feedback", "Timestamp"]);
      sheet = newSheet;
    }

    // Add the data to the sheet with a timestamp
    const timestamp = new Date().toISOString();
    sheet.appendRow([rate, feedback, timestamp]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Feedback submitted successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Error processing feedback: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Testing the Integration

1. Open your application and click on the feedback button (floating button at the bottom right)
2. Fill out the form with a rating (1-5 stars) and feedback text
3. Submit the form
4. Check the Google Spreadsheet to verify that the data was added correctly to the "Feedback" sheet

## Troubleshooting

If the feedback is not being submitted correctly:

1. Check the browser console for any errors
2. Verify that the Google Apps Script is deployed correctly:
   - Visit https://script.google.com/macros/s/AKfycbxg8Y4R0K8le6fy92B_g3dIi85aMQU4UGNywqvqAg4IocvE3KWZN8aQ9GDI6lLPjn6f/exec directly in your browser
   - You should see the message "The Google Apps Script is working correctly."
3. Make sure the Google Spreadsheet has a sheet named "Feedback" (if not, the script will create it)
4. Check that the `GOOGLE_SHEET_URL` in `src/services/feedbackService.ts` matches the Web App URL
5. Ensure the Google Spreadsheet permissions are set correctly:
   - The spreadsheet should be accessible to the Google account that deployed the script
   - The script should be deployed with "Execute as: Me" and "Who has access: Anyone"
6. Try running the Google Apps Script directly from the script editor to check for any errors

## CORS Considerations

The feedback submission uses `mode: 'no-cors'` which means:
1. We can't access the response content from the Google Apps Script
2. We assume the submission was successful if no error is thrown
3. If you need more robust error handling, consider using a proxy server or a different approach

## Alternative Implementation

If the current implementation doesn't work due to CORS issues, you can uncomment the alternative iframe-based approach in `src/services/feedbackService.ts`. This approach creates a hidden iframe to submit the form, which can bypass CORS restrictions.
