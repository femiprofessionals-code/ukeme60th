/**
 * Ukeme Falade 60th Birthday Thanksgiving — form backend.
 *
 * Receives POST requests from the website and appends each submission to the
 * correct tab of a Google Sheet, based on the `formType` field:
 *   - "rsvp" -> "RSVP Responses" tab
 *   - "wish" -> "Wishes and Prayers" tab
 *
 * SETUP (summary — full steps in the project README):
 *   1. Create a Google Sheet with two tabs named exactly:
 *        RSVP Responses
 *        Wishes and Prayers
 *   2. In the Sheet: Extensions > Apps Script. Delete any sample code.
 *   3. Paste THIS entire file in.
 *   4. Deploy > New deployment > type "Web app".
 *        Execute as: Me
 *        Who has access: Anyone
 *   5. Authorize, then copy the Web App URL.
 *   6. Put that URL in the website .env file as VITE_GOOGLE_SCRIPT_URL.
 */

// Header rows written automatically the first time each tab is used.
var HEADERS = {
  'RSVP Responses': [
    'Timestamp',
    'Full Name',
    'Email or Phone',
    'Number of Guests',
    'Attendance Status',
    'Message to Host',
  ],
  'Wishes and Prayers': [
    'Timestamp',
    'Name',
    'Relationship to Ukeme',
    'Message Type',
    'Message',
    'Permission to Display Publicly',
  ],
};

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var now = new Date();

    if (data.formType === 'rsvp') {
      var rsvpSheet = getSheet_(ss, 'RSVP Responses');
      rsvpSheet.appendRow([
        now,
        data.fullName || '',
        data.contact || '',
        data.guests || '',
        data.attendance || '',
        data.message || '',
      ]);
    } else if (data.formType === 'wish') {
      var wishSheet = getSheet_(ss, 'Wishes and Prayers');
      wishSheet.appendRow([
        now,
        data.name || '',
        data.relationship || '',
        data.messageType || '',
        data.message || '',
        data.displayPublicly || '',
      ]);
    } else {
      return jsonOut_({ success: false, message: 'Unknown form type.' });
    }

    return jsonOut_({ success: true, message: 'Submission received' });
  } catch (err) {
    return jsonOut_({ success: false, message: String(err) });
  }
}

// Simple GET responder so visiting the URL in a browser confirms it is live.
function doGet() {
  return jsonOut_({ success: true, message: 'Ukeme 60th form endpoint is live.' });
}

// Returns the named sheet, creating it (with headers) if it does not exist.
function getSheet_(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0 && HEADERS[name]) {
    sheet.appendRow(HEADERS[name]);
    sheet.getRange(1, 1, 1, HEADERS[name].length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
