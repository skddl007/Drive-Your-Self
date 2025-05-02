// Google Apps Script to handle form submissions and add data to a spreadsheet
// Spreadsheet URL: https://docs.google.com/spreadsheets/d/1qHg7KtACDlx0FowfHEXRV3-qWWgSMGwDZlGPFua_fo0/edit?usp=sharing
// Deployment ID: AKfycbxg8Y4R0K8le6fy92B_g3dIi85aMQU4UGNywqvqAg4IocvE3KWZN8aQ9GDI6lLPjn6f

function doGet() {
  return HtmlService.createHtmlOutput("The Google Apps Script is working correctly.");
}

function doPost(e) {
  try {
    // Get the form data
    const rate = e.parameter.Rate;
    const feedback = e.parameter.Feedback;

    // Log the received data
    console.log("Received feedback submission:");
    console.log("Rate:", rate);
    console.log("Feedback:", feedback);

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

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Feedback submitted successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error
    console.error("Error processing feedback submission:", error);

    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Error processing feedback: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
